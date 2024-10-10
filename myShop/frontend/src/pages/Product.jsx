import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../components/context/shopContext';
import './Product.css'
import { FaUndo } from 'react-icons/fa';
import { FaShieldAlt } from 'react-icons/fa';
import axios from 'axios';

const Product = () => {
  const { url, addToCart, product, setProduct, quantity, setQuantity } = useContext(ShopContext);

  const { productId } = useParams();


  // console.log(cartItems)


  const fetchPost = async () => {
    try {
      const response = await axios.get(`${url}/api/product/${productId}`);
      setProduct(response.data.product);
    } catch (err) {
      console.log(err.message)
    }


  }

  useEffect(() => {
    fetchPost();
  }, [])
  return (
    <div className='product-container'>

      <div className='p-container'>
        <div className='ppp-p'>
          <img src={product.image} />
        </div>
        <div className='p-cart'>

          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <div className='price'>
            {/* <h2>
              #{product.price }
            </h2> */}

            <h2>
              #{product.price}
            </h2>
            {/* <input
                  type='number'
                  placeholder='Qty'
                   value={quantity}
                  // onChange={(evt)=> setQuantity(Number(evt.target.value))}
                /> */}
          </div>
          <div className='purchase'>
            <button onClick={() => addToCart(product._id, quantity)}>Add to Cart</button>

            <p>Free Delivery on First Purchase! </p>
          </div>

          <div className='returns'>
            <div>
              <FaUndo />
              <p>Free Returns </p>
            </div>
            <div>
              <FaShieldAlt />
              <p>Secure Checkout</p>
            </div>
          </div>
        </div>

      </div>


    </div>
  )
}

export default Product
