import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";

function Register() {
  const { register, handleSubmit, reset } = useForm();

  async function registerUser(user) {
    try {
      const result = await axios.post(
        "http://localhost:8080/register",
        user
      );

      console.log(result);

      if (result.data === "user registered") {
        alert("kya tari wrong ahe !");
        reset();
      } else {
        alert("Registration successful!");
      }
    } catch (error) {
      console.error(error);
      alert("Registration failed");
    }
  }

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow">

        <h2 className="mb-4">Register</h2>

        <Form onSubmit={handleSubmit(registerUser)}>

          {/* Username */}
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>

            <Form.Control
              type="text"
              placeholder="Enter username"
              {...register("uname")}
            />
          </Form.Group>


          {/* Contact */}
          <Form.Group className="mb-3">
            <Form.Label>Contact</Form.Label>

            <Form.Control
              type="text"
              placeholder="Enter contact number"
              {...register("contact")}
            />
          </Form.Group>


          {/* Email */}
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>

            <Form.Control
              type="email"
              placeholder="Enter email"
              {...register("email")}
            />
          </Form.Group>


          {/* Address */}
          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>

            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter address"
              {...register("address")}
            />
          </Form.Group>


          {/* Password */}
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>

            <Form.Control
              type="password"
              placeholder="Enter password"
              {...register("password")}
            />
          </Form.Group>


          {/* Button */}
          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
  <p className="auth-switch">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
      </div>
    </div>
  );
}

export default Register;