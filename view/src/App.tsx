import { Routes, Route } from 'react-router-dom';
import Login from './pages/user/Login';
import MainRoutes from './pages/MainRoutes';
import ItemRoutes from './pages//item/Routes';
import OrderRoutes from './pages//order/Routes';
import RoutingRoutes from './pages/routing/Routes';
import OutputRoutes from './pages//output/Routes';
import LocationRoutes from './pages/location/Routes';
import AccountRoutes from './pages/account/Routes';
import ProrationTypeRoutes from './pages/prorationType/Routes';
import './App.css'

const App: React.FC = () => {

  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      {MainRoutes}
      {ItemRoutes}
      {OrderRoutes}
      {RoutingRoutes}
      {OutputRoutes}
      {AccountRoutes}
      {LocationRoutes}
      {ProrationTypeRoutes}
    </Routes>
  )
}

export default App;
