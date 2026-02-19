import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import styles from './page.module.css'; 
import { useAuth } from '../../../shared/components/AuthModal';

export const AccountLayout = () => {
    const navigate = useNavigate();
    const location = useLocation(); 
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const isActive = (path: string) => location.pathname === path ? styles.activeLink : '';

    return (
        <div className={styles.mainContainer}>
            {/* ЛІВА ЧАСТИНА (Меню) - Тепер вона тут */}
            <div className={styles.leftContainer}>
                <h1 className={styles.accountText}>ОСОБИСТИЙ КАБІНЕТ</h1>

                {/* Навігація */}
                <Link
                    to="/account/profile"
                    className={`${styles.textLeft} ${isActive('/account/profile')}`}
                >
                    КОНТАКТНІ ДАНІ
                </Link>

                <Link
                    to="/account/orders"
                    className={`${styles.textLeft} ${isActive('/account/orders')}`}
                >
                    МОЇ ЗАМОВЛЕННЯ
                </Link>

                <p className={styles.textLeft}>АДРЕСА ДОСТАВКИ</p>

                <hr />

                <button className={styles.logoutButton} onClick={handleLogout}>
                    ВИЙТИ
                </button>
            </div>

            {/* ПРАВА ЧАСТИНА (Змінний контент) */}
            <Outlet />
        </div>
    );
};