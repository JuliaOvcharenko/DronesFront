import React from 'react';

import { CatalogPreview } from '../../components/CatalogPreview';
import { Product } from '../../types/product';

// Імпорт картинок
import droneMain from '../../assets/gelicopter.png'; 
import videoPreview from '../../assets/images/pic1.png'; // Блок 1 (Відео)
import pic1 from '../../assets/images/pic1.png';   // Блок 2
import pic2 from '../../assets/images/pic2.png';     // Блок 3
import pic3 from '../../assets/images/512.png';   // Блок 4
import { ProductHeader } from '../../components/ProductHeader';
import { InfoBlock } from '../../components/InfoBlock';

export const ProductPage = () => {

    const testProduct: Product = {
        id: 1,
        title: "DJI MINI 4 PRO",
        price: 29900,
        oldPrice: 32500,
        description: "100-мегапіксельна основна камера Hasselblad, великі CMOS-телекамери, нескінченний карданний шарнір з можливістю обертання на 360°, всеспрямоване зондування перешкод 0,1-Lux Nightscape.",
        image: droneMain, 

        infoBlocks: [
            {
                id: 1,
                block_order: 1,
                title: "ВОЛОДІЙТЕ КОЖНИМ КУТОМ",
                content: "Представляємо вдосконалену систему з трьома камерами, де кожен об'єктив має свої переваги. Створюйте кінематографічні кадри з будь-якого ракурсу.",
                align: "center", 
                images: []
            },
            {
                id: 2,
                block_order: 2,
                title: "ОСНОВНА КАМЕРА 4/3 CMOS",
                content: "У ретельно розробленій 4/3 CMOS-камері Hasselblad використовується абсолютно новий сенсор. Вона створює захоплюючі 100-мегапіксельні зображення.",
                align: "right", 
                images: []
            },
            {
                id: 3,
                block_order: 3,
                title: "51-ХВ ЧАС ПОЛЬОТУ",
                content: "Аеродинамічний дизайн та ефективна силова установка забезпечують тривалість польоту до 51 хвилини, що дозволяє вам діяти легко і впевнено.",
                align: "left", 
                images: []
            },
            {
                id: 4,
                block_order: 4,
                title: "ДО 512 ГБ ВБУДОВАНОЇ ПАМ'ЯТІ",
                content: "Стандартна версія DJI Mini 4 Pro поставляється з 64 ГБ вбудованої пам'яті. Комплектації Creator Combo можуть мати до 512 ГБ високошвидкісної пам'яті.",
                align: "center",
                images: []
            }
        ]
    };

    // Масив картинок у правильному порядку
    const blockImages = [
        videoPreview,
        pic1,
        pic2,
        pic3
    ];

    return (
        <main style={{ backgroundColor: '#fff', minHeight: '100vh', overflowX: 'hidden' }}>
            <ProductHeader product={testProduct} />

            <div style={{ paddingBottom: '100px' }}>
                {(testProduct.infoBlocks || [])
                    .sort((a, b) => a.block_order - b.block_order)
                    .map((block, index) => (
                        <InfoBlock 
                            key={block.id} 
                            block={block} 
                            imageSrc={blockImages[index]} 
                            isVideo={index === 0} 
                        />
                    ))
                }
            </div>
            
            <CatalogPreview />
        </main>
    );
};