import { Link, useNavigate, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { IMAGES } from "../../../shared/images"
import { HeaderProps } from "../../../shared/types"
import styles from "./header.module.css"
import { AuthModal } from "../../../shared/components/AuthModal/AuthModal"
import { useCart } from '../../../shared/context/CartContext'
import { useAuth } from "../../../shared/context/AuthContext"

export function Header(props: HeaderProps) {
    const { headerVariant } = props
    const navigate = useNavigate()
    const location = useLocation() 
    const [isAuthOpen, setIsAuthOpen] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const { totalItems, openCart } = useCart()
    const { isAuthenticated } = useAuth()

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [location.pathname])

    const handleProfileClick = () => {
        if (isAuthenticated) {
            navigate('/account')
        } else {
            setIsAuthOpen(true)
        }
    }

    const handleAuthSuccess = () => {
        setIsAuthOpen(false)
        navigate('/account')
    }

    const handleMobileLinkClick = () => {
        setIsMobileMenuOpen(false)
    }

    return (
        <div>
            <header className={`${styles[headerVariant]} ${styles['base-header']}`}>
                <div className={styles["header-container"]}>
                    <div className={styles["links-container"]}>
                        <Link to="/catalog" className={`${styles.link} ${styles[headerVariant + "Link"]}`}>КАТАЛОГ</Link>
                        <Link to="/about" className={`${styles.link} ${styles[headerVariant + "Link"]}`}>ПРО НАС</Link>
                        <Link to="/contacts" className={`${styles.link} ${styles[headerVariant + "Link"]}`}>КОНТАКТИ</Link>
                    </div>

                    <div className={styles["logo-container"]}>
                        <Link to="/" className={styles[headerVariant + "Head"]} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                            <img src={IMAGES.dronesLogo} className={styles["drones-logo"]} alt="Logo"/>
                        </Link>
                    </div>

                    <div className={styles["action-icons"]}>
                        <div className={styles.cartWrapper} onClick={openCart} style={{ cursor: "pointer" }}>
                            <img src={IMAGES.buyImage} className={styles["buy-image"]} alt="Cart"/>
                            {totalItems > 0 && (
                                <span className={styles.cartBadge}>{totalItems > 99 ? '99+' : totalItems}</span>
                            )}
                        </div>

                        <div onClick={handleProfileClick} style={{ cursor: "pointer" }}>
                            <img src={IMAGES.headerProfile} className={styles["header-profile"]} alt="Profile"/>
                        </div>

                        <div>
                            <img src={IMAGES.burgerIcon} className={styles["burgerIcon"]} alt="burgerIcon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}/>
                        </div>
                    </div>
                </div>
            </header>

            <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
                <Link to="/catalog" className={styles.mobileLink} onClick={handleMobileLinkClick}>КАТАЛОГ</Link>
                <Link to="/about" className={styles.mobileLink} onClick={handleMobileLinkClick}>ПРО НАС</Link>
                <Link to="/contacts" className={styles.mobileLink} onClick={handleMobileLinkClick}>КОНТАКТИ</Link>
            </div>

            {isMobileMenuOpen && (
                <div className={styles.overlay} onClick={() => setIsMobileMenuOpen(false)}></div>
            )}

            <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} onSuccess={handleAuthSuccess} initialView="login" />
        </div>
    )
}