import React from 'react'
import './Header.css'
import { useNavigate } from 'react-router-dom'

function Header() {
  const navigate = useNavigate()

  function handleLogin(event){
    event.preventDefault()
    localStorage.removeItem("accessToke");
    
    navigate('/login')
  }
  return (
    <div className='header__container'>
      <div className="logo">
        <h2>Books</h2>
      </div>
      <nav className="nav">
        <ul>
          <li>Home</li>
          <li>Details</li>
        </ul>
      </nav>
      <div className="btn">
        <button onClick={handleLogin}>Logout</button>
      </div>
    </div>
  )
}

export default Header
