import { AboutSection } from '../../components/Home/AboutSection';
import { CatalogPreview } from '../../components/Home/CatalogPreview';
import { HeroSection } from '../../components/Home/HeroSection';
import { NewArrivals } from '../../components/Home/NewArrivals';
import styles from './page.module.css';


export function HomePage() {
  document.body.className = "white"
  return (
    <div className={styles["home-page"]}>
      <HeroSection />
      <AboutSection />
      <NewArrivals />
      <CatalogPreview />
    </div>
  );
};
