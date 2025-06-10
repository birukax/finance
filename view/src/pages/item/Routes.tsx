import { Route } from 'react-router-dom';
import List from './List';
import Edit from './Edit';
import ProtectedRoute from '@/components/ProtectedRoute';

const ItemRoutes = [
    <Route
        key='item-list'
        path='/item/list'
        element={
            <ProtectedRoute>
                <List />
            </ProtectedRoute>
        }
    />,
    <Route
        key='item-edit'
        path='/item/:id/edit'
        element={
            <ProtectedRoute>
                <Edit />
            </ProtectedRoute>
        }
    />
]

export default ItemRoutes;