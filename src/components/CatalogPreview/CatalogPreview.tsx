import React, { useEffect, useState } from 'react';
import styles from './CatalogPreview.module.css';
import { useNavigate } from 'react-router-dom';
import { getProductSuggestions } from '../../api/products';
import defaultImg from '../../assets/images/catalog1.png';
import { Product } from '../../types/product';


export function CatalogPreview() {
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);

                const data = await getProductSuggestions('popular');
                setProducts(data);
            } catch (err: any) {
                console.error(err);
                setError('Не вдалося завантажити каталог');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return (
            <section className={styles.section}>
                <div className={styles.loading}>Завантаження каталогу...</div>
            </section>
        );
    }

    if (error) {
        return (
            <section className={styles.section}>
                <h2 className={styles.title}>КАТАЛОГ</h2>
                <div style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>
                    {error}
                </div>
            </section>
        );
    }

    return (
        <section className={styles["section"]}>
            <h2 className={styles["title"]}>КАТАЛОГ</h2>

            <div className={styles["grid"]}>
                {products.map((item) => {
                    const imageSrc = item.image ? item.image : defaultImg;

                    return (
                        <div key={item.id} className={styles["card"]}>
                            <div className={styles["image-wrapper"]}>
                                <img src={imageSrc} alt={item.title} className={styles["img"]} />
                            </div>

                            <h3 className={styles["card-title"]}>{item.title}</h3>

                            <div className={styles["price-block"]}>
                                {item.oldPrice && (
                                    <span className={styles["price-old"]}>
                                        ${item.oldPrice}
                                    </span>
                                )}
                                <span className={styles[(item.oldPrice ?? 0) > 0 ? "price-accent" : "price-normal"]}>
                                    ${item.price}
                                </span>
                            </div>
                        </div>
                    );
                })}
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