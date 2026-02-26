import { useEffect } from 'react';
import { AboutSection } from '../../components/Home/AboutSection';
import { CatalogPreview } from '../../components/Home/CatalogPreview';
import { HeroSection } from '../../components/Home/HeroSection';
import { NewArrivals } from '../../components/Home/NewArrivals';
import styles from './page.module.css';

export function HomePage() {
    useEffect(() => {
        const originalPadding = document.body.style.paddingTop
        document.body.style.setProperty('padding-top', '0', 'important')
        document.body.className = "white"

        return () => {
            document.body.style.paddingTop = originalPadding;
            }
        }, [])

    return (
        <div className={styles["home-page"]}>
            <div style={{ paddingTop: '3.5rem', backgroundColor: '#CDD5DD' }}>
                <HeroSection/>
            </div>
            <AboutSection/>
            <NewArrivals/>
            <CatalogPreview />
        </div>
    );
};