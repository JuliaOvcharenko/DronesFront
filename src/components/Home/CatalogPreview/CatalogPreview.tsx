import { useEffect, useState } from 'react';
import styles from './CatalogPreview.module.css';
import { useNavigate } from 'react-router-dom';
import { IMAGES } from '../../../shared/images';    
import { getProductSuggestions } from '../../../api/products';
import { Product } from '../../../api/allProducts';

interface CatalogPreviewProps {
    title?: string; 
}


export function CatalogPreview({ title = "КАТАЛОГ" }: CatalogPreviewProps) {
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                // Тут можна також додати логіку якщо це "Схожі товари", 
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
                <div className={styles.loading}>Завантаження...</div>
            </section>
        );
    }

    if (error) {
        return (
            <section className={styles.section}>
                <h2 className={styles.title}>{title}</h2>
                <div style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>
                    {error}
                </div>
            </section>
        );
    }

    return (
        <section className={styles["section"]}>
            <h2 className={styles["title"]}>{title}</h2>

            <div className={styles["grid"]}>
                {products.map((item) => {
                    const imageSrc = item.image ? item.image : IMAGES.droneImage;

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