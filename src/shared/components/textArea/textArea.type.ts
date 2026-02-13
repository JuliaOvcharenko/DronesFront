export interface AreaProps{
    label: string
    placeholder: string
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}