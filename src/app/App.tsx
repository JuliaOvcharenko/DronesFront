
import { AuthProvider } from "../shared/components/AuthModal";
import { CartProvider } from "../shared/context/CartContext";
import { AppRoutes } from "./AppRoutes";


export function App() {
    return <div>
        <AuthProvider>
            <CartProvider>
                <AppRoutes />
            </CartProvider>
        </AuthProvider>
    </div>
}