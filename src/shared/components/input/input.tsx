import { InputProps } from "./input.type";
import styles from "./input.module.css"


export function Input(props: InputProps){
    const {type, label, placeholder, value, onChange} = props
    
    return <div className={styles.inputContainer}>

        <span className={styles.label}>{label}</span>
        <input type={type} placeholder={placeholder} value={value} onChange={onChange}/>
    </div>
}