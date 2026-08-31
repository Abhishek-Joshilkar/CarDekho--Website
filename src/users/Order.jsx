import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Order.css'

const formatCurrency = (value) =>
  `₹${Number(value || 0).toLocaleString('en-IN')}`

const getItems = (order) => {
  const items = order.items || order.cartItems || order.cart || []
  return Array.isArray(items) ? items : [items]
}

const getCar = (item) => item?.car || item

function Order({ admin = false }) {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8080/orders')
        if (active) {
          const payload = response.data
          setOrders(Array.isArray(payload) ? payload : (Array.isArray(payload?.orders) ? payload.orders : []))
          setError('')
        }
      } catch (requestError) {
        console.error('Error fetching orders:', requestError)
        if (active) {
          setError('Unable to load orders. Please try again later.')
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    fetchOrders()
    return () => {
      active = false
    }
  }, [])

  return (
    <main className="orders-page">
      <header className="orders-header">
        <p className="orders-kicker">{admin ? 'Admin dashboard' : 'Your purchases'}</p>
        <h1>{admin ? 'All Orders' : 'My Orders'}</h1>
        <p>{admin ? 'Review cart details and payment information for every order.' : 'Track your cars, cart items, and payment details in one place.'}</p>
      </header>

      <section className="orders-container" aria-live="polite">
        {loading && <p className="orders-message">Loading orders...</p>}
        {!loading && error && <p className="orders-message orders-message--error">{error}</p>}
        {!loading && !error && orders.length === 0 && (
          <p className="orders-message">No orders found.</p>
        )}

        {!loading && !error && orders.map((order, orderIndex) => {
          const items = getItems(order)
          const paymentId = order.paymentId || order.payment_id || order.payment?.id
          const orderId = order.id || order.orderId || order._id || `order-${orderIndex}`
          const total = order.total ?? items.reduce((sum, item) => {
            const car = getCar(item)
            return sum + Number(car?.price || item?.price || 0) * Number(item?.quantity || 1)
          }, 0)

          return (
            <article className="order-card" key={orderId}>
              <div className="order-card__top">
                <div>
                  <p className="order-label">Order ID</p>
                  <h2>{order.orderId || order.id || order._id || 'Order'}</h2>
                </div>
                <span className={`order-status order-status--${String(order.status || 'placed').toLowerCase()}`}>
                  {order.status || 'Placed'}
                </span>
              </div>

              <div className="order-payment">
                <div>
                  <span className="order-label">Payment ID</span>
                  <strong>{paymentId || 'Not available'}</strong>
                </div>
                <div>
                  <span className="order-label">Order total</span>
                  <strong>{formatCurrency(total)}</strong>
                </div>
              </div>

              <div className="order-items">
                {items.map((item, itemIndex) => {
                  const car = getCar(item)
                  const quantity = Number(item?.quantity || 1)
                  return (
                    <div className="order-item" key={item?.id || car?.id || `${orderId}-${itemIndex}`}>
                      {car?.image ? <img src={car.image} alt={`${car.brand || ''} ${car.model || 'Car'}`} /> : <div className="order-item__placeholder">CAR</div>}
                      <div>
                        <h3>{car?.brand || 'Car'} {car?.model || ''}</h3>
                        <p>Color: {car?.color || 'Not specified'} · Quantity: {quantity}</p>
                      </div>
                      <strong>{formatCurrency(Number(car?.price || item?.price || 0) * quantity)}</strong>
                    </div>
                  )
                })}
              </div>
            </article>
          )
        })}
      </section>
    </main>
  )
}

export default Order
import React from 'react'

function Order() {
  return (
    <div></div>
  )
}

export default Order
