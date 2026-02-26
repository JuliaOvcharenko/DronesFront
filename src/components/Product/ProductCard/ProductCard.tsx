import styles from './ProductCard.module.css';
import { useNavigate } from 'react-router-dom';


interface ProductCardProps {
    title: string;
    description: string;
    price: string;
    bgImage: string;
    droneImage: string;
    overlayGradient: string;
}

export function ProductCard({ title, description, price, bgImage, droneImage, overlayGradient }: ProductCardProps) {
    const navigate = useNavigate();

    return (
        <div className={styles["card-container"]}>

            {/* Дрон */}
            <div className={styles["drone-wrapper"]}>
                <img src={droneImage} alt={title} className={styles["drone-img"]} />
            </div>

            {/* Фото фону */}
            <img src={bgImage} alt="background" className={styles["card-bg"]} />

            {/* Шар туману */}
            <div
                className={styles["overlay"]}
                style={{ background: overlayGradient }}
            ></div>

            {/* Контент */}
            <div className={styles["card-content"]}>
                <h3 className={styles["title"]}>{title}</h3>
                <p className={styles["description"]}>{description}</p>

                <div className={styles["footer"]}>
                    <span className={styles["price"]}>from to ${price}</span>
                    <button
                        className={styles["buy-btn"]}
                        onClick={() => navigate('/catalog')}
                    >
                        <p className={styles["buy-btn-text"]}>КУПИТИ</p>
                        <span className={styles["arrow"]}>→</span>
                    </button>
                </div>
            </div>

        </div>
    );
};
