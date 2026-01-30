// src/api/products.ts
import { Product, InfoBlock } from "../types/product"; 

const BASE_URL = 'http://127.0.0.1:8000';

// Інтерфейс того, що приходить з Бекенду (Raw Data)
interface BackendProduct {
    id: number;
    name: string;
    price: number;
    discount: number;
    countOfProduct: number;
    categoryId: number;
    description?: string;
    mainImage?: { image: string; };
    // Додаємо інфоблоки, бо вони можуть прийти для сторінки товару
    infoBlocks?: any[]; 
}

// 👇 1. Отримання списку (для Каталогу/Home)
export const getProductSuggestions = async (
    type: 'new' | 'popular'
): Promise<Product[]> => {
    const queryParam = type === 'new' ? 'isNew=true' : 'popular=true';
    const url = `${BASE_URL}/products/suggestions?${queryParam}`;

    try {
        const response = await fetch(url);
        if (response.status !== 200) throw new Error(`Server error: ${response.status}`);
        
        const rawData: BackendProduct[] = await response.json();

        // Використовуємо спільну функцію мапінгу
        return rawData.map(mapBackendToFrontend);
    } catch (error) {
        console.error("Error fetching suggestions:", error);
        throw error;
    }
};

// 👇 2. Отримання ОДНОГО товару (Це тобі треба для Product Page)
export const getProductById = async (id: number): Promise<Product> => {
    // Припускаємо, що на бекенді буде такий роут (зробиш його пізніше)
    const url = `${BASE_URL}/products/${id}`; 

    try {
        const response = await fetch(url);
        if (response.status !== 200) throw new Error(`Product not found`);
        
        const rawItem: BackendProduct = await response.json();

        return mapBackendToFrontend(rawItem);
    } catch (error) {
        console.error(`Error fetching product ${id}:`, error);
        throw error;
    }
};

// 👇 3. Допоміжна функція: перетворює "Бекенд" вигляд у "Фронтенд"
const mapBackendToFrontend = (item: BackendProduct): Product => {
    const hasDiscount = item.discount > 0;
    const finalPrice = hasDiscount ? item.price - item.discount : item.price;
    const imageUrl = item.mainImage?.image || '';

    // Мапимо інфоблоки, якщо вони прийшли з бекенду
    const mappedInfoBlocks: InfoBlock[] = item.infoBlocks ? item.infoBlocks.map((block: any) => ({
        id: block.id,
        title: block.title,
        content: block.content || block.description, // Підстраховка по назві поля
        block_order: block.block_order || 0,
        align: block.align || 'center',
        images: block.images || []
    })) : [];

    return {
        id: item.id,
        title: item.name,
        price: finalPrice,
        oldPrice: hasDiscount ? item.price : undefined,
        description: item.description || 'Опис відсутній',
        image: imageUrl,
        // Для списку suggestions тут буде [], а для getProductById тут будуть дані
        infoBlocks: mappedInfoBlocks 
    };
};