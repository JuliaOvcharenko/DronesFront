import React, { useRef, useState, useEffect } from 'react'; 
import styles from './InfoBlock.module.css';
import { InfoBlock as InfoBlockType } from '../../../types/product';

interface Props {
    block: InfoBlockType & { video?: string | null };
    imageSrc?: string;
    isVideo?: boolean;
}

export const InfoBlock: React.FC<Props> = ({ block, imageSrc, isVideo = false }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const finalImage = imageSrc || (block.images && block.images.length > 0 ? block.images[0].image : '');
    
    const videoUrl = block.video;
    const shouldRenderVideo = (isVideo || videoUrl) && videoUrl;

    useEffect(() => {
        if (shouldRenderVideo && videoRef.current) {
            videoRef.current.currentTime = 0.1; 
        }
    }, [shouldRenderVideo]);

    const handlePlayClick = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    let containerClass = styles.container;
    if (block.align === 'center') containerClass += ` ${styles.center}`;
    else if (block.align === 'right') containerClass += ` ${styles.right}`;
    else if (block.align === 'left') containerClass += ` ${styles.left}`;

    return (
        <div className={containerClass}>
            <div className={styles.textContent}>
                <h2 className={styles.title}>{block.title}</h2>
                <p className={styles.text}>{block.content}</p>
            </div>

            <div className={styles.mediaContent}>
                {shouldRenderVideo ? (
                    <div className={styles.videoWrapper} onClick={handlePlayClick}>
                        <video 
                            ref={videoRef}
                            className={styles.video}
                            preload="metadata" 
                            poster={finalImage}
                            src={videoUrl}
                            width="100%"
                            playsInline 
                            onEnded={() => setIsPlaying(false)}
                            onLoadedData={() => {
                                if (!finalImage && videoRef.current) {
                                    videoRef.current.currentTime = 0.1;
                                }
                            }}
                        >
                            Ваш браузер не підтримує відео.
                        </video>

                        {!isPlaying && (
                            <div className={styles.playButton}></div>
                        )}
                    </div>
                ) : (
                    <div className={styles.imageWrapper}>
                        {finalImage && (
                            <img src={finalImage} alt={block.title} className={styles.image} />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};