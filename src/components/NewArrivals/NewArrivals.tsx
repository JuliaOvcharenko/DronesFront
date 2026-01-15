import React from 'react';
import styles from './NewArrivals.module.css';
import { ProductCard } from './../ProductCard/ProductCard';

import bg1 from '../../assets/images/bg1.png';
import bg2 from '../../assets/images/bg2.png';
import bg3 from '../../assets/images/bg3.png';
import drone1 from '../../assets/images/drone1.png'; 
import drone2 from '../../assets/images/drone2.png'; 
import drone3 from '../../assets/images/drone3.png';

export function NewArrivals() {
  // Данные для карточек (можно вынести в отдельный файл потом)
  const products = [
    {
      id: 1,
      title: "DJI Mini 4K",
      desc: "Easy-To-Use Mini Camera Drone",
      price: "299",
      bg: bg1,
      drone: drone1
    },
    {
      id: 2,
      title: "DJI Mini 4Pro",
      desc: "Flagship Mini Camera Drone",
      price: "759",
      bg: bg2,
      drone: drone2
    },
    {
      id: 3,
      title: "DJI Air 3",
      desc: "Dual-Camera Drone System",
      price: "1099",
      bg: bg3,
      drone: drone3
    }
  ];

  return (
    <section className={styles["section"]}>
      <h2 className={styles["section-title"]}>НОВЕ НА САЙТІ</h2>
      
      <div className={styles["grid"]}>
        {products.map((product) => (
          <ProductCard 
            key={product.id}
            title={product.title}
            description={product.desc}
            price={product.price}
            bgImage={product.bg}
            droneImage={product.drone}
          />
        ))}
      </div>
    </section>
  );
};