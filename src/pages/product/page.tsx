import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FullProduct, getProductById } from '../../api/product';
import { ProductHeader } from '../../components/Product/ProductHeader';
import { InfoBlock } from '../../components/Product/InfoBlock';
import { CatalogPreview } from '../../components/Home/CatalogPreview';

const BASE_URL = 'http://localhost:8000';

export const ProductPage = () => {
    const { id } = useParams<{ id: string }>(); 
    const [product, setProduct] = useState<FullProduct | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        if (!id) return;
        setIsLoading(true);
        getProductById(id)
            .then(data => setProduct(data))
            .catch(e => console.error(e))
            .finally(() => setIsLoading(false));
    }, [id]);

    if (isLoading) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Завантаження...</div>;
    if (!product) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Товар не знайдено</div>;

    // Універсальна функція для картинок та відео
    const getFullUrl = (path?: string | null) => {
        if (!path) return undefined;
        if (path.startsWith('http')) return path;
        return `${BASE_URL}/${path}`;
    };

    // Адаптуємо дані під хедер
    const headerData = {
        id: product.id,
        title: product.name, 
        price: product.price, 
        oldPrice: product.discount > 0 ? (product.price + product.discount) : undefined,
        description: product.description,
        image: getFullUrl(product.mainImage?.image) || '', 
        infoBlocks: []
    };

    return (
        <main style={{ backgroundColor: '#fff', minHeight: '100vh', overflowX: 'hidden' }}>
            <ProductHeader product={headerData as any} />

            <div style={{ paddingBottom: '100px' }}>
                {product.infoBlocks && product.infoBlocks.length > 0 ? (
                    product.infoBlocks
                        .sort((a: any, b: any) => a.blockOrder - b.blockOrder)
                        .map((block: any) => {
                            
                            const blockImg = block.images?.[0]?.image;
                            const imageSrc = getFullUrl(blockImg);

                            const videoUrl = getFullUrl(block.video);

                            return (
                                <InfoBlock
                                    key={block.id}
                                    block={{
                                        id: block.id,
                                        title: block.title,
                                        content: block.content,
                                        align: block.align,
                                        block_order: block.blockOrder,
                                        
                                        video: videoUrl, 
                                        images: []
                                    }}
                                    imageSrc={imageSrc || ''}
                                    
                                    isVideo={Boolean(videoUrl)} 
                                />
                            );
                        })
                ) : null}
            </div>

            <CatalogPreview title='Схожі товари' />
        </main>
    );
};