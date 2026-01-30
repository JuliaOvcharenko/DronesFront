import styles from './ProductHeader.module.css';
import { Product } from '../../types/product';
import buttonBuy from '../../assets/icons/buttonBuy.png';

interface Props {
    product: Product;
}

export const ProductHeader: React.FC<Props> = ({ product }) => {
    return (
        <section className={styles.section}>

            <div className={styles.contentWrapper}>

                <div className={styles.headerInfo}>
                    <h1 className={styles.title}>{product.title}</h1>
                    <p className={styles.description}>{product.description}</p>
                </div>

                <div className={styles.visualContainer}>
                    <div className={styles.imageWrapper}>
                        <div className={styles.floatingAnimation}>
                            <img
                                src={product.image}
                                alt={product.title}
                                className={styles.mainImage}
                            />
                        </div>
                    </div>

                    <div className={styles.buyCard}>
                        <div className={styles.cardHeader}>
                            {/* Міні-фото зліва */}
                            <img
                                src={product.image}
                                alt=""
                                className={styles.miniProductImage}
                            />

                            {/* Блок з назвою та цінами */}
                            <div className={styles.titlePriceBlock}>
                                <h3 className={styles.cardTitle}>{product.title}</h3>

                                <div className={styles.priceBlock}>
                                    {product.oldPrice && (
                                        <span className={styles.oldPrice}>
                                            {product.oldPrice.toLocaleString()} ₴
                                        </span>
                                    )}
                                    <span className={styles.currentPrice}>
                                        {product.price.toLocaleString()} ₴
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Кнопки внизу */}
                        <div className={styles.containerBuy}>
                            <img src={buttonBuy} alt="Cart" style={{ width: '3.5rem', height: 'auto' }} />

                            {/* Чорна кнопка */}
                            <button className={styles.buyButton}>
                                ЗАМОВИТИ <span>→</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>


            <div className={styles.bottomCurve}></div>
        </section>
    );
};