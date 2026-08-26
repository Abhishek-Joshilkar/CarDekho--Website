import React, { useEffect, useState } from 'react'
import axios from 'axios';
import "./Cars.css";

function ViewCart() {

    let [carts, setcart] = useState([]);

    async function fetchcarts() {
        try {
            let res = await axios.get("http://localhost:8080/cart")

            console.log(res.data);
            setcart(Array.isArray(res.data) ? res.data : [])
        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    }

    useEffect(() => {
        fetchcarts()

    }, [])

    return (
        <div className="cars-page">
            <div className="cars-header">
                <h1>Cart</h1>
                <p>Cars added to your cart</p>
            </div>

            <div className="cars-container">
                {carts.map((cart) => {
                    const car = cart.car || cart;

                    return (
                        <div className="car-card" key={cart.id || car.id}>
                            <div className="car-image">
                                <img src={car.image} alt={`${car.brand} ${car.model}`} />
                            </div>

                            <div className="car-details">
                                <h2>
                                    {car.brand} {car.model}
                                </h2>

                                <p>
                                    <strong>Color:</strong> {car.color}
                                </p>

                                <p>
                                    <strong>Quantity:</strong> {cart.quantity || 1}
                                </p>

                                <h3>
                                    ₹{Number(car.price).toLocaleString("en-IN")}
                                </h3>
                                <button>Remove </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ViewCart
