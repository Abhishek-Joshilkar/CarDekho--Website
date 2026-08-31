import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './user.css'

function UserNav() {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
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
              to="/"
              className={location.pathname === '/' ? 'active' : ''}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/cars"
              className={location.pathname === '/cars' ? 'active' : ''}
            >
              Cars
            </Link>
          </li>
          <li>
            <Link to="/carts">Cart</Link>
          </li>
          <li>
            <Link
              to="/orders"
              className={location.pathname === '/orders' ? 'active' : ''}
            >
              Orders
            </Link>
          </li>
          {/* <li>
            <Link to="/cars">Compare</Link>
          </li> */}
        </ul>

        {/* ── CTA ── */}
        <div className="cd-nav__cta">
          <Link to="/Register" className="cd-btn-nav">
            Register/Login
          </Link>
        </div>

      </div>
    </nav>
  )
}

export default UserNav