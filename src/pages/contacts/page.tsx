import { useState } from "react"
import { Input } from "../../shared/components/input"
import { TextArea } from "../../shared/components/textArea"
import { IMAGES } from "../../shared/images"
import { useSendEmail } from "../../api/sendEmail"
import styles from "./page.module.css"


export function ContactsPage(){
    document.body.className = 'white'
    
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    
    const [nameError, setNameError] = useState('')
    const [phoneError, setPhoneError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [messageError, setMessageError] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    
    const [sendEmail, {isLoading, error}] = useSendEmail()

    const validatePhone = (phoneNumber: string): boolean => {
        const phoneRegex = /^\+\d+$/
        return phoneRegex.test(phoneNumber)
    }

    const handleSubmit = async () => {
        setNameError('')
        setPhoneError('')
        setEmailError('')
        setMessageError('')
        setSuccessMessage('')
        
        let hasError = false
        
        if (!name.trim()) {
            setNameError("Будь ласка, введіть ваше ім'я")
            hasError = true
        }
        
        if (!phone.trim()) {
            setPhoneError('Будь ласка, введіть номер телефону')
            hasError = true
        } else if (!validatePhone(phone)) {
            setPhoneError('Номер телефону повинен починатися з + та містити тільки цифри')
            hasError = true
        }
        
        if (!email.trim()) {
            setEmailError('Будь ласка, введіть e-mail')
            hasError = true
        } else if (!email.includes('@')) {
            setEmailError('Введіть коректний e-mail')
            hasError = true
        }
        
        if (!message.trim()) {
            setMessageError('Будь ласка, напишіть повідомлення')
            hasError = true
        }
        
        if (hasError) return
        
        const result = await sendEmail({
            name,
            email,
            phoneNumber: phone,
            message
        })
        
        if (result.success) {
            setSuccessMessage(result.message || 'Повідомлення успішно надіслано!')
            setName('')
            setPhone('')
            setEmail('')
            setMessage('')
        }
    }
    
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
                
                {successMessage && (
                    <p className={styles.successMessage}>{successMessage}</p>
                )}
                
                {error && (
                    <p className={styles.errorMessage}>{error}</p>
                )}
                
                <div className={styles.inputsContainer}>
                    <div>
                        <Input type="text" placeholder="Ваше Ім'я" label="Ім'я" value={name} onChange={(e) => setName(e.target.value)}></Input>
                        {nameError && <p className={styles.fieldError}>{nameError}</p>}
                    </div>
                    
                    <div>
                        <Input type="text" placeholder="Телефон" label="+ 38 0" value={phone} onChange={(e) => setPhone(e.target.value)}></Input>
                        {phoneError && <p className={styles.fieldError}>{phoneError}</p>}
                    </div>
                    
                    <div>
                        <Input type="text" placeholder="E-mail" label="Ваш E-mail" value={email} onChange={(e) => setEmail(e.target.value)}></Input>
                        {emailError && <p className={styles.fieldError}>{emailError}</p>}
                    </div>
                    
                    <div>
                        <TextArea placeholder="Повідомлення" label="Ваше повідомлення" value={message} onChange={(e) => setMessage(e.target.value)}></TextArea>
                        {messageError && <p className={styles.fieldError}>{messageError}</p>}
                    </div>
                </div>
                
                <button className={styles.buttonConfirm} onClick={handleSubmit} disabled={isLoading}>
                    {isLoading ? 'НАДСИЛАННЯ...' : 'НАДІСЛАТИ'}
                </button>
            </div>
        </div>
    </div>
}