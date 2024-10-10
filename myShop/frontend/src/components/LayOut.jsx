import React from 'react'
import { Outlet,useLocation } from 'react-router-dom'
import Header from './Header/Header'
import Footer from './footer/Footer'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const LayOut = () => {


  const location = useLocation();
  return (
    <div>
      <Header/>
      <ToastContainer/>
      <Outlet location={location} key={location.pathname}/>
      <Footer/>
    </div>
  )
}

export default LayOut
