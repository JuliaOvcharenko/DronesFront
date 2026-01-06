export type HeaderVariant = "full" | "half"
export type FooterVariant = "straight" | "rounded"

export interface HeaderProps {
    headerVariant: HeaderVariant
}

export interface FooterProps {
    footerVariant: FooterVariant
    links?: string[]
    bigNumbers?: string[] 
    numberDescribtion?: string[]
}

export interface LayoutProps {
    headerVariant: HeaderVariant
    footerVariant: FooterVariant
    links?: string[]
    bigNumbers?: string[] 
    numberDescribtion?: string[]
}