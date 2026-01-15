import styles from './AboutSection.module.css';
import arrowIcon from '../../assets/icons/strelka.png'; 

export function AboutSection() {
  return (
    <section className={styles["about-section"]}>
      <div className={styles["container"]}>
        
        {/* Заголовок */}
        <h2 className={styles["title"]}>ПРО НАС</h2>
        
        {/* Текст описания */}
        <p className={styles["description"]}>
          Ми — команда, що об’єднує технології та надійність. <br />
          Пропонуємо дрони й тепловізори, перевірені у найскладніших умовах. <br />
          Обираємо тільки те, чому довіряємо самі.
        </p>

        {/* Кнопка с иконкой стрелки */}
        <button className={styles["read-more-btn"]}>
          ЧИТАТИ БІЛЬШЕ
          <img 
            src={arrowIcon} 
            alt="arrow" 
            className={styles["btn-icon"]} 
          />
        </button>

      </div>
    </section>
  );
};