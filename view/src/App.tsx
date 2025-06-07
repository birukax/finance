import { Routes, Route } from 'react-router-dom';
import Login from './pages/user/Login';
import MainRoutes from './pages/MainRoutes';
import AccountRoutes from './pages/account/Routes';
import './App.css'

const App: React.FC = () => {

  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      {MainRoutes}
      {AccountRoutes}
    </Routes>
  )
}

export default App;
