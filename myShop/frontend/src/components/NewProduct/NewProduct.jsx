import React from 'react'
import './NewProduct.css'
import products from '../../productData'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';
const NewProduct = ({list,setList,url,addToCart,cartItems,filteredItems}) => {


  let limitedProducts =list.slice(0, 3);

    const responsive = {
        superLargeDesktop: {

          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };

      console.log(list)
  return (

    <div className='card-container'>

        <Carousel responsive={responsive}>
      {limitedProducts.map((product)=>{
        return(
            <>
            <div key={product.id} className='product-card'>
            <Link to={`/product/${product._id}`}>
                <img src={product.image}/>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>#{product.price}</p>
              </Link>
                <button className='add-to-cart' onClick={()=> addToCart(product._id)}>Add to Cart</button>
           
            </div>
          
            </>
        )
      })}
      </Carousel>
    </div>
   
  )
}

export default NewProduct

