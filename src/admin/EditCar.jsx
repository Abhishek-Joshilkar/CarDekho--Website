import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function EditCar() {

    let {register, handleSubmit, reset} = useForm();

    let {id} = useParams();

    let nav=useNavigate();

    async function fetchcar(){
        let result = await axios.get(`http://localhost:8080/car/${id}`);
        console.log(result);
       reset(result.data);
    }

    useEffect(()=>{
fetchcar();
    },[id])

    async function editcar(car){
        let res = await axios.put("http://localhost:8080/ecar",car);
        console.log(res);
        if(res.data=="Car is Updated"){
            nav("/admin/cars")
        }
        else{
            alert("Something went Wrong")
        }
        
    }



    return (
        <div className="container mt-5">
            <div className="card p-4 shadow">
                <h2 className="mb-4">Edit  Car</h2>

                <Form  onSubmit={handleSubmit(editcar)}>
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
                        Edit save Car
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default EditCar