
// Інтерфейс того, що приходить з Бекенду (Prisma)
interface BackendProduct {
    id: number;
    name: string;
    price: number;
    discount: number;
    countOfProduct: number;
    categoryId: number;
    description?: string;
    // Наше головне зображення з бекенду
    mainImage?: { 
        image: string; 
    };
}

export interface Product {
    id: number;
    title: string;
    price: number;
    oldPrice?: number;
    description: string;
    image: string; 
}

const BASE_URL = 'http://127.0.0.1:8000';

export const getProductSuggestions = async (
    type: 'new' | 'popular'
): Promise<Product[]> => {
    const queryParam = type === 'new' ? 'isNew=true' : 'popular=true';
    const url = `${BASE_URL}/products/suggestions?${queryParam}`;

    try {
        const response = await fetch(url);

        if (response.status !== 200) {
            throw new Error(`Server error: ${response.status}`);
        }

        const rawData = await response.json();

        return (rawData as BackendProduct[]).map((item) => {
            const hasDiscount = item.discount > 0;
            const finalPrice = hasDiscount ? item.price - item.discount : item.price;

            const imageUrl = item.mainImage?.image || '';

            return {
                id: item.id,
                title: item.name,
                price: finalPrice,
                oldPrice: hasDiscount ? item.price : undefined,
                description: item.description || 'Опис відсутній',
                image: imageUrl 
            };
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};