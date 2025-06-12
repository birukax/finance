import { Route } from 'react-router-dom';
import List from './List';
import Edit from './Edit';
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
    />,
    <Route
        key='proration-type-edit'
        path='/proration-type/:id/edit'
        element={
            <ProtectedRoute>
                <Edit />
            </ProtectedRoute>
        }
    />
]

export default ProrationTypeRoutes;