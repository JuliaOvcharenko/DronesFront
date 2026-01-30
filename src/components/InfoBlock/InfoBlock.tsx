import React from 'react';
import styles from './InfoBlock.module.css';
import { InfoBlock as InfoBlockType } from '../../types/product';

interface Props {
  block: InfoBlockType;
  imageSrc?: string; 
  isVideo?: boolean; 
}

export const InfoBlock: React.FC<Props> = ({ block, imageSrc, isVideo = false }) => {
  
  const finalImage = imageSrc || (block.images && block.images.length > 0 ? block.images[0].image : '');

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
         {isVideo ? (
             <div className={styles.videoWrapper}>
                {finalImage && (
                    <img src={finalImage} alt="Video preview" className={styles.videoThumbnail} />
                )}
                <div className={styles.playBtn}>▶</div>
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