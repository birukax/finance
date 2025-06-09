import { Route } from 'react-router-dom';
import List from './List';
import Edit from './Edit';
import ProtectedRoute from '@/components/ProtectedRoute';

const AccountRoutes = [
    <Route
        key='account-list'
        path='/account/list'
        element={
            <ProtectedRoute>
                <List />
            </ProtectedRoute>
        }
    />,
    <Route
        key='account-edit'
        path='/account/:id/edit'
        element={
            <ProtectedRoute>
                <Edit />
            </ProtectedRoute>
        }
    />
]

export default AccountRoutes;