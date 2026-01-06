import { FooterProps } from "../../shared/types";
import styles from "./footer.module.css";


export function Footer(props: FooterProps) {
    const { footerVariant, links, bigNumbers, numberDescribtion } = props;

    const hasData =
        links?.length ||
        bigNumbers?.length ||
        numberDescribtion?.length;

    if (footerVariant === "straight" || !hasData) {
        return (
            <footer className={styles.straight}>
                <p>Simple Footer</p>
            </footer>
        );
    }

    return (
        <footer className={styles.rounded}>
            { links && (
                <div className = {styles["links"]}>
                    {links.map((link) => (
                        <p>{link}</p>
                    ))}
                </div>
            )}

            { bigNumbers && numberDescribtion && (
                <div className = {styles["desc-footer"]}>
                    { bigNumbers.map((num, i) => (
                        <span key={i}>
                            <p>{num}</p>
                            <p>{numberDescribtion[i]}</p>
                        </span>
                    ))}
                </div>
            )}
        </footer>
    );
}
