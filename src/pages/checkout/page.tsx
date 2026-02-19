import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './page.module.css'; 
import { searchCity, getWarehouses, City, Warehouse } from '../../shared/api/novaPoshta';

import { IMAGES } from '../../shared/images';
import { useCart } from '../../shared/context/CartContext';
import { createOrder } from '../../shared/api/order';

// Типи
type DeliveryMethod = 'postomat' | 'department' | 'courier';
type PaymentMainMethod = 'on_delivery' | 'pay_now';
type OnlinePaymentMethod = 'card' | 'privat' | 'apple' | 'google';

const RadioCard = ({
    name, value, selectedValue, onChange, label, icon, children, showIcons
}: any) => {
    const isActive = selectedValue === value;
    return (
        <div className={`${styles.deliveryCard} ${isActive ? styles.deliveryCardActive : ''}`}>
            <label className={styles.cardHeader}>
                <input
                    type="radio"
                    name={name}
                    value={value}
                    checked={isActive}
                    onChange={() => onChange(value)}
                    className={styles.hiddenRadio}
                />
                <span className={styles.customRadio}></span>
                <span className={styles.deliveryTitle}>{label}</span>

                {showIcons && (
                    <div className={styles.paymentIconsRow}>
                        <img src={IMAGES.visa} alt="visa" />
                        <img src={IMAGES.mastercard} alt="master" />
                        <img src={IMAGES.googlePay} alt="gpay" />
                        <img src={IMAGES.applePay} alt="apay" />
                    </div>
                )}

                {icon && <img src={icon} alt="icon" className={styles.npIcon} />}
            </label>
            {isActive && children && <div className={styles.cardBody}>{children}</div>}
        </div>
    );
};

