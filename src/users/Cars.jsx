import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Cars.css";

function Cars() {
  const [cars, setCars] = useState([]);

  const fetchCars = async () => {
    try {
      const response = await axios.get("http://localhost:8080/cars");
      console.log(response.data);
      setCars(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  async function addcart(car){
    let cart={
      car,
      quantity:1
    }
let res = await axios.post("http://localhost:8080/addcart",cart);
console.log(res);

alert ("Car is added")


  }

  return (
    <div className="cars-page">
      <div className="cars-header">
        <h1>Explore Cars</h1>
        <p>Find the right car for your needs</p>
      </div>

      <div className="cars-container">
        {cars.map((car) => (
          <div className="car-card" key={car.id}>

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

              <h3>
                ₹{Number(car.price).toLocaleString("en-IN")}
              </h3>

              <div className="car-actions">
                <button type="button">View Details</button>
                <button type="button" onClick={() => { addcart(car) }}>Add to cart</button>
              </div>

            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Cars;
