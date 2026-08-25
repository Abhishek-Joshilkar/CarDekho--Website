import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Cars.css";

function Cars() {
  const [cars, setCars] = useState([]);

  const fetchCars = async () => {
    try {
      const response = await axios.get("http://localhost:8080/cars");
      console.log(response.data);
      setCars(response.data);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

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

              <button>View Details</button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Cars;