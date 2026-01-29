export interface BackendProduct {
    id: number;
    name: string;
    price: number;
    discount: number;
    description?: string;
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

export interface PaginatedProducts {
    products: Product[];
    page: number;
    limit: number;
    hasMore: boolean;
    total: number;
}

const BASE_URL = 'http://127.0.0.1:8000';

export const getAllProducts = async ({page = 1, limit = 16,}: {page?: number; limit?: number}): Promise<PaginatedProducts> => {
    try {
        const url = `${BASE_URL}/products?page=${page}&limit=${limit}`;
        const response = await fetch(url);
        const data = await response.json();
        
        let rawProducts: BackendProduct[] = [];
        
        if (Array.isArray(data.items)) {
            rawProducts = data.items;
        } else if (Array.isArray(data.products)) {
            rawProducts = data.products;
        } else if (Array.isArray(data)) {
            rawProducts = data;
        }
        
        let totalProducts = 0;
        
        if (typeof data.total === 'number') {
            totalProducts = data.total;
        } else if (typeof data.count === 'number') {
            totalProducts = data.count;
        } else {
            totalProducts = Math.max(rawProducts.length, limit) * 3;
        }
        
        const convertedProducts: Product[] = [];
        
        for (let i = 0; i < rawProducts.length; i++) {
            const item = rawProducts[i];
            
            const hasDiscount = item.discount > 0;
            
            let finalPrice = item.price;
            if (hasDiscount) {
                finalPrice = item.price - item.discount;
            }
            
            let oldPriceValue = undefined;
            if (hasDiscount) {
                oldPriceValue = item.price;
            }
            
            let descriptionValue = item.description || 'Опис відсутній';
            
            let imageValue = '';
            if (item.mainImage && item.mainImage.image) {
                imageValue = item.mainImage.image;
            }
            
            const newProduct: Product = {
                id: item.id,
                title: item.name,
                price: finalPrice,
                oldPrice: oldPriceValue,
                description: descriptionValue,
                image: imageValue
            };
            
            convertedProducts.push(newProduct);
        }
        
        const itemsOnThisPage = page * limit;
        const moreProductsAvailable = itemsOnThisPage < totalProducts;
        
        const result: PaginatedProducts = {
            products: convertedProducts,
            page: page,
            limit: limit,
            total: totalProducts,
            hasMore: moreProductsAvailable
        };
        
        return result;
        
    } catch (error) {
        console.error(error);
        
        const emptyResult: PaginatedProducts = {
            products: [],
            page: page,
            limit: limit,
            total: 0,
            hasMore: false
        };
        
        return emptyResult;
    }
};