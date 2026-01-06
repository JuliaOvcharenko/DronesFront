import { Outlet } from "react-router-dom";
import { LayoutProps } from "../../shared/types";

import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Main } from "../../components/Main";



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