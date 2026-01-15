import styles from './HeroSection.module.css';
import droneImage from '../../assets/gelicopter.png'; 

export function HeroSection() {
  return (
    <section className={styles["hero-section"]}>
      
      {/* Контейнер для центрирования */}
      <div className={styles["content-wrapper"]}>
        
        {/* Заголовок (на заднем плане) */}
        <div className={styles["title-container"]}>
            <h1 className={styles["main-title"]}>
              ТЕХНОЛОГІЇ
            </h1>
            <h2 className={styles["sub-title"]}>
              ЯКІ ЗМІНЮЮТЬ РЕАЛЬНІСТЬ
            </h2>
        </div>

        {/* Картинка дрона (поверх текста) */}
        <div className={styles["drone-container"]}>
            <img 
                src={droneImage} 
                alt="DJI Mavic Drone" 
                className={styles["drone-img"]}
            />
        </div>

        {/* Блок с описанием и кнопкой (справа) */}
        <div className={styles["info-block"]}>
            <p className={styles["description"]}>
                Передові технології в одному місці. <br/>
                Обирай найкраще для найважливішого.
            </p>
            <button className={styles["catalog-btn"]}>
                ДО КАТАЛОГУ
            </button>
        </div>

      </div>

      {/* Белая горка снизу */}
      <div className={styles["bottom-curve"]}></div>
    </section>
  );
};