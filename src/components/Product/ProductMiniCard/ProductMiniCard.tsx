
import { Product } from '../../../types/product'
import styles from './ProductMiniCard.module.css'


interface ProductMiniCardProps {
    product: Product
}

export function ProductMiniCard({product}: ProductMiniCardProps) {
    return (
        <div className = {styles['cart-container']}>
            <img src={product.image} alt={product.title} className={styles["drone-img"]} />
            <div className={styles["text-container"]}>
                <p className={styles["product-title"]}>{product.title}</p>
                <p className={styles["product-price"]}>{product.price} ₴</p>
            </div>
            <button className={styles['buy-button']}>🛒</button>
        </div>
    )
}