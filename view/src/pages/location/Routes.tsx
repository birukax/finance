import { Route } from 'react-router-dom';
import List from './List';
import Edit from './Edit';
import ProtectedRoute from '@/components/ProtectedRoute';

const LocationRoutes = [
    <Route
        key='location-list'
        path='/location/list'
        element={
            <ProtectedRoute>
                <List />
            </ProtectedRoute>
        }
    />,
    <Route
        key='location-edit'
        path='/location/:id/edit'
        element={
            <ProtectedRoute>
                <Edit />
            </ProtectedRoute>
        }
    />
]

export default LocationRoutes;