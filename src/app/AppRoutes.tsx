import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./Layout/layout";
import { NotFoundPage } from "../pages/not-found";
import { AboutPage } from "../pages/about";
import { HomePage } from "../pages/home";
import { CatalogPage } from "../pages/catalog";
import { ProductPage } from "../pages/product";
import { ContactsPage } from "../pages/contacts/page";
import { ProfileContactsPage } from "../pages/user/ProfileContactsPage";
import { CheckoutPage } from "../pages/checkout";
import { OrdersPage } from "../pages/user/orders";
import { AccountLayout } from "../pages/user/ProfileContactsPage/AccountLayout";
import { RecoverPasswordPage } from "../pages/user/recoverPassword";
import { AddressPage } from "../pages/user/addresses";


export function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout headerVariant="full" footerVariant="rounded" bigNumbers={["1K+", "1.5K+", "24/7"]} numberDescribtion={["Успішних відправок", "Задоволених клієнтів", "Підтримка клієнтів"]}
                    links={[
                        { label: "КАТАЛОГ", path: "/catalog" },
                        { label: "ПРО НАС", path: "/about" },
                        { label: "КОНТАКТИ", path: "/contacts" },
                        { label: "КОШИК", path: "/cart" },
                        { label: "КАБІНЕТ", path: "/account" }]} />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/product/:id" element={<ProductPage />} />

                </Route>

                <Route element={<Layout headerVariant="full" footerVariant="rounded" bigNumbers={["1K+", "1.5K+", "24/7"]} numberDescribtion={["Успішних відправок", "Задоволених клієнтів", "Підтримка клієнтів"]}
                    links={[
                        { label: "КАТАЛОГ", path: "/catalog" },
                        { label: "ПРО НАС", path: "/about" },
                        { label: "КОНТАКТИ", path: "/contacts" },
                        { label: "КОШИК", path: "/cart" },
                        { label: "КАБІНЕТ", path: "/account" }]} />}>
                    <Route path="/about" element={<AboutPage />} />
                </Route>

                <Route element={<Layout headerVariant="half" footerVariant="straight" />}>
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Route>

                <Route element={<Layout headerVariant="full" footerVariant="rounded" bigNumbers={["1K+", "1.5K+", "24/7"]} numberDescribtion={["Успішних відправок", "Задоволених клієнтів", "Підтримка клієнтів"]}
                    links={[
                        { label: "КАТАЛОГ", path: "/catalog" },
                        { label: "ПРО НАС", path: "/about" },
                        { label: "КОНТАКТИ", path: "/contacts" },
                        { label: "КОШИК", path: "/cart" },
                        { label: "КАБІНЕТ", path: "/account" }]} />}>
                    <Route path="/catalog/:page?" element={<CatalogPage />} />
                </Route>

                <Route element={<Layout headerVariant="full" footerVariant="rounded" bigNumbers={["1K+", "1.5K+", "24/7"]} numberDescribtion={["Успішних відправок", "Задоволених клієнтів", "Підтримка клієнтів"]}
                    links={[
                        { label: "КАТАЛОГ", path: "/catalog" },
                        { label: "ПРО НАС", path: "/about" },
                        { label: "КОНТАКТИ", path: "/contacts" },
                        { label: "КОШИК", path: "/cart" },
                        { label: "КАБІНЕТ", path: "/account" }]} />}>
                    <Route path="/contacts" element={<ContactsPage />} />
                </Route>
                <Route element={<Layout headerVariant="full" footerVariant="rounded" bigNumbers={["1K+", "1.5K+", "24/7"]} numberDescribtion={["Успішних відправок", "Задоволених клієнтів", "Підтримка клієнтів"]}
                    links={[
                        { label: "КАТАЛОГ", path: "/catalog" },
                        { label: "ПРО НАС", path: "/about" },
                        { label: "КОНТАКТИ", path: "/contacts" },
                        { label: "КОШИК", path: "/cart" },
                        { label: "КАБІНЕТ", path: "/account" }]} />}>
                    <Route path="/account" element={<AccountLayout />}>
                        <Route index element={<Navigate to="profile" replace />} />

                        <Route path="profile" element={<ProfileContactsPage />} />

                        <Route path="orders" element={<OrdersPage />} />
                        <Route path="address" element={<AddressPage/>}/>
                    </Route>
                </Route>

                <Route path="/recover-password" element={<RecoverPasswordPage/>}/>
              

            </Routes>
        </BrowserRouter>
    );
}
