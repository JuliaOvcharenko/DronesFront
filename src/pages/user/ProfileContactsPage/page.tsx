import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './page.module.css';
import { Input } from '../../../shared/components/input';
import { useAuth } from '../../../shared/components/AuthModal';


export function ProfileContactsPage() {
    const navigate = useNavigate()
    const { user, isLoading, logout, isAuthenticated } = useAuth()

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [lastname, setLastname] = useState('')
    const [birthDate, setbirthDate] = useState('')
    const [patronymic, setPatronymic] = useState('')

    useEffect(() => {
        document.body.className = 'white'
        window.scrollTo(0, 0)

        if (!isLoading && !isAuthenticated) {
            navigate('/')
        }
    }, [isLoading, isAuthenticated, navigate])

    useEffect(() => {
        if (user) {
            setName(user.username || '')
            setPhone(user.phoneNumber || '')
            setEmail(user.email || '')
            setLastname(user.lastname || '')
            setbirthDate(user.birthDate || '')
            setPatronymic(user.patronymic || '')
        }
    }, [user]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (isLoading) {
        return (
            <div className={styles.container}>
                <p>Завантаження...</p>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <div className={styles.mainContainer}>
            <div className={styles.leftContainer}>
                <h1 className={styles.accountText}>ОСОБИСТИЙ КАБІНЕТ</h1>
                <p className={`${styles.textLeft} ${styles.contactsDataLink}`}>КОНТАКТНІ ДАНІ</p>
                <p className={styles.textLeft}>МОЇ ЗАМОВЛЕННЯ</p>
                <p className={styles.textLeft}>АДРЕСА ДОСТАВКИ</p>
                <hr></hr>
                <button className={styles.logoutButton} onClick={handleLogout}>
                    ВИЙТИ
                </button>
            </div>

            <div className={styles.rightContainer}>
                <p className={styles.contactsDataBlock}>Контактні дані</p>

                <div className={styles.inputsContainer}>
                    <Input 
                        type="text" 
                        placeholder="Ваше Прізвище" 
                        label="Прізвище" 
                        value={lastname} 
                        onChange={(e) => setName(e.target.value)}
                        />
                    <Input 
                        type="text" 
                        placeholder="Ваше Ім'я" 
                        label="Ім'я" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Input 
                        type="text" 
                        placeholder="По батькові" 
                        label="По батькові" 
                        value={patronymic} 
                        onChange={(e) => setPatronymic(e.target.value)}
                    />
                    <Input 
                        type="text" 
                        placeholder="День народження" 
                        label="День народження" 
                        value={user.birthDate ? new Date(user.birthDate).toLocaleDateString('uk-UA') : '—'}
                        onChange={(e) => setbirthDate(e.target.value)}
                    />
                    <Input 
                        type="text" 
                        placeholder="+ 38 0" 
                        label="Телефон" 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <Input 
                        type="text" 
                        placeholder="E-mail" 
                        label="Ваш E-mail" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <button className={styles.saveDataButton}>ЗБЕРЕГТИ ЗМІНИ</button>
            </div>
        </div>
    );
}