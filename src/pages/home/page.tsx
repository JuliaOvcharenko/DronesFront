// import styles from './page.module.css'


// export function HomePage(){
//     document.body.className = "home"

//     return <div className = {styles['back']}>
//         <p>Home Page</p>
//     </div>
// }

import styles from './page.module.css';
import { HeroSection } from '../../components/HeroSection/HeroSection';
import { AboutSection } from '../../components/AboutSection/AboutSection';
import { NewArrivals } from '../../components/NewArrivals/NewArrivals';
import { CatalogPreview } from '../../components/CatalogPreview/CatalogPreview';

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
