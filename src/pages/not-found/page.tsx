import { useNavigate } from "react-router-dom";
import styles from "./page.module.css"


export function NotFoundPage() {
    document.body.className = "grey"
    const navigate = useNavigate()

    
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

                <button className={styles["home-button"]} onClick={() => navigate('/')}>
                    НА ГОЛОВНУ
                </button>
            </main>
        </div>
    );
}