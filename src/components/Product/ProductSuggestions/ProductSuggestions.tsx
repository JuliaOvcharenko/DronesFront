import { useEffect, useState } from 'react';
import styles from './ProductSuggestions.module.css';
import { useNavigate } from 'react-router-dom';
import { IMAGES } from '../../../shared/images';

interface SameAsPreviewProps {
    titlePage: string;
    limit?: number;
    sameAs?: number;
}

export interface Product {
    id: number;
    name: string;
    price: number;
    oldPrice?: number;
    mainImage?: { image: string } | null; 
}

const BASE_URL = 'http://127.0.0.1:8000';


const getFullUrl = (path?: string | null) => {
    if (!path) return undefined;
    if (path.startsWith('http')) return path;
    return `${BASE_URL}/${path}`;
};


export async function getProductSuggestions(sameAs: number, limit: number = 16): Promise<Product[]> {
    try {
        const request = await fetch(`${BASE_URL}/products/suggestions?sameAs=${sameAs}&limit=${limit}`);
        if (!request.ok) throw new Error('Failed to load products');

        const data = await request.json();

        return data.map((p: any) => ({
            id: p.id,
            name: p.name,
            price: p.price,
            oldPrice: p.oldPrice || p.old_price,
            mainImage: p.mainImage || null
        }));
    } catch (error) {
        throw error;
    }
}

export function ProductSuggestions({ limit = 16, sameAs }: SameAsPreviewProps) {
    const navigate = useNavigate();

    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!sameAs) return;

        const fetchData = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const data = await getProductSuggestions(sameAs, limit);

                setProducts(data);
            } catch (err) {
                console.error(err);
                setError('Не вдалося завантажити товари');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [sameAs, limit]);

    if (isLoading) {
        return (
            <section className={styles.section}>
                <div className={styles.loading}>Завантаження...</div>
            </section>
        )
    }

    if (error) {
        return (
            <section className={styles.section}>
                <div style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>
                    {error}
                </div>
            </section>
        )
    }

    return (
        <section className={styles.section}>
            <h3 className={styles['catalog-p']}>СХОЖІ ТОВАРИ</h3>
            <div className={styles.grid}>
                {products.map(item => {
                    const imageSrc = getFullUrl(item.mainImage?.image) || IMAGES.droneImage;

                    return (
                        <div key={item.id} className={styles.card} onClick={() => navigate(`/product/${item.id}`)}>
                            <div className={styles['image-wrapper']}>
                                <img src={imageSrc} alt={item.name} className={styles.img} />
                            </div>

                            <h3 className={styles['card-title']}>{item.name}</h3>

                            <div className={styles['price-block']}>
                                {item.oldPrice && <span className={styles['price-old']}>${item.oldPrice}</span>}
                                <span className={item.oldPrice ? styles['price-accent'] : styles['price-normal']}>
                                    ${item.price}
                                </span>
                            </div>
                        </div>
                    )
                })}
            </div>

            <button className={styles['view-all-btn']} onClick={() => navigate('/catalog')} style={{ marginTop: '2rem' }}>
                ДИВИТИСЬ ВСІ
                <span className={styles.arrow}>→</span>
            </button>
        </section>
    );
}
