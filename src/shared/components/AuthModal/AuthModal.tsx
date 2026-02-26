import { useState, useEffect } from 'react'
import styles from './AuthModal.module.css'
import { IMAGES } from '../../images'
import { loginUser, registerUser } from '../../../api/getUser'
import { BASE_URL } from '../../api/baseUrl'
import { useAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom'

interface AuthModalProps {
	isOpen: boolean
	onClose: () => void
	onSuccess?: () => void
	initialView?: 'login' | 'register'
}

type ViewState = 'login' | 'register' | 'success' | 'forgot' | 'forgotSuccess'

export function AuthModal({ isOpen, onClose, onSuccess, initialView = 'login' }: AuthModalProps) {
	const { login } = useAuth()

	const [view, setView] = useState<ViewState>(initialView)
	const [showPassword, setShowPassword] = useState(false)
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [forgotEmail, setForgotEmail] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		if (isOpen) {
			setView(initialView)
			setName('')
			setEmail('')
			setPassword('')
			setConfirmPassword('')
			setForgotEmail('')
			setError(null)
			setShowPassword(false)
		}
	}, [isOpen, initialView])

	if (!isOpen) return null

	const handleOverlayClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) onClose()
	}

	const switchView = (next: ViewState) => {
		setError(null)
		setView(next)
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setError(null)

		if (view === 'register') {
			if (!name || !email || !password || !confirmPassword) {
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
				await registerUser({ name, email, password, passwordConfirm: confirmPassword })
				setView('success')
			} catch (err: any) {
				setError(err.message || 'Помилка реєстрації')
			} finally {
				setIsLoading(false)
			}

		} else if (view === 'login') {
			if (!email || !password) {
				setError('Будь ласка, введіть email та пароль')
				return
			}
			try {
				setIsLoading(true)
				const data = await loginUser({ email, password })
				await login(data.token)
				if (onSuccess) onSuccess()
				else onClose()
			} catch (err: any) {
				setError(err.message || 'Невірний логін або пароль')
			} finally {
				setIsLoading(false)
			}

		} else if (view === 'forgot') {
			if (!forgotEmail) {
				setError('Будь ласка, введіть email')
				return
			}
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
			if (!emailRegex.test(forgotEmail)) {
				setError('Введіть коректний email')
				return
			}
			try {
				setIsLoading(true)
				const response = await fetch(`${BASE_URL}/users/password/recover`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ email: forgotEmail }),
				})
				if (!response.ok) {
					const text = await response.text()
					try {
						const data = JSON.parse(text)
						if (typeof data === 'string') {
							throw new Error('Користувача з таким email не існує')
						}
						throw new Error(data.message || 'Помилка відправки листа')
					} catch (parseErr: any) {
						throw new Error(parseErr.message || 'Помилка відправки листа')
					}
				}
				setView('forgotSuccess')
			} catch (err: any) {
				setError(err.message || 'Помилка відправки листа')
			} finally {
				setIsLoading(false)
			}
		}
	}

	return (
		<div className={styles.overlay} onClick={handleOverlayClick}>
			<div className={styles.modal}>

				<button className={styles.closeBtn} onClick={onClose}>✕</button>

				{(view === 'login' || view === 'register') && (
					<>
						<div className={styles.header}>
							<span
								className={view === 'login' ? styles.activeTitle : ''}
								onClick={() => switchView('login')}
								style={{ cursor: 'pointer' }}
							>
								Авторизація
							</span>
							<span className={styles.activeTitle}>{' / ' }</span>
							<span
								className={view === 'register' ? styles.activeTitle : ''}
								onClick={() => switchView('register')}
								style={{ cursor: 'pointer' }}
							>
								Реєстрація
							</span>
						</div>

						<form onSubmit={handleSubmit} className={styles.form}>
							{error && <div className={styles.errorMessage}>{error}</div>}

							{view === 'register' && (
								<div className={styles.inputGroup}>
									<label className={styles.label}>Ім'я</label>
									<input
										placeholder="Введіть ім'я"
										className={styles.input}
										type="text"
										value={name}
										onChange={(e) => setName(e.target.value)}
									/>
								</div>
							)}

							<div className={styles.inputGroup}>
								<label className={styles.label}>Email</label>
								<input
									placeholder='Введіть email'
									className={styles.input}
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>

							<div className={styles.inputGroup}>
								<label className={styles.label}>Пароль</label>
								<div className={styles.inputWrapper}>
									<input
										placeholder='Введіть пароль'
										className={styles.input}
										type={showPassword ? 'text' : 'password'}
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									/>
									<button
										type="button"
										className={styles.eyeIcon}
										onClick={() => setShowPassword(!showPassword)}
									>
										<img className={styles.eyeIconImg} src={showPassword ? IMAGES.passTrue : IMAGES.passFalse} alt="toggle password" />
									</button>
								</div>
							</div>

							{view === 'register' && (
								<div className={styles.inputGroup}>
									<label className={styles.label}>Підтвердження пароля</label>
									<div className={styles.inputWrapper}>
										<input
											placeholder='Повторіть пороль'
											className={styles.input}
											type={showPassword ? 'text' : 'password'}
											value={confirmPassword}
											onChange={(e) => setConfirmPassword(e.target.value)}
										/>
										<button
											type="button"
											className={styles.eyeIcon}
											onClick={() => setShowPassword(!showPassword)}
										>
											<img src={showPassword ? IMAGES.passTrue : IMAGES.passFalse} alt="toggle password" />
										</button>
									</div>
								</div>
							)}

							{view === 'login' ? (
								<button
									type="button"
									className={styles.forgotPass}
									onClick={() => switchView('forgot')}
								>
									Забули пароль?
								</button>
							) : (
								<div className={styles.switchLink}>
									<span onClick={() => switchView('login')} className={styles.switchLinkText}>
										Вже є акаунт? Увійти
									</span>
								</div>
							)}

							<div className={styles.buttonsRow}>
								<button type="button" className={`${styles.btn} ${styles.btnCancel}`} onClick={onClose}>
									<p >СКАСУВАТИ</p>
								</button>
								<button type="submit" className={`${styles.btn} ${styles.btnSubmit}`} disabled={isLoading}>
									{isLoading
										? 'ОБРОБКА...'
										: view === 'login'
										? 'УВІЙТИ'
										: 'ЗАРЕЄСТРУВАТИСЯ'}
								</button>
							</div>

							{view === 'register' && (
								<div className={styles.termsText}>
									При вході або реєстрації, я підтверджую згоду з умовами <Link className={styles.link} to="/terms">публічного договору</Link>
								</div>
							)}
						</form>
					</>
				)}

				{view === 'success' && (
					<div className={styles.successContainer}>
						<h2 className={styles.successTitle}>Реєстрація</h2>
						<p className={styles.successText}>
							Акаунт успішно створено!
						</p>
						<button className={`${styles.btn} ${styles.btnSubmit}`} onClick={() => switchView('login')}>
							ПЕРЕЙТИ НА САЙТ
						</button>
					</div>
				)}

				{view === 'forgot' && (
					<>
						<div className={styles.header}>
							<span className={styles.activeTitle}>Відновлення пароля</span>
						</div>

						<form onSubmit={handleSubmit} className={styles.form}>
							{error && <div className={styles.errorMessage}>{error}</div>}

							<div className={styles.inputGroup}>
								<label className={styles.label}>Email</label>
								<input
									className={styles.input}
									type="email"
									placeholder="Введіть email"
									value={forgotEmail}
									onChange={(e) => setForgotEmail(e.target.value)}
								/>
							</div>

							<div className={styles.buttonsRow}>
								<button
									type="button"
									className={`${styles.btn} ${styles.btnCancel}`}
									onClick={() => switchView('login')}
								>
									СКАСУВАТИ
								</button>
								<button type="submit" className={`${styles.btn} ${styles.btnSubmit}`} disabled={isLoading}>
									{isLoading ? 'НАДСИЛАННЯ...' : 'НАДІСЛАТИ ЛИСТ'}
								</button>
							</div>
						</form>
					</>
				)}

				{view === 'forgotSuccess' && (
					<div className={styles.successContainer}>
						<h2 className={styles.successTitle}>Відновлення пароля</h2>
						<p className={styles.successText}>
							Листа з інструкцією надіслано на <strong>{forgotEmail}</strong>.
							Перевірте вашу поштову скриньку.
						</p>
						<button className={`${styles.btn} ${styles.btnSubmit}`} onClick={() => switchView('login')}>
							ПОВЕРНУТИСЬ ДО ВХОДУ
						</button>
					</div>
				)}

			</div>
		</div>
	)
}