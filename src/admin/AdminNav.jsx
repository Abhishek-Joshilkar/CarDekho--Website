import React, { useState, useEffect } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import './adminhome.css'

function AdminNav() {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  

  return (
    <>
    <nav className={`cd-nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="cd-nav__inner">

        {/* ── Logo ── */}
        <Link to="/" className="cd-nav__logo">
          <div className="cd-nav__logo-icon">🚗</div>
          <span className="cd-nav__logo-text">
            Car<span>Dekho</span>
          </span>
        </Link>

        {/* ── Links ── */}
        <ul className="cd-nav__links">
          <li>
            <Link
              to="/admin"
              className={location.pathname === '/admin' ? 'active' : ''}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/admin/cars"
              className={location.pathname === '/admin/cars' ? 'active' : ''}
            >
              Cars
            </Link>
          </li>
          <li>
            <Link
              to="/admin/orders"
              className={location.pathname === '/admin/orders' ? 'active' : ''}
            >
              Orders
            </Link>
          </li>
           <li>
            <Link
              to="/admin/addcar"
              className={location.pathname === '/admin/addcar' ? 'active' : ''}
            >
              Add Cars 
            </Link>
          </li>  
        </ul>

      </div>
    </nav>
    <Outlet />
    </>
  )
}

export default AdminNav
