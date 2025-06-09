import { Routes, Route } from 'react-router-dom';
import Login from './pages/user/Login';
import MainRoutes from './pages/MainRoutes';
import AccountRoutes from './pages/account/Routes';
import ProrationTypeRoutes from './pages/prorationType/Routes';
import './App.css'

const App: React.FC = () => {

  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      {MainRoutes}
      {AccountRoutes}
      {ProrationTypeRoutes}
    </Routes>
  )
}

export default App;
