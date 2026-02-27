import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import styles from './page.module.css'; 
import { useAuth } from '../../../shared/context/AuthContext';


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
            <div className={styles.leftContainer}>
                <h1 className={styles.accountText}>ОСОБИСТИЙ КАБІНЕТ</h1>
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

                <Link to="/account/address" className={`${styles.textLeft} ${isActive('/account/address')}`}>
	                АДРЕСА ДОСТАВКИ
                </Link>

                <hr />

                <button className={styles.logoutButton} onClick={handleLogout}>
                    ВИЙТИ
                </button>
            </div>
            <Outlet />
        </div>
    );
};