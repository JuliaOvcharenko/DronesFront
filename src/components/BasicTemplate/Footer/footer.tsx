import { useNavigate } from "react-router-dom";
import { IMAGES } from "../../../shared/images";
import { FooterProps } from "../../../shared/types";
import styles from "./footer.module.css";


export function Footer(props: FooterProps) {
    const { footerVariant, links, bigNumbers, numberDescribtion } = props;
    const navigate = useNavigate();
    const hasData = links?.length || bigNumbers?.length || numberDescribtion?.length;

    if (footerVariant === "straight" || !hasData) {
        return (
            <footer className={styles.straight}>
                <img src={IMAGES.dronesFooterLogo} className={styles["watermark-img"]}/>
                <div className={styles["footer-line"]} />
                <p className={styles["copyright-text"]}>
                    © 2025 Drones Всі права захищені.
                </p>
            </footer>
        );
    }

   return (
        <footer className={styles.rounded}>
            <img src={IMAGES.baseFooter} className={styles["footer-back"]} alt="footer-bg" />
            
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

                {links && (
                    <div className={styles.links}>
                        {links.map((link) => (
                            <p key={link.path} onClick={() => navigate(link.path)}>
                                {link.label}
                            </p>
                        ))}
                    </div>
                )}
            </div>
        </footer>
    );
}



