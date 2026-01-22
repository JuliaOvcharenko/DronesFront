import styles from './page.module.css';

import { AboutSection } from '../../components/AboutSection';
import { NewArrivals } from '../../components/NewArrivals';
import { HeroSection } from '../../components/HeroSection';
import { CatalogPreview } from '../../components/CatalogPreview';


export function HomePage() {
  document.body.className = "home"
  return (
    <div className={styles["home-page"]}>
      <HeroSection />
      <AboutSection />
      <NewArrivals />
      <CatalogPreview />
    </div>
  );
};
