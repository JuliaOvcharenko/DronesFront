import { Link, useNavigate } from "react-router-dom"
import { IMAGES } from "../../../shared/images"
import { HeaderProps } from "../../../shared/types"
import styles from "./header.module.css"
import { useState } from "react"
import { AuthModal } from "../../../shared/components/AuthModal"


export function Header(props: HeaderProps) {
    const { headerVariant } = props
    const navigate = useNavigate()
    
    // Локальний стан для відкриття модалки
    const [isAuthOpen, setIsAuthOpen] = useState(false);

    return (
        <>
            <header className={`${styles[headerVariant]} ${styles['base-header']}`}>
                <div className={styles["header-container"]}>
                    <div className={styles["links-container"]}>
                        <Link to={"/catalog"} className={`${styles.link} ${styles[headerVariant + "Link"]}`}>
                            КАТАЛОГ
                        </Link>
                        <Link to={"/about"} className={`${styles.link} ${styles[headerVariant + "Link"]}`}>
                            ПРО НАС
                        </Link>
                        <Link to={"/contacts"} className={`${styles.link} ${styles[headerVariant + "Link"]}`}>
                            КОНТАКТИ
                        </Link>
                    </div>

                    <div className={styles['logo-container']}>
                        <Link to="/"> {/* Додав посилання на головну */}
                            <img src={IMAGES.dronesLogo} className={styles['drones-logo']} alt="Drones Logo" />
                        </Link>
                    </div>

                    <div className={styles["action-icons"]}>
                        {/* Кошик */}
                        <div 
                            onClick={() => navigate('/cart')} 
                            style={{ cursor: 'pointer' }} 
                        >
                            <img src={IMAGES.buyImage} className={styles['buy-image']} alt="Cart" />
                        </div>

                        {/* Профіль / Вхід */}
                        <div 
                            onClick={() => setIsAuthOpen(true)} 
                            style={{ cursor: 'pointer' }}
                        >
                            <img src={IMAGES.headerProfile} className={styles['header-profile']} alt="Profile" />
                        </div>
                    </div>
                </div>
            </header>

            {/*МОДАЛКА*/}
            <AuthModal
                isOpen={isAuthOpen}
                onClose={() => setIsAuthOpen(false)}
                initialView="login"
            />
        </>
    )
}