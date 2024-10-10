import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../components/context/shopContext'
import './Cart.css'
import { FaTimes } from 'react-icons/fa'
import axios from 'axios';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import Empty from '../images/Empty.png'
import { Link } from 'react-router-dom';
const Cart = () => {
  const {
    handleCloseCart,
 
    isCartOpen, quantity,
  
    userId,
  
    token,
    cart,

    removeFromCart,
    fetchCartItems,
         decreaseQuantity ,
        IncreamentQuantity
  } = useContext(ShopContext);




  console.log(userId)
  // const cartProductList = list.filter(product => cartItems[product._id] > 0);

  useEffect(() => {

    fetchCartItems();

  }, [])




  console.log('This is cart quantity', quantity)


  





  return (

    <>
      {isCartOpen && <div className='cart-overlay'></div>}
      <div className={`carto ${isCartOpen ? 'open' : ''}`}>

        <div className='cart-header'>
          <h2>Cart</h2>
          <FaTimes onClick={handleCloseCart} />
        </div>
        {/* 
      <p style={{ textAlign: 'center', color: 'rgb(10, 10, 56, 0.4)' }}>Experience a transparent transaction </p> */}
        <div>


          {cart.length === 0 ? (<div className='empty-cart'>
            <img src={Empty} />
          </div>) :
            (token && userId ? cart.map(c =>

              <>


                <div key={c._id} className='cart-container'>



                  <div className='cart-image-container'>
                    <img src={c.image} />
                  </div>

                  <div className='cart-description'>
                    <p>{c.name}</p>
                    <p>{c.description}</p>
                  </div>



                  <div className='trash-price'>
                    <FaTrash className='t' onClick={() => removeFromCart(c.productId)} />
                    {/* <p>#{c.price}</p> */}
                  </div>


                </div>

                <div className='price-update-container'>

                  <div className='price-update'>
                    <p className='minus' onClick={() => decreaseQuantity(c.productId, c.quantity)}><FaMinus /></p>
                    <p style={{color:'white'}}>{c.quantity}</p>
                    <p className='plus' onClick={() => IncreamentQuantity(c.productId, c.quantity)}><FaPlus /></p>
                  </div>

                  <div className='subtotal-cotaniner'>
                    {/* <p className='subtotal-price2'>#{c.price * c.quantity}</p> */}
                    <p className='subtotal-price'>#{c.price * c.quantity}</p>
                  </div>

                </div>

                <hr className='hrrr' />
                <p>{c._id}</p>
               
              </>

            ) : null)}
            {cart.length !==0  &&<Link to='checkout' onClick={handleCloseCart} className='check-out-btn'> Check-Out</Link>}
        </div>

      </div>
    </>
  )
}

export default Cart
