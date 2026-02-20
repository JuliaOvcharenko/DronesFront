import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import { IMAGES } from '../../../shared/images';
import { getMyOrders } from '../../../shared/api/order';

interface OrderItem {
    id: number;
    title: string;
    image: string;
    price: number;
    oldPrice?: number;
    quantity: number;
}

interface Order {
    id: string;
    publicId: string;
    date: string;
    trackingNumber: string;
    status: 'new' | 'packing' | 'shipping' | 'delivered' | 'received' | 'canceled';
    statusLabel: string;
    total: number;
    savings: number;
    paymentMethod: string;
    deliveryMethod: string;
    recipient: {
        name: string;
        phone: string;
        address: string;
    };
    items: OrderItem[];
}

const OrderStepper = ({ status }: { status: Order['status'] }) => {
    const steps = [
        { key: 'new', label: 'Оформлено' },
        { key: 'packing', label: 'Збирається' },
        { key: 'shipping', label: 'У дорозі' },
        { key: 'delivered', label: 'Доставлено' },
        { key: 'received', label: 'Отримано' }
    ];

    const currentIndex = steps.findIndex(s => s.key === status);
    const activeIndex = currentIndex === -1 ? 0 : currentIndex;

    return (
        <div className={styles.stepperContainer}>
            <div className={styles.stepperLineBackground}></div>
            <div className={styles.stepsWrapper}>
                {steps.map((step, index) => {
                    const isCurrent = index === activeIndex;
                    return (
                        <div key={step.key} className={styles.stepItem}>
                            <div className={styles.iconContainer}>
                                {isCurrent ? (
                                    <div className={styles.activeIconWrapper}>
                                        <img src={IMAGES.busIcon} alt="Active" className={styles.busIcon} />
                                    </div>
                                ) : (
                                    <div className={styles.stepDot}></div>
                                )}
                            </div>
                            <span className={`${styles.stepLabel} ${isCurrent ? styles.stepLabelActive : ''}`}>
                                {step.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const getStatusLabel = (status: string): string => {
    switch (status) {
        case 'new': return 'Оформлено';
        case 'packing': return 'Збирається';
        case 'shipping': return 'У дорозі';
        case 'delivered': return 'Доставлено';
        case 'received': return 'Отримано';
        case 'canceled': return 'Скасовано';
        default: return 'Оформлено';
    }
};

export const OrdersPage = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getMyOrders();

                const formattedOrders = data.map((backendOrder: any): Order => {
                    const dateObj = new Date(backendOrder.orderDate);
                    const formattedDate = dateObj.toLocaleDateString('uk-UA');
                    const currentStatus = backendOrder.status || 'new';

                    return {
                        id: String(backendOrder.id),
                        publicId: `№${backendOrder.id}`,
                        date: formattedDate,
                        trackingNumber: String(backendOrder.trackingNumber || 'Очікується'),
                        status: currentStatus,
                        statusLabel: getStatusLabel(currentStatus),
                        total: backendOrder.totalPrice,
                        savings: backendOrder.totalDiscount,
                        paymentMethod: backendOrder.payment,
                        deliveryMethod: 'Нова Пошта',
                        recipient: {
                            name: `${backendOrder.lastname || ''} ${backendOrder.username || ''}`.trim() || 'Не вказано',
                            phone: backendOrder.user?.phoneNumber || 'Не вказано',
                            address: backendOrder.address
                                ? `${backendOrder.address.city}, ${backendOrder.address.street}`
                                : 'Адреса уточнюється'
                        },
                        items: backendOrder.products.map((p: any): OrderItem => ({
                            id: p.Product?.id || Math.random(),
                            title: p.Product?.name || 'Товар',
                            image: p.Product?.mainImage?.image || IMAGES.droneImage,
                            price: p.price,
                            oldPrice: p.discount > 0 ? p.price + p.discount : undefined,
                            quantity: p.count_of_product
                        }))
                    };
                });

                const sortedOrders = formattedOrders.sort((a: any, b: any) => Number(b.id) - Number(a.id));

                setOrders(sortedOrders);
                if (sortedOrders.length > 0) {
                    setExpandedOrderId(sortedOrders[0].id);
                }
            } catch (error) {
                console.error("Помилка завантаження замовлень:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const toggleOrder = (id: string) => {
        setExpandedOrderId(prev => prev === id ? null : id);
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        alert("Трек-номер скопійовано!");
    };

    if (isLoading) {
        return <div className={styles.container}>Завантаження замовлень...</div>;
    }

    if (orders.length === 0) {
        return <div className={styles.container}>
            <h2 className={styles.pageTitle}>У вас ще немає замовлень</h2>
            <h5>Будь ласка, додайте їх</h5>
        </div>;
        
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.pageTitle}>Мої замовлення</h2>

            <div className={styles.list}>
                {orders.map(order => {
                    const isExpanded = expandedOrderId === order.id;
                    const isCompleted = order.status === 'received';

                    return (
                        <div key={order.id} className={styles.card}>
                            <div className={styles.header} onClick={() => toggleOrder(order.id)}>
                                <div className={`${styles.statusDot} ${isCompleted ? styles.statusGreen : styles.statusGrey}`}></div>

                                <div className={styles.headerInfoBlock}>
                                    <div className={styles.headerRow}>
                                        <span className={styles.headerId}>{order.publicId} від {order.date}</span>
                                        <span className={styles.headerLabel}>Номер відправлення</span>
                                        <span className={styles.headerLabel}>Сума замовлення</span>
                                    </div>
                                    <div className={styles.headerRowMain}>
                                        <span className={styles.headerStatusText}>{order.statusLabel}</span>
                                        <span className={styles.headerTracking}>{order.trackingNumber}</span>
                                        <span className={styles.headerPrice}>{order.total.toLocaleString()} ₴</span>
                                    </div>
                                </div>

                                <div className={styles.miniImages}>
                                    {order.items.slice(0, 3).map(item => (
                                        <img key={item.id} src={item.image} alt="product" />
                                    ))}
                                </div>

                                <div className={styles.arrowIcon}>
                                    <img src={isExpanded ? IMAGES.upIcon : IMAGES.downIcon} alt="Toggle" />
                                </div>
                            </div>

                            {isExpanded && (
                                <div className={styles.body}>
                                    <div className={styles.trackingBlock}>
                                        <span className={styles.trackingLabel}>Номер відправлення: </span>
                                        <span className={styles.trackingValue}>{order.trackingNumber}</span>
                                        <button onClick={() => copyToClipboard(order.trackingNumber)} className={styles.copyBtn}>
                                            ❐
                                        </button>
                                    </div>

                                    <OrderStepper status={order.status} />

                                    <div className={styles.splitLayout}>
                                        <div className={styles.leftColumn}>
                                            <h4 className={styles.columnTitle}>Інформація про замовлення</h4>

                                            <div className={styles.infoGroup}>
                                                <label>Адреса доставки</label>
                                                <p style={{ whiteSpace: 'pre-line' }}>{order.recipient.address}</p>
                                            </div>

                                            <div className={styles.infoGroup}>
                                                <label>Отримувач</label>
                                                <p>{order.recipient.name}</p>
                                                <p>{order.recipient.phone}</p>
                                            </div>
                                        </div>

                                        <div className={styles.rightColumn}>
                                            <div className={styles.productsContainer}>
                                                <div className={styles.productsHeaderRow}>
                                                    <span style={{ textAlign: 'center' }}>Фото</span>
                                                    <span>Назва</span>
                                                    <span>Ціна</span>
                                                    <span style={{ textAlign: 'center' }}>Кількість</span>
                                                    <span style={{ textAlign: 'center' }}>Сума</span>
                                                </div>

                                                {order.items.map(item => (
                                                    <div key={item.id} className={styles.productRow}>
                                                        <div className={styles.prodImg}>
                                                            <img src={item.image} alt={item.title} />
                                                        </div>
                                                        <div className={styles.prodName}>{item.title}</div>
                                                        <div className={styles.prodPriceBlock}>
                                                            {item.oldPrice && <span className={styles.oldPrice}>{item.oldPrice} ₴</span>}
                                                            <span className={styles.currentPrice}>{item.price} ₴</span>
                                                        </div>
                                                        <div className={styles.prodQty}>{item.quantity}</div>
                                                        <div className={styles.prodSum}>{(item.price * item.quantity).toLocaleString()} ₴</div>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className={styles.financialsContainer}>
                                                <div className={styles.finRow}>
                                                    <span className={styles.finLabel}>Оплата</span>
                                                    <span className={styles.finValue}>{order.paymentMethod}</span>
                                                </div>
                                                <div className={styles.finRow}>
                                                    <span className={styles.finLabel}>Доставка</span>
                                                    <span className={styles.finValue}>{order.deliveryMethod}</span>
                                                </div>
                                                <div className={styles.finRow}>
                                                    <span className={styles.finLabel}>Загальна сума</span>
                                                    <span className={styles.finValue}>{order.total + order.savings} ₴</span>
                                                </div>
                                                <div className={styles.finRow}>
                                                    <span className={styles.finLabel}>Заощаджено</span>
                                                    <span className={styles.finValue}>{order.savings} ₴</span>
                                                </div>
                                                <div className={styles.finRow}>
                                                    <span className={styles.totalLabel}>Разом</span>
                                                    <span className={styles.totalValue}>{order.total} ₴</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};