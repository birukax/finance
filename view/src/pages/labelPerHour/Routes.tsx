import { Route } from 'react-router-dom';
import List from './List';
import Edit from './Edit';
import Create from './Create';
import ProtectedRoute from '@/components/ProtectedRoute';

const LabelPerHourRoutes = [
    <Route
        key='label-per-hour-list'
        path='/label-per-hour/list'
        element={
            <ProtectedRoute>
                <List />
            </ProtectedRoute>
        }
    />,
    <Route
        key='label-per-hour-create'
        path='/label-per-hour/create'
        element={
            <ProtectedRoute>
                <Create />
            </ProtectedRoute>
        }
    />,
    <Route
        key='label-per-hour-edit'
        path='/label-per-hour/:id/edit'
        element={
            <ProtectedRoute>
                <Edit />
            </ProtectedRoute>
        }
    />
]

export default LabelPerHourRoutes;