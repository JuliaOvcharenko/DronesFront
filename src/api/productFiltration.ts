import { BASE_URL } from "../shared/api/baseUrl";
import { Product } from "../types/product";

export interface Category {
    id: number;
    name: string;
    image?: string | null;
}

export async function getAllCategories(): Promise<Category[]> {
    try {
        const response = await fetch(`${BASE_URL}/categories`);
        return response.ok ? await response.json() : [];
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getFilteredProducts(
    categoryName: string | null,
    page: number = 1,
    limit: number = 16
): Promise<{ products: Product[], total: number }> {
    try {
        const url = new URL(`${BASE_URL}/products`);
        url.searchParams.append('page', page.toString());
        url.searchParams.append('limit', limit.toString());

        if (categoryName) {
            url.searchParams.append('categoryName', categoryName);
        }

        const response = await fetch(url.toString());
        if (!response.ok) return { products: [], total: 0 };

        const data = await response.json();

        const rawProducts = Array.isArray(data) ? data : (data.items || data.products || []);

        const products = rawProducts.map((item: any) => {
            const rawImg = item.mainImage?.imagePath || item.mainImage?.image || item.image || "";
            const image = rawImg.startsWith('http') ? rawImg : (rawImg ? `${BASE_URL}/${rawImg}` : "");

            const hasDiscount = item.discount > 0;

            return {
                id: item.id,
                title: item.name || item.title || "Без назви",
                price: hasDiscount ? (item.price - item.discount) : item.price,
                oldPrice: hasDiscount ? item.price : undefined,
                description: item.description || "Опис відсутній",
                image
            };
        });

        const total = parseInt(response.headers.get('x-total-count') || '0')
            || data.total
            || data.count
            || 0;

        return { products, total };
    } catch (error) {
        console.error(error);
        return { products: [], total: 0 };
    }
}