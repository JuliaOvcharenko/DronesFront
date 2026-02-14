import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './page.module.css';
import { useAuth } from '../../../shared/components/AuthModal';


export function ProfileContactsPage() {
    const navigate = useNavigate();
    const { user, isLoading, logout, isAuthenticated } = useAuth();

    useEffect(() => {
        document.body.className = 'white';
        window.scrollTo(0, 0);

        if (!isLoading && !isAuthenticated) {
            navigate('/');
        }
    }, [isLoading, isAuthenticated, navigate]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (isLoading) {
        return (
            <div className={styles.container}>
                <p>Завантаження...</p>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>ОСОБИСТИЙ КАБІНЕТ</h1>

            <div className={styles.userInfo}>
                <div className={styles.infoBlock}>
                    <p className={styles.label}>Ім'я:</p>
                    <p className={styles.value}>{user.username}</p>
                </div>

                <div className={styles.infoBlock}>
                    <p className={styles.label}>Прізвище:</p>
                    <p className={styles.value}>{user.lastname || '—'}</p>
                </div>

                <div className={styles.infoBlock}>
                    <p className={styles.label}>По батькові:</p>
                    <p className={styles.value}>{user.patronymic || '—'}</p>
                </div>

                <div className={styles.infoBlock}>
                    <p className={styles.label}>Email:</p>
                    <p className={styles.value}>{user.email}</p>
                </div>

                <div className={styles.infoBlock}>
                    <p className={styles.label}>Телефон:</p>
                    <p className={styles.value}>{user.phoneNumber || '—'}</p>
                </div>

                <div className={styles.infoBlock}>
                    <p className={styles.label}>Дата народження:</p>
                    <p className={styles.value}>
                        {user.birthDate ? new Date(user.birthDate).toLocaleDateString('uk-UA') : '—'}
                    </p>
                </div>
            </div>

            <div className={styles.buttonsContainer}>
                <button className={styles.editButton}>
                    Редагувати профіль
                </button>
                <button className={styles.logoutButton} onClick={handleLogout}>
                    Вийти
                </button>
            </div>
        </div>
    );
}