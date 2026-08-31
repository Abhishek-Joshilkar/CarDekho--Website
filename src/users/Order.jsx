
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Order.css";

const formatCurrency = (value) => {
  return `₹${Number(value || 0).toLocaleString("en-IN")}`;
};

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchOrders() {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get("http://localhost:8080/orders");

      console.log("Orders:", res.data);

      setOrders(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("Unable to load orders. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <main className="orders-page">

      {/* Page Heading */}
      <div className="orders-heading">
        <h1>My Orders</h1>
        <p>All your purchased cars</p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="no-orders">
          <h2>Loading Orders...</h2>
          <p>Please wait while we fetch your orders.</p>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="no-orders">
          <h2>Something went wrong</h2>
          <p>{error}</p>
        </div>
      )}

      {/* No Orders */}
      {!loading && !error && orders.length === 0 && (
        <div className="no-orders">
          <h2>No Orders Found</h2>
          <p>You have not placed any orders yet.</p>
        </div>
      )}

      {/* Orders */}
      {!loading && !error && orders.length > 0 && (
        <div className="orders-container">

          {orders.map((order) => {

            const cars = Array.isArray(order.cars)
              ? order.cars
              : [];

            const totalAmount =
              order.totalamount ??
              cars.reduce((total, car) => {
                return total + Number(car.price || 0);
              }, 0);

            return (
              <div
                className="order-card"
                key={order.id}
              >

                {/* Order Header */}
                <div className="order-header">

                  <div>
                    <h2>
                      Order #{order.id}
                    </h2>

                    <p>
                      Payment ID:{" "}
                      {order.paymentid || "Not Available"}
                    </p>
                  </div>

                  <span className="order-status">
                    ✓ Order Placed
                  </span>

                </div>

                {/* Cars */}
                <div className="cars-list">

                  {cars.length === 0 ? (

                    <p>
                      No car details available.
                    </p>

                  ) : (

                    cars.map((car) => (

                      <div
                        className="ordered-car"
                        key={car.id}
                      >

                        <img
                          src={car.image}
                          alt={`${car.brand} ${car.model}`}
                        />

                        <div className="car-info">

                          <h3>
                            {car.brand} {car.model}
                          </h3>

                          <p>
                            <b>Color:</b>{" "}
                            {car.color || "Not specified"}
                          </p>

                          <p>
                            <b>Price:</b>{" "}
                            {formatCurrency(car.price)}
                          </p>

                        </div>

                      </div>

                    ))

                  )}

                </div>

                {/* Order Total */}
                <div className="order-total">

                  <span>
                    Total Amount
                  </span>

                  <strong>
                    {formatCurrency(totalAmount)}
                  </strong>

                </div>

              </div>
            );
          })}

        </div>
      )}

    </main>
  );
}

export default Orders;

