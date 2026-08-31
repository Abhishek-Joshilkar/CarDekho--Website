import React, { useEffect, useState } from 'react'
import axios from 'axios';
import "./Cars.css";
import { Link } from 'react-router-dom';

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

    async function removecart(id) {
        let res = await axios.delete(`http://localhost:8080/cart/${id}`)

        console.log(res.data);

        fetchcarts();
    }

    function totalAmount() {
        let amt = carts.reduce((total, cart) => {

            return total + cart.car.price;
        }, 0)

        console.log(amt);

        return amt;

    }

    function placeorder() {

        const total = totalAmount() * 1000; // Convert to paise

        // Ensure Razorpay script is loaded
        if (!window.Razorpay) {
            alert("Razorpay SDK not loaded. Please check your internet connection.");
            return;
        }

        const options = {
            key: "rzp_test_TVC0b2EuUB9FlS", // Replace with your Razorpay Key ID
            amount: 20000,
            currency: "INR",
            name: "CarDekho",
            description: "Purchase Order",
            handler: async function (response) {
                alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
                // setcart([]);

                let order = {
                    cars: carts.map((cart) => cart.car),
                    totalAmount: totalAmount(),
                    paymentid: response.razorpay_payment_id
                };
                let res = await axios.post("http://localhost:8080/order", order)
                console.log(res);

                if (res.data == "Order placed") {

                    let res = await axios.delete("http://localhost:8080/cart");

                    if (res.data == "cart is empty") {
                        nav("/orders")
                    }
                }

            },
            prefill: {
                name: "Abhishek Joshilkar",
                email: "abhijoshilkar123@gmail.com",
                contact: "1234567891",
            },
            theme: {
                color: "#3399cc",
            }
        };

        const razorpayInstance = new window.Razorpay(options);
        razorpayInstance.open();



    }

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
                                <button onClick={() => { removecart(cart.id) }} >Remove </button>
                            </div>
                        </div>
                    )
                })}
                <h4>Total Amount : {totalAmount()}</h4>
                <button onClick={placeorder}>Place Order</button>
            </div>
            <Link className="cd-btn-primary" to="/orders">View order details</Link>
        </div>
    )
}

export default ViewCart
