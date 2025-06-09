import { Route } from 'react-router-dom';
import List from './List';
import ProtectedRoute from '@/components/ProtectedRoute';

const AccountRoutes = [
    <Route
        key='account-list'
        path='account/list'
        element={
            <ProtectedRoute>
                <List />
            </ProtectedRoute>
        }
    />
]

export default AccountRoutes;