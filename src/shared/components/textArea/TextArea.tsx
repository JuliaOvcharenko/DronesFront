import { AreaProps } from "./textArea.type";
import styles from "./textArea.module.css"


export function TextArea(props: AreaProps){
    const {label, placeholder, value, onChange} = props
    
    return <div className={styles.inputContainer}>

        <span className={styles.label}>{label}</span>
        <textarea  placeholder={placeholder} value={value} onChange={onChange}></textarea>
    </div>
}