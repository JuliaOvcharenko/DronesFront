import { useNavigate } from "react-router-dom";
import { IMAGES } from "../../../shared/images";
import { FooterProps } from "../../../shared/types";
import styles from "./footer.module.css";
import { useEffect, useState } from "react";

export function Footer(props: FooterProps) {
    const { links, bigNumbers, numberDescribtion } = props;
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        document.body.className = 'white';
        window.scrollTo({ top: 0, behavior: 'smooth' });

        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (!links?.length && !bigNumbers?.length) return null;

    return (
        <footer className={styles.rounded}>
            <div className={styles.container}>
                {bigNumbers && numberDescribtion && (
                    <div className={styles["desc-footer"]}>
                        {bigNumbers.map((num, i) => (
                            <div key={i} className={styles.statItem}>
                                <p className={styles.bigNum}>{num}</p>
                                <p className={styles.descText}>{numberDescribtion[i]}</p>
                            </div>
                        ))}
                    </div>
                )}

                <div className={styles.grayArea}>
                    <img 
                        src={isMobile ? IMAGES.phoneFooter : IMAGES.baseFooter} 
                        className={styles["footer-back"]} 
                        alt="" />

                    <div className={styles.overlayContent}>
                        {links && (
                            <div className={styles.links}>
                                {links.map((link) => (
                                    <p key={link.path} onClick={() => navigate(link.path)}>
                                        {link.label}
                                    </p>
                                ))}
                            </div>
                        )}

                        {!isMobile && (
                            <div className={styles.copyright}>
                                <div className={styles["footer-line"]} />
                                
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </footer>
    );
}