export const CheckoutPage = () => {
    const navigate = useNavigate();
    const { items, totalAmount, clearCart } = useCart();

    // Стейт Контактів
    const [lastName, setLastName] = useState('');
    const [name, setName] = useState('');
    const [patronymic, setPatronymic] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    // Стейт Доставки
    const [deliveryType, setDeliveryType] = useState<DeliveryMethod>('department');

    // Нова Пошта
    const [citySearch, setCitySearch] = useState('');
    const [cities, setCities] = useState<City[]>([]);
    const [selectedCityRef, setSelectedCityRef] = useState<string | null>(null);
    const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
    const [selectedWarehouse, setSelectedWarehouse] = useState('');

    // Кур'єр
    const [courierStreet, setCourierStreet] = useState('');
    const [courierHouse, setCourierHouse] = useState('');
    const [courierFlat, setCourierFlat] = useState('');

    // Стейт Оплати
    const [paymentMethod, setPaymentMethod] = useState<PaymentMainMethod>('pay_now');
    const [onlineType, setOnlineType] = useState<OnlinePaymentMethod>('card');

    // ЛОГІКА НП

    // Пошук міста
    useEffect(() => {
        if (citySearch.length > 2) {
            const isExistingCity = cities.find(c => c.Description === citySearch);
            if (!isExistingCity) {
                searchCity(citySearch).then(data => {
                    if (data) setCities(data);
                });
            }
        }
    }, [citySearch]);

    // Вибір міста
    const handleCitySelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setCitySearch(val);
        const city = cities.find(c => c.Description === val);

        if (city) {
            setSelectedCityRef(city.Ref);
            setWarehouses([]);
            setSelectedWarehouse('');
        } else {
            setSelectedCityRef(null);
        }
    };

    // Завантаження відділень
    useEffect(() => {
        if (selectedCityRef) {
            getWarehouses(selectedCityRef).then(data => {
                if (data) setWarehouses(data);
            });
        }
    }, [selectedCityRef]);

    // Фільтрація списку (Поштомат/Відділення)
    const getFilteredWarehouses = () => {
        if (deliveryType === 'postomat') {
            return warehouses.filter(wh =>
                wh.CategoryOfWarehouse === 'Postomat' ||
                wh.Description.toLowerCase().includes('поштомат')
            );
        } else {
            return warehouses.filter(wh =>
                wh.CategoryOfWarehouse !== 'Postomat' &&
                !wh.Description.toLowerCase().includes('поштомат')
            );
        }
    };

    // ВАЛІДАЦІЯ ТА ВІДПРАВКА
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const nameRegex = /^[А-Яа-яІіЇїЄєҐґA-Za-z\s'-]{2,}$/;
        if (!nameRegex.test(name.trim()) || !nameRegex.test(lastName.trim()) || !nameRegex.test(patronymic.trim())) {
            alert("ПІБ має містити лише літери та бути не коротшим за 2 символи");
            return;
        }

        const phoneRegex = /^(?:\+380|380|0)\d{9}$/;
        const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
        if (!phoneRegex.test(cleanPhone)) {
            alert("Введіть коректний номер телефону наприклад +380991234567 або 0991234567");
            return;
        }

        if (deliveryType === 'courier') {
            if (!courierStreet.trim() || !courierHouse.trim()) {
                alert("Вкажіть вулицю та номер будинку для кур'єра");
                return;
            }
        } else {
            if (!selectedCityRef || !selectedWarehouse) {
                alert("Оберіть місто та відділення або поштомат");
                return;
            }
        }

        // Формування адреси
        let addressData = {
            city: citySearch,
            street: '',
            house: '-',
            flat: '-'
        };

        if (deliveryType === 'courier') {
            addressData.street = courierStreet;
            addressData.house = courierHouse;
            addressData.flat = courierFlat || '-';
        } else {
            const whName = warehouses.find(w => w.Ref === selectedWarehouse)?.Description || selectedWarehouse;
            addressData.street = whName;
        }

        // Payload
        const orderPayload = {
            username: name,
            lastname: lastName,
            patronymic: patronymic,
            phone: phone,
            email: email,
            totalPrice: totalAmount,
            totalDiscount: items.reduce((acc, item) => acc + (item.oldPrice ? (item.oldPrice - item.price) * item.quantity : 0), 0),
            countOfProducts: items.reduce((acc, item) => acc + item.quantity, 0),
            payment: paymentMethod === 'pay_now' ? `Online: ${onlineType}` : 'On Delivery',
            delivery: {
                method: deliveryType,
                ...addressData
            },
            products: items.map(item => ({
                productId: item.id,
                count_of_product: item.quantity,
                price: item.price,
                discount: item.oldPrice ? item.oldPrice - item.price : 0
            }))
        };

        // Відправка
        try {
            console.log("Sending:", orderPayload);
            await createOrder(orderPayload);
            alert("Замовлення успішно оформлено!");
            clearCart();
            navigate('/account/orders');
        } catch (error: any) {
            console.error(error);
            // Виводимо текст помилки
            if (error.message.includes('<')) {
                alert("Помилка сервера. Перевірте адресу API (BASE_URL).");
            } else {
                alert(`Помилка: ${error.message}`);
            }
        }
    };

    // Helper для рендеру інпутів НП
    const renderNPInputs = (placeholderTitle: string) => (
        <div>
            <label className={styles.nestedLabel}>Місто</label>
            <input
                list="cities-list"
                placeholder="Введіть місто"
                className={styles.input}
                value={citySearch}
                onChange={handleCitySelect}
            />

            <label className={styles.nestedLabel}>{placeholderTitle}</label>
            <select
                title='select'
                className={styles.input}
                value={selectedWarehouse}
                onChange={(e) => setSelectedWarehouse(e.target.value)}
                disabled={!selectedCityRef}
            >
                <option value="" disabled>
                    {selectedCityRef ? '--- Оберіть зі списку ---' : 'Спочатку оберіть місто'}
                </option>

                {getFilteredWarehouses().map(wh => (
                    <option key={wh.Ref} value={wh.Ref}>{wh.Description}</option>
                ))}
            </select>
        </div>
    );

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>ОФОРМИТИ ЗАМОВЛЕННЯ</h1>

            <form className={styles.layout}>
                <datalist id="cities-list">
                    {cities.map(c => <option key={c.Ref} value={c.Description} />)}
                </datalist>

                {/* ЛІВА КОЛОНКА */}
                <div className={styles.leftColumn}>

                    {/* Контакти */}
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Ваші контактні дані</h2>
                        <div className={styles.inputGroup}>
                            <input type="text" placeholder="Прізвище *" className={styles.input} value={lastName} onChange={e => setLastName(e.target.value)} />
                            <input type="text" placeholder="Ім'я *" className={styles.input} value={name} onChange={e => setName(e.target.value)} />
                            <input type="text" placeholder="По батькові *" className={styles.input} value={patronymic} onChange={e => setPatronymic(e.target.value)} />
                            <input type="tel" placeholder="Телефон *" className={styles.input} value={phone} onChange={e => setPhone(e.target.value)} />
                            <input type="email" placeholder="Email" className={styles.input} value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                    </div>

                    {/* Доставка */}
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Доставка</h2>
                        <div className={styles.deliveryContainer}>

                            <RadioCard
                                name="delivery" value="postomat" selectedValue={deliveryType} onChange={setDeliveryType}
                                label="Нова Пошта до поштомату" icon={IMAGES.novaPoshtaIcon}
                            >
                                {renderNPInputs('Оберіть поштомат')}
                            </RadioCard>

                            <RadioCard
                                name="delivery" value="department" selectedValue={deliveryType} onChange={setDeliveryType}
                                label="Нова Пошта до відділення" icon={IMAGES.novaPoshtaIcon}
                            >
                                {renderNPInputs('Оберіть відділення')}
                            </RadioCard>

                            <RadioCard
                                name="delivery" value="courier" selectedValue={deliveryType} onChange={setDeliveryType}
                                label="Нова Пошта кур'єром" icon={IMAGES.novaPoshtaIcon}
                            >
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <label className={styles.nestedLabel}>Місто</label>
                                    <input
                                        list="cities-list"
                                        placeholder="Введіть місто"
                                        className={styles.input}
                                        value={citySearch}
                                        onChange={handleCitySelect}
                                    />
                                    <input type="text" placeholder="Вулиця *" className={styles.input} value={courierStreet} onChange={e => setCourierStreet(e.target.value)} />
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <input type="text" placeholder="Буд. *" className={styles.input} value={courierHouse} onChange={e => setCourierHouse(e.target.value)} style={{ flex: 1 }} />
                                        <input type="text" placeholder="Кв." className={styles.input} value={courierFlat} onChange={e => setCourierFlat(e.target.value)} style={{ flex: 1 }} />
                                    </div>
                                </div>
                            </RadioCard>
                        </div>
                    </div>

                    {/* Оплата */}
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Оплата</h2>
                        <div className={styles.deliveryContainer}>
                            <RadioCard
                                name="paymentMain" value="on_delivery" selectedValue={paymentMethod} onChange={setPaymentMethod}
                                label="Оплата при отриманні"
                            />

                            <RadioCard
                                name="paymentMain" value="pay_now" selectedValue={paymentMethod} onChange={setPaymentMethod}
                                label="Оплатити зараз" showIcons={true}
                            >
                                <div className={styles.subPaymentList}>
                                    {['card', 'privat', 'apple', 'google'].map((type) => (
                                        <label key={type} className={styles.subPaymentItem}>
                                            <input
                                                type="radio"
                                                name="onlineType"
                                                value={type}
                                                checked={onlineType === type}
                                                onChange={() => setOnlineType(type as OnlinePaymentMethod)}
                                            />
                                            <span style={{ textTransform: 'capitalize' }}>{type} Pay</span>
                                        </label>
                                    ))}
                                </div>
                            </RadioCard>
                        </div>
                    </div>
                </div>

                {/* ПРАВА КОЛОНКА */}
                <div className={styles.rightColumn}>
                    <div className={styles.summaryCard}>
                        <div className={styles.summaryHeader}>
                            <span>Замовлення</span>
                            <img src={IMAGES.penIcon} alt="penIcon"/>
                        </div>

                        <div className={styles.productList}>
                            {items.length === 0 ? (
                                <p style={{ color: '#6B7280', textAlign: 'center' }}>Кошик порожній</p>
                            ) : (
                                items.map(item => (
                                    <div key={item.id} className={styles.productItem}>
                                        <div className={styles.productImg} style={{ backgroundImage: `url(${item.image})` }}></div>
                                        <div className={styles.productInfo}>
                                            <div style={{ fontWeight: 600 }}>{item.title}</div>
                                            <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
                                                {item.oldPrice && <span style={{ textDecoration: 'line-through', color: '#9CA3AF', fontSize: '12px' }}>{item.oldPrice} ₴</span>}
                                                <span style={{ color: '#E85A2D', fontWeight: 700 }}>{item.price} ₴</span>
                                            </div>
                                        </div>
                                        <div style={{ fontSize: '14px', color: '#6B7280' }}>{item.quantity} шт</div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className={styles.summaryDetails}>
                            <div className={styles.priceRow}>
                                <span style={{ color: '#6B7280' }}>Загальна сума</span>
                                <b>{totalAmount} ₴</b>
                            </div>
                            <div className={styles.priceRow}>
                                <span style={{ color: '#6B7280' }}>Доставка</span>
                                <span style={{ color: '#9CA3AF', fontSize: '12px' }}>За тарифом перевізника</span>
                            </div>
                            <div className={styles.totalRow}>
                                <span>До сплати</span>
                                <span>{totalAmount} ₴</span>
                            </div>
                        </div>

                        <button
                            type="button"
                            className={styles.submitBtn}
                            onClick={handleSubmit}
                        >
                            ПІДТВЕРДИТИ ЗАМОВЛЕННЯ
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};