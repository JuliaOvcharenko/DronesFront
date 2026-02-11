import { Input } from "../../shared/components/input"
import { TextArea } from "../../shared/components/textArea"
import { IMAGES } from "../../shared/images"
import styles from "./page.module.css"


export function ContactsPage(){
    return <div className = {styles.pageContainer}>
        <p className={styles.mainText}>КОНТАКТИ</p>

        <div className={styles.contactsContainer}>

            <div className={styles.ourContactsContainer}>
                <p className={styles.ourContactsText}>Наші контакти</p>

                <div className = {styles.contactsBlock}>
                    <div className={styles.infoMiniBlock}>
                        <img src={IMAGES.phoneIcon} className={styles.icon}></img>
                        <p className={styles.contactsText}>+38 (067) 123-45-67</p>
                    </div>
                    <div className={styles.infoMiniBlock}>
                        <img src={IMAGES.emailIcon} className={`${styles.icon} ${styles.email}`}></img>
                        <p className={styles.contactsText}>info@dronex.com.ua</p>
                    </div>
                    <div className={styles.infoMiniBlock}>
                        <img src={IMAGES.mapDotIcon} className={styles.icon}></img>
                        <p className={styles.contactsText}>вул. Університетська, 22, м. Дніпро, 49000, Україна</p>
                    </div>
                    <div className={styles.infoMiniBlock}>
                        <img src={IMAGES.schedueIcon} className={styles.icon}></img>
                        <p className={styles.contactsText}>Пн–Пт: 10:00 — 18:00, Сб–Нд: вихідні</p>
                    </div>
                </div>

                <div className={styles.socialMediaBlock}>
                    <p className={styles.socialMediaText}>Ми в соцмережах:</p>
                    <div className={styles.socialMediaIcons}>
                        <img src={IMAGES.facebookIcon} className={styles.icon}></img>
                        <img src={IMAGES.telegramIcon} className={styles.icon}></img>
                        <img src={IMAGES.instagramIcon} className={styles.icon}></img>
                    </div>
                </div>
            </div>

            <div className={styles.contactWithUsContainer}>
                <p className={styles.ourContactsText}>Зв'язатися з нами</p>
                <div className={styles.inputsContainer}>
                    <Input type="text" placeholder="Ваше Ім’я" label="Ім’я"></Input>
                    <Input type="text" placeholder="Телефон" label="+ 38 0"></Input>
                    <Input type="text" placeholder="E-mail" label="Ваш E-mail"></Input>
                    <TextArea placeholder="Повідомлення" label="Ваше повідомлення"></TextArea>
                </div>
                <button className={styles.buttonConfirm}>
                    НАДІСЛАТИ
                </button>
            </div>
        </div>
    </div>
}