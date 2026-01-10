import { Link, useNavigate } from "react-router-dom"
import { IMAGES } from "../../shared/images"
import { HeaderProps } from "../../shared/types"
import styles from "./header.module.css"


export function Header(props: HeaderProps){
    const {headerVariant} = props
    const navigate = useNavigate()

    return (
        <header className={`${styles[headerVariant]} ${styles['base-header']}`}>
            <div className = {styles["header-container"]}>
                <div className = {styles["links-container"]}>
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

                <div className = {styles['logo-container']}>
                    <img src = {IMAGES.dronesLogo} className = {styles['drones-logo']}/>
                </div>
            
                <div className = {styles["action-icons"]}>
                    <div onClick={() => {
                        navigate('#')
                    }}>
                        <img src={IMAGES.buyImage} className={styles['buy-image']}/>
                    </div>

                    <div onClick={() => {
                        navigate('/personal-account/:id')
                    }}>
                        <img src={IMAGES.headerProfile} className={styles['header-profile']}/>
                    </div>
                </div>
            </div>
        </header>
    )
}