const BASE_URL = 'http://localhost:8000';

export interface BlockImage {
    id: number;
    image: string;
    imageOrder: number;
}

export interface InfoBlock {
    id: number;
    title: string;
    content: string;
    align: 'left' | 'center' | 'right';
    block_order: number; 
    ProductBlockImage: BlockImage[]; 
}

export interface FullProduct {
    id: number;
    name: string;
    price: number;
    discount: number;
    description: string;
    mainImage?: { image: string } | null;
    infoBlocks: {
        id: number;
        blockOrder: number; 
        title: string;
        content: string;
        align: string;
        images: {
            image: string;
            imageOrder: number;
        }[];
    }[];
}

// Функція отримання одного товару
export async function getProductById(id: string): Promise<FullProduct | null> {
    try {
        const response = await fetch(`${BASE_URL}/products/${id}`);
        
        if (!response.ok) {
            return null;
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch product:", error);
        return null;
    }
}