import { Route } from 'react-router-dom';
import List from './List';
import Edit from './Edit';
import Create from './Create';
import ProtectedRoute from '@/components/ProtectedRoute';

const ProrationRoutes = [
    <Route
        key='proration-list'
        path='proration/list'
        element={
            <ProtectedRoute>
                <List />
            </ProtectedRoute>
        }
    />,
    <Route
        key='proration-create'
        path='proration/create'
        element={
            <ProtectedRoute>
                <Create />
            </ProtectedRoute>
        }
    />,
    <Route
        key='proration-edit'
        path='proration/:id/edit'
        element={
            <ProtectedRoute>
                <Edit />
            </ProtectedRoute>
        }
    />
]

export default ProrationRoutes;