import { Route } from 'react-router-dom';
import List from './List';
import Edit from './Edit';
import ProtectedRoute from '@/components/ProtectedRoute';

const RoutingRoutes = [
    <Route
        key='routing-list'
        path='/routing/list'
        element={
            <ProtectedRoute>
                <List />
            </ProtectedRoute>
        }
    />,
    <Route
        key='routing-edit'
        path='/routing/:id/edit'
        element={
            <ProtectedRoute>
                <Edit />
            </ProtectedRoute>
        }
    />
]

export default RoutingRoutes;