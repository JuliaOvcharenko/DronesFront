import styles from "./main.module.css"
import { ReactNode } from "react"


interface MainProps {
    children: ReactNode
}

export function Main(props: MainProps) {
    const {children} = props

    return <main className={styles.center}>
        {children}
    </main>
}