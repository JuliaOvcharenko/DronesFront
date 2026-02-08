import React, { useState } from 'react';
import styles from './AuthModal.module.css';
import { IMAGES } from '../../shared/images';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialView?: 'login' | 'register';
}

type ViewState = 'login' | 'register' | 'success';

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialView = 'login' }) => {
    const [view, setView] = useState<ViewState>(initialView);
    const [showPassword, setShowPassword] = useState(false);

    if (!isOpen) return null;

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Тут буде запит на бекенд
        
        if (view === 'register') {
            setView('success');
        } else {
            console.log('Login logic here');
            onClose();
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
                                style={{cursor: 'pointer'}}
                            >
                                Авторизація
                            </span>
                            {' / '}
                            <span 
                                className={view === 'register' ? styles.activeTitle : ''}
                                onClick={() => setView('register')}
                                style={{cursor: 'pointer'}}
                            >
                                Реєстрація
                            </span>
                        </h2>

                        <form className={styles.form} onSubmit={handleSubmit}>
                            {/* Тільки для реєстрації */}
                            {view === 'register' && (
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Ім'я</label>
                                    <input type="text" placeholder="Введіть ім'я" className={styles.input} />
                                </div>
                            )}

                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Email</label>
                                <input type="email" placeholder="Введіть email" className={styles.input} />
                            </div>

                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Пароль</label>
                                <div className={styles.inputWrapper}>
                                    <input 
                                        type={showPassword ? "text" : "password"} 
                                        placeholder="Введіть пароль" 
                                        className={styles.input} 
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
                                <button type="submit" className={`${styles.btn} ${styles.btnSubmit}`}>
                                    {view === 'login' ? 'УВІЙТИ' : 'ЗАРЕЄСТРУВАТИСЯ'}
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
                        <p className={styles.successText}>Акаунт успішно створено!</p>
                        
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                           <button 
                                className={`${styles.btn} ${styles.btnSubmit}`} 
                                style={{ maxWidth: '200px' }}
                                onClick={onClose}
                            >
                                ПЕРЕЙТИ НА САЙТ
                            </button> 
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};