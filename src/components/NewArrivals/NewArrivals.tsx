import React, { useEffect, useState } from 'react';
import styles from './NewArrivals.module.css';
import { ProductCard } from './../ProductCard/ProductCard';
import { useNavigate } from 'react-router-dom';

// Імпорт функції запиту та типу даних
import { getProductSuggestions, Product } from '../../api/products';

// Імпорт картинок для фону та заглушок
import bg1 from '../../assets/images/bg1.png';
import bg2 from '../../assets/images/bg2.png';
import bg3 from '../../assets/images/bg3.png';
import Drone1 from '../../assets/images/drone1.png'; 
import Drone2 from '../../assets/images/drone2.png';
import Drone3 from '../../assets/images/drone3.png';

export function NewArrivals() {
  const navigate = useNavigate();

  // Стани для даних, завантаження та помилки
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Масиви для красивого відображення (циклічно підставляємо фони та градієнти)
  const backgrounds = [bg1, bg2, bg3];
  const drones = [Drone1, Drone2, Drone3];
  const gradients = [
    "linear-gradient(to bottom, rgba(230, 185, 100, 0) 30%, #E6B964 100%)", // Жовтий
    "linear-gradient(to bottom, rgba(58, 74, 58, 0) 30%, #3A4A3A 100%)",     // Зелений
    "linear-gradient(to bottom, rgba(90, 134, 147, 0) 30%, #5A8693 100%)"    // Блакитний
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Робимо запит на "нові" товари
        const data = await getProductSuggestions('new');
        setProducts(data);
        console.log("Отримані дані з беку:", data);
      } catch (err: any) {
        setError('Не вдалося завантажити товари');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Відображення стану завантаження
  if (isLoading) {
    return (
      <section className={styles.section}>
        <h2 className={styles["section-title"]}>Завантаження...</h2>
      </section>
    );
  }

  // Відображення помилки
  if (error) {
    return (
      <section className={styles.section}>
        <h2 className={styles["section-title"]}>НОВЕ НА САЙТІ</h2>
        <div style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>
          {error}
        </div>
      </section>
    );
  }

  return (
    <section className={styles["section"]}>
      <h2 className={styles["section-title"]}>НОВЕ НА САЙТІ</h2>
      
      <div className={styles["grid"]}>
        {products.map((product, index) => {
          const bgImage = backgrounds[index % backgrounds.length];
          const gradient = gradients[index % gradients.length];
          const droneImg = (product.images && product.images.length > 0) ? product.images[0] : drones[index % drones.length];

          return (
            <ProductCard 
              key={product.id}
              title={product.title}
              description={product.description || "Опис недоступний"}
              price={String(product.price)}
              bgImage={bgImage}
              droneImage={droneImg}
              overlayGradient={gradient}
            />
          );
        })}
      </div>
    </section>
  );
};