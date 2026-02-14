
import { AuthProvider } from "../shared/components/AuthModal";
import { AppRoutes } from "./AppRoutes";


export function App(){
    return <div>
        <AuthProvider>
            <AppRoutes />
        </AuthProvider>
    </div>
}