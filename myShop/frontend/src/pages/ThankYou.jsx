import React, { useContext } from 'react'
import './ThankYou.css'
import { Link } from 'react-router-dom'
import { FaCheck } from 'react-icons/fa'
import { ShopContext } from '../components/context/shopContext'
const ThankYou = () => {

    const {userId} = useContext(ShopContext)

  return (
       <div className='thank-you-container'>
           <div className='order-check'><FaCheck/> </div> 
            <h1>Thank You For Your Purchase</h1>
            <p>Check Your Email For Your Order Updates</p>
       
            <Link to='/'>Go Back to Home Page</Link>
            <p>Ref Number: <b>{userId}</b></p>

    </div>
  )
}

export default ThankYou
