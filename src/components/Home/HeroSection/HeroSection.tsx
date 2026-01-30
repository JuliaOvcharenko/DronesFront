import styles from './HeroSection.module.css';
import droneImage from '../../../assets/gelicopter.png';
import { useNavigate } from 'react-router-dom';


export function HeroSection() {
    const navigate = useNavigate();

    return (
        <section className={styles["hero-section"]}>

            <div className={styles["content-wrapper"]}>

                <div className={styles["title-container"]}>
                    <h1 className={styles["main-title"]}>
                        ТЕХНОЛОГІЇ
                    </h1>
                    <h2 className={styles["sub-title"]}>
                        ЯКІ ЗМІНЮЮТЬ РЕАЛЬНІСТЬ
                    </h2>
                </div>

                <div className={styles["drone-container"]}>
                    <img
                        src={droneImage}
                        alt="DJI Mavic Drone"
                        className={styles["drone-img"]}
                    />
                </div>

                <div className={styles["info-block"]}>
                    <p className={styles["description"]}>
                        Передові технології в одному місці. <br />
                        Обирай найкраще для найважливішого.
                    </p>

                    <button
                        className={styles["catalog-btn"]}
                        onClick={() => navigate('/catalog')}
                    >
                        ДО КАТАЛОГУ
                    </button>
                </div>

            </div>

            <div className={styles["bottom-curve"]}></div>
        </section>
    );
};