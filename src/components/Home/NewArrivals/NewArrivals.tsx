import React, { useEffect, useState } from 'react';
import styles from './NewArrivals.module.css';
import { useNavigate } from 'react-router-dom';
import { getProductSuggestions } from '../../../api/products';
import { ProductCard } from '../../Product/ProductCard';
import { Product } from '../../../types/product';
import { IMAGES } from '../../../shared/images';

export function NewArrivals() {
    const navigate = useNavigate();

    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const backgrounds = [IMAGES.bg1, IMAGES.bg2, IMAGES.bg3];
    const gradients = [
        "linear-gradient(to bottom, rgba(230, 185, 100, 0) 30%, #E6B964 100%)",
        "linear-gradient(to bottom, rgba(58, 74, 58, 0) 30%, #3A4A3A 100%)",
        "linear-gradient(to bottom, rgba(90, 134, 147, 0) 30%, #5A8693 100%)"
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);

                //  !!!
                await new Promise(res => setTimeout(res, 3000));



                const data = await getProductSuggestions('new');
                setProducts(data);
            } catch (err: any) {
                setError('Не вдалося завантажити товари');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return (
            <section className={styles.section}>
                <h2 className={styles["section-title"]}>Завантаження...</h2>
            </section>
        );
    }

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
                    const droneImg = product.image ? product.image : IMAGES.droneImage;

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