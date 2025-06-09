import { Route } from 'react-router-dom';
import List from './List';
import Create from './Create';
import ProtectedRoute from '@/components/ProtectedRoute';

const ProrationTypeRoutes = [
    <Route
        key='proration-type-list'
        path='proration-type/list'
        element={
            <ProtectedRoute>
                <List />
            </ProtectedRoute>
        }
    />,
    <Route
        key='proration-type-create'
        path='proration-type/create'
        element={
            <ProtectedRoute>
                <Create />
            </ProtectedRoute>
        }
    />
]

export default ProrationTypeRoutes;