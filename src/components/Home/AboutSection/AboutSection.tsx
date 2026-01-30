import styles from './AboutSection.module.css';
import arrowIcon from '../../../assets/icons/strelka.png';
import { useNavigate } from 'react-router-dom';


export function AboutSection() {
  const navigate = useNavigate();

  return (
    <section className={styles["about-section"]}>
      <div className={styles["container"]}>

        {/* Заголовок */}
        <h2 className={styles["title"]}>ПРО НАС</h2>

        {/* Текст */}
        <p className={styles["description"]}>
          Ми — команда, що об’єднує технології та надійність.
          Пропонуємо дрони й тепловізори, перевірені у найскладніших умовах.
          Обираємо тільки те, чому довіряємо самі.
        </p>

        {/* Кнопка */}
        <button
          className={styles["read-more-btn"]}
          onClick={() => navigate('/about')}
        >
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