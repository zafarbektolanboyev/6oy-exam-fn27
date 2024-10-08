import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import Details from './pages/Details'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'

function App() {
  const [token, setToken] = useState(localStorage.getItem('accessToken'))
  const navigate = useNavigate()
  const location = useLocation()

  function ProtectedRoute({ isAuth, children }) {
    const { pathname } = location
    if (pathname === '/register') {
      return children
    }
    if (!isAuth) {
      navigate('/login')
    }
    return children
  }

  return (
    <div>
      <Routes>
        <Route
          path='/'
          element={<ProtectedRoute isAuth={!!token}><Home /></ProtectedRoute>}
        />
        <Route
          path='/details/:id'
          element={<ProtectedRoute isAuth={!!token}><Details /></ProtectedRoute>}
        />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </div>
  )
}

export default App
