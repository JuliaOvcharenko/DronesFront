import styles from './page.module.css'


export function HomePage(){
    document.body.className = "home"
    
    return <div className = {styles['back']}>
        <p>Home Page</p>
    </div>
}