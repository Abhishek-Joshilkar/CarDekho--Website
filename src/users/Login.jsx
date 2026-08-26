import axios from 'axios';
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import './auth.css';

function Login() {

  let { handleSubmit, register } = useForm();

  let nav = useNavigate()

  let [msg,setmsg]=useState(false);

  async function findUser(user) {

    if (user.email == "admin@gmail.com" && user.password == "admin@123") {
      nav("/admin")

    } else {
      let res = await axios.get("http://localhost:8080/login", {
        params: {
          email: user.email,
          password: user.password
        }
      })

      console.log(res);

      if (res.data == "login successfull") {
        nav("/")
      }else{
        setmsg(true)
      }
    }


  }



  return (
    <div className="auth-shell">
      <div className="auth-visual">
        <span className="auth-kicker">Welcome back</span>
        <h1>Find your next drive faster.</h1>
        <p>Login to continue browsing saved cars, cart items, and fresh listings.</p>
      </div>

      <div className="auth-card">
        <div className="auth-card__header">
          <h2>Login Account</h2>
          <p>Enter your details to continue</p>
        </div>

        {msg && <p className="auth-error">Invalid email or password</p>}

        <Form className="auth-form" onSubmit={handleSubmit(findUser)}>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              {...register("email")}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              {...register("password")}
            />
          </Form.Group>

          <Button
            className="auth-submit"
            variant="danger"
            type="submit"
          >
            Login
          </Button>
        </Form>

        <p className="auth-switch">
          New to CarDekho? <Link to="/register">Create account</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
