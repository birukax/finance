import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState, AppDispatch } from '../utils/store';
import { useNavigate, useLocatoin, Link, useSearchParams } from 'react-router-dom';
import { logout } from '../pages/account/slice';
import { ToastContainer } from 'react-toastify';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import {AppSidebar} from './AppSidebar';


const AppLayout = ({ children }) => {
    const tokens = useSelector((state: AppState) => state.auth.tokens);
    const [mobileOpen, setMobileOpen] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate()
    useEffect(() => {
        if (!tokens.access) {
            navigate('/login', { replace: true })
        }
    }, [tokens, navigate])

    const hangleLogout = () => {
        dispatch(logout());
    }
    return (
        <SidebarProvider>
            <AppSidebar />
            <main>
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    )

}

export default AppLayout;