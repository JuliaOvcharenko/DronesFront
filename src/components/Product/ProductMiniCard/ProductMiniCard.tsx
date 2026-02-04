import { Link } from 'react-router-dom'
import styles from './ProductMiniCard.module.css'
import { Product } from '../../../types/product';

interface ProductMiniCardProps {
    product: Product
}

export function ProductMiniCard({ product }: ProductMiniCardProps) {
    return (
        // Link робить всю картку клікабельною і веде на /product/:id
        <Link to={`/product/${product.id}`} className={styles['card-link']}>
            
            <div className={styles['cart-container']}>
                <div className={styles['img-wrapper']}>
                     <img src={product.image} alt={product.title} className={styles["drone-img"]} />
                </div>

                <div className={styles["text-container"]}>
                    <p className={styles["product-title"]}>{product.title}</p>
                    
                    <div className={styles["price-wrapper"]}>
                        {product.oldPrice ? (
                            <>
                                {/* Стара ціна (сіра, перекреслена) */}
                                <span className={styles["old-price"]}>
                                    {product.oldPrice.toLocaleString()} ₴
                                </span>
                                {/* Нова ціна (червона) */}
                                <span className={styles["price-discount"]}>
                                    {product.price.toLocaleString()} ₴
                                </span>
                            </>
                        ) : (

                            <span className={styles["product-price"]}>
                                {product.price.toLocaleString()} ₴
                            </span>
                        )}
                    </div>
                </div>
                <button 
                    className={styles['buy-button']}
                    onClick={(e) => {
                        e.preventDefault(); 
                        console.log('Add to cart:', product.id);
                    }}
                >
                    🛒
                </button>
            </div>
        </Link>
    )
}