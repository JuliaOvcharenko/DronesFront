import React, { useState, useEffect } from 'react';
import styles from './AuthModal.module.css';
import { IMAGES } from '../../images';
import { loginUser, registerUser } from '../../api/auth';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialView?: 'login' | 'register';
}

type ViewState = 'login' | 'register' | 'success';

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialView = 'login' }) => {
    const [view, setView] = useState<ViewState>(initialView);


    useEffect(() => {
        if (isOpen) {
            setView(initialView);
            setName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setError(null);
        }
    }, [isOpen, initialView]);

    const [showPassword, setShowPassword] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    if (!isOpen) return null;

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (view === 'register') {
            // РЕЄСТРАЦІЯ
            if (!name || !email || !password || !confirmPassword) {
                setError('Будь ласка, заповніть всі поля');
                return;
            }
            if (password !== confirmPassword) {
                setError('Паролі не співпадають');
                return;
            }
            if (password.length < 8) {
                setError('Пароль має бути не менше 8 символів');
                return;
            }

            try {
                setIsLoading(true);
                // Виклик API реєстрації
                await registerUser({
                    name,
                    email,
                    password,
                    passwordConfirm: confirmPassword
                });

                setView('success');
            } catch (err: any) {
                console.error(err);
                setError(err.message || 'Помилка реєстрації');
            } finally {
                setIsLoading(false);
            }

        } else {
            // LOGIN

            // Валідація
            if (!email || !password) {
                setError('Будь ласка, введіть email та пароль');
                return;
            }

            try {
                setIsLoading(true);

                // API
                const data = await loginUser({
                    email,
                    password
                });

                // Збереження токена
                localStorage.setItem('token', data.token);

                onClose();

            } catch (err: any) {
                console.error(err);
                setError(err.message || 'Невірний логін або пароль');
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className={styles.overlay} onClick={handleOverlayClick}>
            <div className={styles.modal}>

                <button className={styles.closeBtn} onClick={onClose}>
                    ✕
                </button>

                {view !== 'success' && (
                    <>
                        <h2 className={styles.header}>
                            <span
                                className={view === 'login' ? styles.activeTitle : ''}
                                onClick={() => setView('login')}
                                style={{ cursor: 'pointer' }}
                            >
                                Авторизація
                            </span>
                            {' / '}
                            <span
                                className={view === 'register' ? styles.activeTitle : ''}
                                onClick={() => setView('register')}
                                style={{ cursor: 'pointer' }}
                            >
                                Реєстрація
                            </span>
                        </h2>

                        {error && <div className={styles.errorMessage}>{error}</div>}

                        <form className={styles.form} onSubmit={handleSubmit}>
                            {/* Тільки для реєстрації */}
                            {view === 'register' && (
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Ім'я</label>
                                    <input
                                        type="text"
                                        placeholder="Введіть ім'я"
                                        className={styles.input}
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                            )}

                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Email</label>
                                <input
                                    type="email"
                                    placeholder="Введіть email"
                                    className={styles.input}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Пароль</label>
                                <div className={styles.inputWrapper}>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Введіть пароль"
                                        className={styles.input}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className={styles.eyeIcon}
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        <img
                                            src={showPassword ? IMAGES.passFalse : IMAGES.passTrue}
                                            alt="Toggle Password"
                                        />
                                    </button>
                                </div>
                            </div>

                            {/* Підтвердження пароля */}
                            {view === 'register' && (
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Підтвердження пароля</label>
                                    <div className={styles.inputWrapper}>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Повторіть пароль"
                                            className={styles.input}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            className={styles.eyeIcon}
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            <img
                                                src={showPassword ? IMAGES.passFalse : IMAGES.passTrue}
                                                alt="Toggle Password"
                                            />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {view === 'login' ? (
                                <button type="button" className={styles.forgotPass}>
                                    Забули пароль?
                                </button>
                            ) : (
                                <div
                                    className={styles.switchLink}
                                    onClick={() => setView('login')}
                                >
                                    Вже є акаунт? <span>Увійти</span>
                                </div>
                            )}

                            <div className={styles.buttonsRow}>
                                <button type="button" className={`${styles.btn} ${styles.btnCancel}`} onClick={onClose}>
                                    СКАСУВАТИ
                                </button>
                                <button
                                    type="submit"
                                    className={`${styles.btn} ${styles.btnSubmit}`}
                                    disabled={isLoading}
                                    style={{ opacity: isLoading ? 0.7 : 1 }}
                                >
                                    {isLoading ? 'ОБРОБКА...' : (view === 'login' ? 'УВІЙТИ' : 'ЗАРЕЄСТРУВАТИСЯ')}
                                </button>
                            </div>
                        </form>

                        {view === 'register' && (
                            <p className={styles.termsText}>
                                При вході або реєстрації, я підтверджую згоду з умовами <span className={styles.highlight}>публічного договору</span>
                            </p>
                        )}
                    </>
                )}

                {/* Успішна реєстрація */}
                {view === 'success' && (
                    <div className={styles.successContainer}>
                        <h2 className={styles.successTitle}>Реєстрація</h2>
                        <p className={styles.successText}>Акаунт успішно створено! Будь ласка, увійдіть.</p>

                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <button
                                className={`${styles.btn} ${styles.btnSubmit}`}
                                style={{ maxWidth: '200px' }}
                                onClick={() => setView('login')} // Перекидаємо на логін
                            >
                                УВІЙТИ
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};