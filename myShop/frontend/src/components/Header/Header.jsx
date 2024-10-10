import React, { useContext, useState, useEffect, useRef } from 'react'
import Slider from '../Slider/Slider'
import { NavLink, Link } from 'react-router-dom'
import { ShopContext } from '../context/shopContext'
import './Header.css'
import Cart from '../../pages/Cart'
import { FaShoppingCart } from 'react-icons/fa'
import { FaUser } from 'react-icons/fa'
import { FaCircle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { AiOutlineClose } from 'react-icons/ai'
import { FaBars } from 'react-icons/fa'
import arrow from '../../images/arrow.png'
import { toast } from 'react-toastify'
const Header = () => {
  const { list, handleOpenCart, isCartOpen, token, setToken, setUserId, cart, setCart, fetchCartItems, userId } = useContext(ShopContext);

  const navigate = useNavigate()

  // let cartId = list.map(l=> l._id);


  // const value = Object.values(cartItems).reduce((acc, item) => acc + item, 0);

  const value = cart.reduce((acc, item) => {
    return acc + item.quantity; // Sum the quantities of items in the cart
  }, 0);



  console.log(value); // This will now give you the correct value

  console.log(value);
  console.log(cart)
  const menuRef = useRef();
  const openMenu = () => {
    if (menuRef.current) {
      menuRef.current.style.right = '0';
    }
  }

  const closeMenu = () => {
    if (menuRef.current) {
      menuRef.current.style.right = '-100%';
    }
  }
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setToken('');
    setUserId('');
    setCart([]);
    navigate('/');
    toast.success('You have successfully logged out')
    closeMenu();
  

  }

  useEffect(() => {
    // Fetch cart items when the Header component mounts
    fetchCartItems();
  }, [token, userId]);





  return (
    <div>
      <nav className='container'>
      <Link to='#' onClick={handleOpenCart} className='number'>{token && <span className='cart'>{value}</span>}<FaShoppingCart className='shopping'/></Link>

        <ul ref={menuRef}>


          <div>
            {
              token ?
                <>
               <Link to='/' onClick={closeMenu}><img className='arr' src={arrow}/></Link>
                </>
                : null
            }
          </div>
          <div className='colle'>
            <NavLink to='/category' className='col' onClick={closeMenu}>COLLECTION</NavLink>
            <NavLink to='/about' onClick={closeMenu}>ABOUT</NavLink>
            {!token && <NavLink to='login' onClick={closeMenu}>SIGN IN</NavLink>}
            {token && <Link><p onClick={logout}>LOG OUT</p></Link>}

          </div>
          <div>
          <AiOutlineClose className='nav-cancel' onClick={closeMenu}/>
          </div>
         

       

        </ul>
       
        <NavLink to='/'><h1>Shop It</h1></NavLink>
        <FaBars className='nav-line' onClick={openMenu}/>
      </nav>

      {isCartOpen && <Cart />}

    </div>
  )
}

export default Header
