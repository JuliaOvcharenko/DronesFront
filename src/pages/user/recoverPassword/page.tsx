import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import styles from '../../../shared/components/AuthModal/AuthModal.module.css'
import { BASE_URL } from '../../../shared/api/baseUrl'
import { IMAGES } from '../../../shared/images'

export function RecoverPasswordPage() {
	const [searchParams] = useSearchParams()
	const navigate = useNavigate()

	const code = searchParams.get('code') || ''
	const email = searchParams.get('email') || ''

	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [success, setSuccess] = useState(false)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setError(null)

		if (!password || !confirmPassword) {
			setError('Будь ласка, заповніть всі поля')
			return
		}
		if (password !== confirmPassword) {
			setError('Паролі не співпадають')
			return
		}
		if (password.length < 8) {
			setError('Пароль має бути не менше 8 символів')
			return
		}

		try {
			setIsLoading(true)
			const response = await fetch(`${BASE_URL}/users/password/reset`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, code, newPassword: password }),
			})

			if (!response.ok) {
				const text = await response.text()
				try {
					const data = JSON.parse(text)
					if (typeof data === 'string') throw new Error(data)
					throw new Error(data.message || 'Помилка зміни пароля')
				} catch (parseErr: any) {
					throw new Error(parseErr.message || 'Помилка зміни пароля')
				}
			}

			setSuccess(true)
		} catch (err: any) {
			setError(err.message || 'Помилка зміни пароля')
		} finally {
			setIsLoading(false)
		}
	}

	if (success) {
		return (
			<div className={styles.overlay}>
				<div className={styles.modal}>
					<div className={styles.successContainerCode}>
						<h2 className={styles.successTitle}>Пароль змінено!</h2>
						<div className={styles.textPasswordContainer}>
							<p className={styles.successText}>Пароль успішно змінено!</p>
							<p className={styles.successText}>Тепер ви можете увійти з новим паролем.</p>
						</div>
						<button className={`${styles.btn} ${styles.btnSubmit}`} onClick={() => navigate('/')}>УВІЙТИ</button>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className={styles.overlay}>
			<div className={styles.modal}>
				<div className={styles.header}>
					<span className={styles.activeTitle}>Новий пароль</span>
				</div>

				<form onSubmit={handleSubmit} className={styles.form}>
					{error && <div className={styles.errorMessage}>{error}</div>}

					<div className={styles.inputGroup}>
						<label className={styles.label}>Новий пароль</label>
						<div className={styles.inputWrapper}>
							<input className={styles.input} type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} />
							<button type="button" className={styles.eyeIcon} onClick={() => setShowPassword(!showPassword)}>
								<img src={showPassword ? IMAGES.passFalse : IMAGES.passTrue} alt="toggle password" />
							</button>
						</div>
					</div>

					<div className={styles.inputGroup}>
						<label className={styles.label}>Підтвердження пароля</label>
						<div className={styles.inputWrapper}>
							<input className={styles.input} type={showPassword ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
							<button type="button" className={styles.eyeIcon} onClick={() => setShowPassword(!showPassword)}>
								<img src={showPassword ? IMAGES.passFalse : IMAGES.passTrue} alt="toggle password" />
							</button>
						</div>
					</div>

					<div className={styles.buttonsRow}>
						<button type="button" className={`${styles.btn} ${styles.btnCancel}`} onClick={() => navigate('/')}>СКАСУВАТИ</button>
						<button type="submit" className={`${styles.btn} ${styles.btnSubmit}`} disabled={isLoading}>{isLoading ? 'ЗБЕРЕЖЕННЯ...' : 'ЗБЕРЕГТИ'}</button>
					</div>
				</form>
			</div>
		</div>
	)
}