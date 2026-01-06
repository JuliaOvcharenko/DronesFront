import { HeaderProps } from "../../shared/types"
import styles from "./header.module.css"


export function Header(props: HeaderProps){
    const {headerVariant} = props
    return (
        <header className={styles[headerVariant]}>
            <h1>Header</h1>
        </header>
    )
}