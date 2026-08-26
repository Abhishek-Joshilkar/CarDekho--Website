import { Axios } from 'axios';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
function ViewCart() {

    let [carts , setcart]=useState([]);

    async function fetchcarts(){
        let res = await axios.get("http://localhost:8080/cart")

        console.log(res.data);
        setcart(res.data)
        
    } 
    useEffect(()=>{
        fetchcarts()

    },[])
  return (
    <div>

Cart

    </div>
  )
}

export default ViewCart