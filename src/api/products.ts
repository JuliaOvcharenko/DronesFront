
interface BackendProduct {
  id: number;
  name: string;
  price: number;
  discount: number; // Знижка (наприклад, 10)
  countOfProduct: number;
  categoryId: number;
  description?: string;
  images?: { id: number; url: string }[];
}

export interface Product {
  id: number;
  title: string;
  price: number;     // Це буде КІНЦЕВА ціна (зі знижкою)
  oldPrice?: number; // Це буде СТАРА ціна (для закреслення)
  description: string;
  images: string[];
}

const BASE_URL = 'http://127.0.0.1:8000';

export const getProductSuggestions = async (type: 'new' | 'popular'): Promise<Product[]> => {
  const queryParam = type === 'new' ? 'isNew=true' : 'popularity=true';
  const url = `${BASE_URL}/products/suggestions?${queryParam}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Server Error: ${response.status}`);
    
    const rawData = await response.json();
    if (typeof rawData === 'string') throw new Error(rawData);

    return (rawData as BackendProduct[]).map((item) => {
      // ЛОГІКА ЗНИЖКИ
      // Якщо знижка більша за 0
      const hasDiscount = item.discount > 0;
      
      // Нова ціна = Стара - Знижка
      const finalPrice = hasDiscount ? (item.price - item.discount) : item.price;

      return {
        id: item.id,
        title: item.name,
        // Записуємо вже пораховану ціну
        price: finalPrice,
        // Якщо була знижка, записуємо стару ціну, інакше undefined
        oldPrice: hasDiscount ? item.price : undefined,
        
        description: item.description || 'Опис відсутній',
        images: []
      };
    });

  } catch (error) {
    console.error("Помилка API:", error);
    throw error;
  }
};