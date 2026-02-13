export interface InputProps{
    type: string
    label: string
    placeholder: string
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}