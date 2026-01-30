import { Outlet } from "react-router-dom";
import { Main } from "../../components/BasicTemplate/Main";
import { Header } from "../../components/BasicTemplate/Header";
import { Footer } from "../../components/BasicTemplate/Footer";
import { LayoutProps } from "../../shared/types";


export function Layout(props: LayoutProps) {
    const {headerVariant, footerVariant, links, bigNumbers, numberDescribtion} = props
    return (
        <div>
            <Header headerVariant={headerVariant} />
            <Main>
                <Outlet />
            </Main>
            <Footer footerVariant={footerVariant} links={links} bigNumbers={bigNumbers} numberDescribtion={numberDescribtion}/>
        </div>
    );
}