import { Link } from 'react-router-dom'
import styles from './ProductMiniCard.module.css'
import { Product } from '../../../types/product';
import { IMAGES } from '../../../shared/images';


interface ProductMiniCardProps {
    product: Product
}


export function ProductMiniCard({ product }: ProductMiniCardProps) {
    return (
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
                                <span className={styles["old-price"]}>
                                    {product.oldPrice.toLocaleString()} ₴
                                </span>
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
                    <img src={IMAGES.cartImage} alt='add to cart'/>
                </button>
            </div>
        </Link>
    )
}