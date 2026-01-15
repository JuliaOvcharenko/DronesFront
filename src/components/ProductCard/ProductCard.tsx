import styles from './ProductCard.module.css';

// Описуємо, які дані приймає картка можна буде перенести у інше місце
interface ProductCardProps {
  title: string;
  description: string;
  price: string;
  bgImage: string;    // Шлях до картинки фону (пейзаж)
  droneImage: string; // Шлях до картинки дрона (без фону)
}

export function ProductCard({ title, description, price, bgImage, droneImage }: ProductCardProps) {
  return (
    <div className={styles["card-container"]}>
      
      {/* Дрон*/}
      <div className={styles["drone-wrapper"]}>
        <img src={droneImage} alt={title} className={styles["drone-img"]} />
      </div>

      {/*Фон картки*/}
      <img src={bgImage} alt="background" className={styles["card-bg"]} />

      {/*Контент*/}
      <div className={styles["card-content"]}>
        <h3 className={styles["title"]}>{title}</h3>
        <p className={styles["description"]}>{description}</p>
        
        <div className={styles["footer"]}>
          <span className={styles["price"]}>from ${price}</span>
          <button className={styles["buy-btn"]}>
            КУПИТИ
            <span className={styles["arrow"]}>→</span>
          </button>
        </div>
      </div>
      
    </div>
  );
};
