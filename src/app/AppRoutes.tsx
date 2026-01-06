import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./Layout/layout";
import { NotFoundPage } from "../pages/not-found";
import { AboutPage } from "../pages/about";
import { HomePage } from "../pages/home";


export function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout headerVariant="half" footerVariant="rounded" links={["КАТАЛОГ", "ПРО НАС", "КОНТАКТИ", "КОШИК", "КАБІНЕТ"]} bigNumbers={["1K+", "1.5K+", "24/7"]} numberDescribtion={["Успішних відправок", "Задоволених клієнтів", "Підтримка клієнтів"]}/>}>
                    <Route path="/" element={<HomePage />} />
                </Route>

                <Route element={<Layout headerVariant="full" footerVariant="rounded"  links={["КАТАЛОГ", "ПРО НАС", "КОНТАКТИ", "КОШИК", "КАБІНЕТ"]} bigNumbers={["1K+", "1.5K+", "24/7"]} numberDescribtion={["Успішних відправок", "Задоволених клієнтів", "Підтримка клієнтів"]}/>}>
                    <Route path="/about" element={<AboutPage/>}/>
                </Route>

                <Route element={<Layout headerVariant="half" footerVariant="straight"/>}>
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
                  
            </Routes>
        </BrowserRouter>
    );
}