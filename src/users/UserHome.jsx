import React from 'react'
import { Link } from 'react-router-dom'
import './user.css'

const features = [
  {
    icon: '🔍',
    title: 'Smart Search',
    desc: 'Filter by brand, model, price, fuel type and more. Find your perfect match in seconds.',
  },
  {
    icon: '🛡️',
    title: 'Verified Listings',
    desc: 'Every car goes through a thorough inspection before being listed on our platform.',
  },
  {
    icon: '💰',
    title: 'Best Price Guarantee',
    desc: 'We compare prices across all dealers to ensure you always get the best deal.',
  },
  {
    icon: '⚡',
    title: 'Instant Loan',
    desc: 'Get pre-approved for a car loan in minutes with our partnered financial institutions.',
  },
]

const brands = ['Maruti', 'Hyundai', 'Tata', 'Honda', 'BMW', 'Mercedes', 'Audi', 'Toyota']

function UserHome() {
  return (
    <div className="cd-home">

      {/* ── HERO ── */}
      <section className="cd-hero">
        <div className="cd-hero__bg" />
        <div className="cd-hero__overlay" />

        <div className="cd-hero__content">
          <div className="cd-hero__badge">
            <span className="cd-hero__badge-dot" />
            India's Most Trusted Car Marketplace
          </div>

          <h1 className="cd-hero__title">
            Find Your Dream
            <span className="highlight">Car Today</span>
          </h1>

          <p className="cd-hero__subtitle">
            Discover thousands of new &amp; used cars at unbeatable prices.
            Transparent deals, verified sellers, and doorstep delivery.
          </p>

          <div className="cd-hero__actions">
            <Link to="/cars" className="cd-btn-primary">
              Browse Cars &nbsp;→
            </Link>
            {/* <Link to="/cars" className="cd-btn-secondary">
              ▶&nbsp; Watch Tour
            </Link> */}
          </div>
        </div>

        <div className="cd-hero__scroll">
          <span>Scroll</span>
          <div className="cd-hero__scroll-bar" />
        </div>
      </section>

      {/* ── BRANDS STRIP ── */}
      <div className="cd-brands">
        <div className="cd-brands__inner">
          <span className="cd-brands__label">Top Brands</span>
          <div className="cd-brands__list">
            {brands.map((b) => (
              <span key={b} className="cd-brand-item">{b}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── FEATURES ── */}
      <section className="cd-features">
        <p className="cd-section-label">Why CarDekho</p>
        <h2 className="cd-section-title">Everything you need,<br />in one place</h2>
        <p className="cd-section-sub">
          From research to purchase, we've got you covered with the most complete car-buying experience in India.
        </p>

        <div className="cd-features__grid">
          {features.map((f) => (
            <div key={f.title} className="cd-feature-card">
              <div className="cd-feature-card__icon">{f.icon}</div>
              <h3 className="cd-feature-card__title">{f.title}</h3>
              <p className="cd-feature-card__desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}

export default UserHome