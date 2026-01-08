import styles from "./page.module.css"
import dronesLogo from '../../assets/icons/Subtract.png';


export function NotFoundPage() {
    return (
        <div className={styles["content-container"]}>
            <main className={styles["main-content"]}>
                <h1 className={styles["title"]}>404</h1>

                <p className={styles["subtitle"]}>
                    УПС! ЗДАЄТЬСЯ, ВИ ЗАБЛУКАЛИ.
                </p>

                <p className={styles["description"]}>
                    Сторінка, яку ви шукаєте, не існує або була переміщена.
                </p>

                <button className={styles["home-button"]}>
                    НА ГОЛОВНУ
                </button>
            </main>

            <div className={styles["custom-footer"]}>
                <img
                    src={dronesLogo}
                    alt="Drones Watermark"
                    className={styles["watermark-img"]}
                />

                <div className={styles["footer-line"]} />

                <p className={styles["copyright-text"]}>
                    © 2025 Drones Всі права захищені.
                </p>
            </div>
        </div>
    );
}