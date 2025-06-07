import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { type AppState } from '../utils/store';
import AppLayout from './AppLayout';

const ProtectedRoute = ({ children }) => {
    const tokens = useSelector((state: AppState) => state.auth.tokens)
    return tokens.access ? (
        <AppLayout>{children}</AppLayout>
    ) : (
        <Navigate to='/login' replace />
    )
}

export default ProtectedRoute;