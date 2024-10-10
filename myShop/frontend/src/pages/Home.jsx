import React, { useContext, useEffect, useState, useRef } from 'react'
import './Home.css'
import Image1 from '../images/Image3.jpg'
import Slider from '../components/Slider/Slider'
import products from './../../data'
import Sub from '../images/sub2.jpg'
import { NavLink, Link } from 'react-router-dom'
import NewProduct from '../components/NewProduct/NewProduct'
import Banner from '../images/Banner3.jpg'
import { FaArrowRight } from 'react-icons/fa'
import Blog from '../components/Blog/Blog'
import { ShopContext } from '../components/context/shopContext'
import axios from 'axios'
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify'
const Home = () => {


  const { url, list, setList, addToCart, cartItems, isCartOpen, fetchItems ,token} = useContext(ShopContext);



  useEffect(() => {
    fetchItems();
  }, [])


  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_8ylrkkr', 'template_8nrkk94', form.current, {
        publicKey: 'ZW99MvlPVKFRexJ7a',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          toast.success('Email sent successfully')
        },
        (error) => {
          console.log('FAILED...', error.text);
          toast.error('Email sent failed')
        },
      );

    e.target.reset();
  };

  return (
    <>
      <Slider />
      <div className={`${isCartOpen ? 'blur page' : 'page'}`}

      >
        <h1 className='read'>A must Read</h1>
        <div className='viscon'>

          <div className='tip'>

            <p style={{ fontStyle: 'italic' }}> "Use productivity gadgets like smart assistants to automate tasks and improve your workspace efficiency."</p>
            <p> — Alex Carter, Tech Enthusiast</p>
          </div>
          <div className='tip'>

            <p style={{ fontStyle: 'italic' }}>"To extend your gadget’s battery life, lower brightness, close background apps, and enable energy-saving modes."</p>
            <p> — Emma Williams, Gadget Reviewer</p>
          </div>
          <div className='tip'>

            <p style={{ fontStyle: 'italic' }}>Wearable gadgets like fitness trackers are great for staying on top of your health and achieving personalized fitness goals.</p>
            <p>— Sarah Lee, the Blogger</p>
          </div>
        </div>


        <div className='advert'>
          <div className='product-container'>
            <img src={Image1} />
          </div>
          <div className='choose'>
            <h3>Why Choose Us </h3>

            <p>Our products are built to last.<br />
              Each gadget undergoes rigorous<br />
              testing to ensure it performs perfectly<br />
              and stands the test of time.</p>


            <h2>Affordable Excellence</h2>
            <p>Top-tier gadgets don’t have to break the bank.<br />
              We offer competitive prices so you can stay ahead<br />
              in the tech game without stretching your budget.</p>

            <h2>Customer Satisfaction First</h2>
            <p>Our customers are our priority!<br />
              We’re committed to delivering a shopping experience that <br />
              exceeds expectations with fast shipping, hassle-free returns,<br />
              and top-notch service.</p>
          </div>
          <h2 className='h2'>Explore</h2>
          <div className='explore'>
            {products.map((p) => {
              return (
                <>
                  <div key={p.id} className='image-con'>
                    <img src={p.image} />
                    <p>{p.name}</p>
                    <Link to='/category' className='shop-cat'>Shop</Link>
                  </div>
                </>
              )
            })}
          </div>

          <div className='sub'>
            <img src={Sub} alt={Sub}/>
            <div className='sub-text'>
              <h1>Stay Updated with Our Latest News!</h1>
              <h3>Join our community and be the first to know about: </h3>
              <p>Exclusive Offers: Get special discounts and promotions.</p>
              <p>New Arrivals: Stay updated with our latest products.</p>
              <p>Insider Tips: Receive expert advice and tips directly in your inbox.</p>
              <h2>Subscribe Now and enjoy a 10% discount on your next purchase!</h2>
              <form ref={form} onSubmit={sendEmail} className='sub-form-con'>
                <input
                  type='email'
                  placeholder='email address'
                  name='user_email'
                  required
                  className='input-subform'
                />

                <button className='sub-arrow'><FaArrowRight className='sub-i'/></button>
              </form>
            </div>

          </div>


          <div className='trends'>
            <h1>New Collections</h1>
            <NewProduct
              list={list}
              setList={setList}
              url={url}
              addToCart={addToCart}
              cartItems={cartItems}
            />
          </div>

          <div className='banner-container'>
            <img className='banner-img' src={Banner} />
            <div className='banner-text'>
              <h3>Our Mission</h3>
              <h1>Use Without Fear</h1>
              <p>We make gadget your Best partner </p>
              <p>Seamless Use with 1 year warranty</p>
              <Link to='/about'>Book Us<FaArrowRight /></Link>
            </div>
          </div>
          <Blog />
        </div>
      </div>


    </>
  )
}

export default Home
