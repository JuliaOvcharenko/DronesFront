import React from 'react';
import styles from './CatalogPreview.module.css';
import { useNavigate } from 'react-router-dom'; 

import img1 from '../../assets/images/catalog1.png';
import img2 from '../../assets/images/catalog2.png';
import img3 from '../../assets/images/catalog3.png';
import img4 from '../../assets/images/catalog4.png';

export function CatalogPreview() {
    const navigate = useNavigate(); 

    const items = [
        {
            id: 1,
            title: "DJI Mini 4K",
            price: "29 900 ₴",
            oldPrice: "29 900 ₴",
            image: img1
        },
        {
            id: 2,
            title: "DJI Mini 4K",
            price: "29 900 ₴",
            oldPrice: null,
            image: img2
        },
        {
            id: 3,
            title: "DJI Mini 4 Pro",
            price: "29 900 ₴",
            oldPrice: "34 000 ₴",
            image: img3
        },
        {
            id: 4,
            title: "DJI Flip",
            price: "29 900 ₴",
            oldPrice: null,
            image: img4
        }
    ];

    return (
        <section className={styles["section"]}>
            <h2 className={styles["title"]}>КАТАЛОГ</h2>

            <div className={styles["grid"]}>
                {items.map((item) => (
                    <div key={item.id} className={styles["card"]}>

                        {/* Картинка */}
                        <div className={styles["image-wrapper"]}>
                            <img src={item.image} alt={item.title} className={styles["img"]} />
                        </div>

                        {/* Назва */}
                        <h3 className={styles["card-title"]}>{item.title}</h3>

                        {/* Ціна */}
                        <div className={styles["price-block"]}>
                            {item.oldPrice && item.oldPrice !== item.price && (
                                <span className={styles["old-price"]}>{item.oldPrice}</span>
                            )}

                            <span className={
                                item.oldPrice && item.oldPrice !== item.price
                                    ? styles["price-accent"]
                                    : styles["price-normal"]
                            }>
                                {item.price}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <button 
                className={styles["view-all-btn"]}
                onClick={() => navigate('/catalog')}
            >
                ДИВИТИСЬ ВСІ
                <span className={styles["arrow"]}>→</span>
            </button>

        </section>
    );
};