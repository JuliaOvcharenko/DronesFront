export interface InfoBlock {
    id: number;
    title: string;
    content: string;
    block_order: number;
    align: 'left' | 'right' | 'center'; 
    images: { id: number; image: string; imageOrder: number }[];
}


export interface Product {
    id: number;
    title: string;
    price: number;
    oldPrice?: number;
    description: string;
    image: string; 
    infoBlocks?: InfoBlock[];
}