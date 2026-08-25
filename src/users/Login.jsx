import axios from 'axios';
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
function Login() {

  let { handleSubmit, register, reset } = useForm();

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
    <div className="add-car-container">

      <div className="add-car-card">

        <h2>Login <span>Account</span></h2>

        <p className="form-subtitle">
          Enter the details of your own
        </p>

        {msg && <p style={{color:"red"}}>Invlaid Email & Paasword</p>}

        <Form onSubmit={handleSubmit(findUser)}>


          <Form.Group className="mb-3">
            <Form.Label>User Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              {...register("email")}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>User Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              {...register("password")}
            />
          </Form.Group>
          <Button
            className="submit-btn"
            variant="danger"
            type="submit"
          >
            Login
          </Button>


        </Form>
      </div>
    </div>
  )
}

export default Login