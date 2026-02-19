import React from 'react';
import styles from './CartModal.module.css';
import { useCart } from '../../shared/context/CartContext';
import { useNavigate } from 'react-router-dom';
import { IMAGES } from '../../shared/images';

export const CartModal = () => {
    const { 
        isCartOpen, 
        closeCart, 
        items, 
        removeFromCart, 
        updateQuantity, 
        totalAmount 
    } = useCart();
    
    const navigate = useNavigate();

    if (!isCartOpen) return null;

    const handleCheckout = () => {
        closeCart();
        navigate('/checkout');
    };

    return (
        <div className={styles.overlay} onClick={closeCart}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <div className={styles.header}>
                    <h2>Кошик</h2>
                    <button onClick={closeCart} className={styles.closeBtn}>✕</button>
                </div>

                <div className={styles.itemsList}>
                    {items.length === 0 ? (
                        <p className={styles.emptyText}>Ваш кошик порожній</p>
                    ) : (
                        items.map(item => (
                            <div key={item.id} className={styles.item}>
                                <div className={styles.imageContainer}>
                                    <img src={item.image} alt={item.title} />
                                </div>
                                
                                <div className={styles.itemInfo}>
                                    <h3>{item.title}</h3>
                                    <div className={styles.priceBlock}>
                                        {item.oldPrice && (
                                            <span className={styles.oldPrice}>{item.oldPrice} ₴</span>
                                        )}
                                        <span className={styles.currentPrice}>{item.price} ₴</span>
                                    </div>
                                </div>

                                <div className={styles.controls}>
                                    <div className={styles.quantity}>
                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                    </div>
                                    <button onClick={() => removeFromCart(item.id)} className={styles.deleteBtn}>
                                        <img src={IMAGES.trashIcon} alt="trashIcon"/>
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className={styles.footer}>
                    <div className={styles.summaryRow}>
                        <span>Загальна сума</span>
                        <span className={styles.summaryValue}>{totalAmount} ₴</span>
                    </div>
                    
                    <div className={styles.buttons}>
                        <button onClick={closeCart} className={styles.btnOutline}>
                            ПРОДОВЖИТИ ПОКУПКИ
                        </button>
                        <button onClick={handleCheckout} className={styles.btnSolid}>
                            ОФОРМИТИ ЗАМОВЛЕННЯ →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};