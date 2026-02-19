import { BASE_URL } from "./baseUrl";


// Інтерфейс який відповідає Prisma Model Order + вкладені дані
export interface CreateOrderDto {
    username: string;     // Збігається з Order.username
    lastname: string;     // Збігається з Order.lastname
    patronymic: string;   // Збігається з Order.patronymic 
    phone: string;        // Для оновлення User, бо в Order немає поля
    email: string;        // Для чеку
    
    totalPrice: number;       // Order.totalPrice
    totalDiscount: number;    // Order.totalDiscount
    countOfProducts: number;  // Order.countOfProducts
    payment: string;          // Order.payment (String)
    
    // Для створення запису в таблиці Address
    delivery: {
        method: string;
        city: string;
        street: string; 
        house: string;
        flat: string;
    };

    // Для таблиці OrderProducts
    products: {
        productId: number;
        count_of_product: number; 
        price: number;
        discount: number;
    }[];
}

export const createOrder = async (orderData: CreateOrderDto) => {
    const token = localStorage.getItem('token'); 

    // Якщо юзер не залогінений, бекенд поверне помилку через userId Int
    if (!token) {
        throw new Error("Для оформлення замовлення потрібно увійти в акаунт");
    }

    const response = await fetch(`${BASE_URL}/orders`, { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Не вдалося створити замовлення');
    }

    return await response.json();
};
export const getMyOrders = async () => {
    const token = localStorage.getItem('token'); 
    
    const response = await fetch(`${BASE_URL}/orders/my`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Не вдалося завантажити замовлення');
    }

    return await response.json();
};