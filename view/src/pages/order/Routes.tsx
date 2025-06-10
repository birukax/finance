import { Route } from 'react-router-dom';
import List from './List';
import Edit from './Edit';
import ProtectedRoute from '@/components/ProtectedRoute';

const OrderRoutes = [
    <Route
        key='order-list'
        path='/order/list'
        element={
            <ProtectedRoute>
                <List />
            </ProtectedRoute>
        }
    />,
    <Route
        key='order-edit'
        path='/order/:id/edit'
        element={
            <ProtectedRoute>
                <Edit />
            </ProtectedRoute>
        }
    />
]

export default OrderRoutes;