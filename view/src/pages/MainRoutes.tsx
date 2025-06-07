import { Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import ProtectedRoute from '@/components/ProtectedRoute';
import type { JSX } from 'react';

const MainRoutes: JSX.Element[] = [
    <Route key='dashboard' path='/' element={
        <ProtectedRoute>
            < Dashboard />
        </ProtectedRoute>
    } />
];

export default MainRoutes;