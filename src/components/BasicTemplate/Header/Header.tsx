import { Link, useNavigate, useLocation } from "react-router-dom"
import { IMAGES } from "../../../shared/images"
import { HeaderProps } from "../../../shared/types"
import styles from "./header.module.css"
import { useEffect, useState } from "react"
import { AuthModal } from "../../../shared/components/AuthModal/AuthModal"
import { useAuth } from "../../../shared/components/AuthModal"



export function Header(props: HeaderProps) {
    const { headerVariant } = props
    const navigate = useNavigate()
    const location = useLocation() 
    const [isAuthOpen, setIsAuthOpen] = useState(false)
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

    return (
        <div>
            <header className={`${styles[headerVariant]} ${styles['base-header']}`}>
                <div className={styles["header-container"]}>
                    <div className={styles["links-container"]}>
                        <Link to="/catalog" className={`${styles.link} ${styles[headerVariant + "Link"]}`}>
                            КАТАЛОГ
                        </Link>

                        <Link to="/about" className={`${styles.link} ${styles[headerVariant + "Link"]}`}>
                            ПРО НАС
                        </Link>

                        <Link to="/contacts" className={`${styles.link} ${styles[headerVariant + "Link"]}`}>
                            КОНТАКТИ
                        </Link>
                    </div>

                    <div className={styles["logo-container"]}>
                        <Link to="/" className={styles[headerVariant + "Head"]}>
                            <img src={IMAGES.dronesLogo} className={styles["drones-logo"]} alt="Logo"/>
                        </Link>
                    </div>

                    <div className={styles["action-icons"]}>
                        <div onClick={() => navigate("/cart")} style={{ cursor: "pointer" }}>
                            <img src={IMAGES.buyImage} className={styles["buy-image"]} alt="Cart"/>
                        </div>

                        <div onClick={handleProfileClick} style={{ cursor: "pointer" }}>
                            <img src={IMAGES.headerProfile} className={styles["header-profile"]} alt="Profile"/>
                        </div>
                    </div>

                </div>
            </header>

            <AuthModal 
                isOpen={isAuthOpen} 
                onClose={() => setIsAuthOpen(false)}
                onSuccess={handleAuthSuccess}
                initialView="login" 
            />
        </div>
    )
}