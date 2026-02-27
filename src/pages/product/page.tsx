import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FullProduct, getProductById } from '../../api/product';
import { ProductHeader } from '../../components/Product/ProductHeader';
import { InfoBlock } from '../../components/Product/InfoBlock';
import { ProductSuggestions } from '../../components/Product/ProductSuggestions';
import { BASE_URL } from '../../shared/api/baseUrl';
import { useCart } from '../../shared/context/CartContext'; 

export const ProductPage = () => {
    document.body.className = "grey"
    const { id } = useParams<{ id: string }>();

    const [product, setProduct] = useState<FullProduct | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { addToCart } = useCart();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });

        if (!id) return;

        setIsLoading(true);
        setError(null);

        getProductById(id)
            .then(data => {
                if (!data) throw new Error();
                setProduct(data);
            })
            .catch(() => {
                setError('Не вдалося завантажити товар');
                setProduct(null);
            })
            .finally(() => {
                setIsLoading(false);
            });

    }, [id]);

    const getFullUrl = (path?: string | null) => {
        if (!path) return undefined;
        if (path.startsWith('http')) return path;
        return `${BASE_URL}/${path}`;
    };

    const handleAddToCart = () => {
        if (!product) return;

        addToCart({
            id: product.id,
            title: product.name,
            price: product.price,
            oldPrice: product.discount > 0 ? product.price + product.discount : undefined,
            description: product.description,
            image: getFullUrl(product.mainImage?.image) || '',
            infoBlocks: []
        });
    };

    if (isLoading) return <div>Завантаження...</div>;
    if (error) return <div>{error}</div>;
    if (!product) return <div>Товар не знайдено</div>;

    const headerData = {
        id: product.id,
        title: product.name,
        price: product.price,
        oldPrice: product.discount > 0 ? product.price + product.discount : undefined,
        description: product.description,
        image: getFullUrl(product.mainImage?.image) || '',
        infoBlocks: []
    };

    return (
        <main style={{ backgroundColor: '#fff', minHeight: '100vh', overflowX: 'hidden' }}>
            
            <ProductHeader 
                product={headerData as any} 
                onAddToCart={handleAddToCart}
            />

            <div>
                {product.infoBlocks?.length > 0 &&
                    product.infoBlocks
                        .sort((a: any, b: any) => a.blockOrder - b.blockOrder)
                        .map((block: any) => {
                            const imageSrc = getFullUrl(block.images?.[0]?.image);
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
                        })}
            </div>

            <ProductSuggestions titlePage="Схожі товари" sameAs={product.id} limit={4} />
        </main>
    );
};