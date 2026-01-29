import { Product } from '../../api/products'
import styles from './ProductMiniCart.module.css'


interface ProductMiniCardProps {
    product: Product
}

export function ProductMiniCard({product}: ProductMiniCardProps) {
    return (
        <div className = {styles['cart-container']}>
            <img src={product.image} alt={product.title} className={styles["drone-img"]} />
            <p>{product.title}</p>
            <p>{product.price}</p>
        </div>
    )
}