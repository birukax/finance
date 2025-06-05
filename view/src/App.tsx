import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/account/Login';
import Dashboard from './pages/Dashboard';
// import './App.css'

function App() {

  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/' element={<Dashboard />} />
    </Routes>
  )
}

export default App
