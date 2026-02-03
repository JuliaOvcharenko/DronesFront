import { IMAGES } from "../../shared/images"
import styles from './page.module.css'


export function AboutPage(){
    document.body.className = "white"
    

    return <div className = {styles["about-container"]}>
        <section className={styles["about"]}>
            <p className={styles['about-header']}>ПРО НАС</p>
            <div className = {styles["about-text-container"]}>
                <p className={styles["about-text"]}>
                    Ми — команда, яка об'єднана спільною метою: зробити передові технології доступними для кожного, хто потребує точності, безпеки та інновацій.
                </p>

                <p className={styles["about-text"]}>
                    З 2022 року ми спеціалізуємось на постачанні дронів і тепловізорів для професійного, цивільного та волонтерського використання.
                </p>
            </div>

            <img src={IMAGES.aboutImage} className={styles["about-img"]} alt="About our company"/>
        </section>


        <section className={styles["mission"]}>
            <div className={styles["text-block"]}>
                <p className={styles['mission-header']}>НАША МІСІЯ</p>
                <div>
                    <p className = {styles["text-mission"]}>
                        Допомагати тим, хто стоїть на передовій — у прямому й переносному сенсі.
                    </p>
                    <p className = {`${styles["text-mission"]} ${styles['text-indent']}`}>
                        Ми обираємо тільки надійну техніку, яку перевіряємо самі. Наша мета — якість, простота, і підтримка на кожному етапі: від покупки до використання.
                    </p>
                </div>
               
            </div>

            <img src={IMAGES.aboutImageMission} className={styles["mission-img"]} alt="Our mission"/>
        </section>


        <section className={styles["team"]}>
            <img src={IMAGES.aboutImageTeam} className={styles["team-img"]} alt="Our team"/>

            <div className={styles["text-block"]}>
                <p className = {styles['mission-header']}>КОМАНДА, ЯКІЙ МОЖНА ДОВІРЯТИ</p>
                <p className = {styles["text-mission"]}>
                    Ми — не просто магазин. Ми — фахівці, які самі працюють із цією технікою й консультують з досвіду. Засновники проєкту — волонтери, військові та IT-спеціалісти, які об'єднали зусилля задля важливої справи.
                </p>
            </div>
        </section>

    </div>
}