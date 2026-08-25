import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import axios from 'axios';



function AddCar() {
    
    let {register, handleSubmit, reset} = useForm();

    async function addcar(car){
        let result = await axios.post("http://localhost:8080/car", car);
        console.log(result);
        if(result.data=="car added"){
            alert("Car added successfully");
            reset();
        }else{
            alert("Somthing went wrong  ");

        }
    }
    return (
        <div className="container mt-5">
            <div className="card p-4 shadow">
                <h2 className="mb-4">Add Car</h2>

                <Form onSubmit={handleSubmit(addcar)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Car Model</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter car model"
                            {...register("model")}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Car Brand</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter car brand"
                            {...register("brand")}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter price"
                            {...register("price")}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Car Color</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter car color"
                            {...register("color")}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Car Image</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter image URL"
                            {...register("image")}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Add Car
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default AddCar;