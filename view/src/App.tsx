import { Routes, Route } from 'react-router-dom';
import Login from './pages/account/Login';
import MainRoutes from './pages/MainRoutes';
import './App.css'

const App: React.FC = () => {

  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      {MainRoutes}
    </Routes>
  )
}

export default App;
