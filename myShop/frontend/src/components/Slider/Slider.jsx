import React, { useContext } from 'react'
import './Slider.scss'
import { useState,useEffect } from 'react'
import {AiOutlineArrowLeft} from 'react-icons/ai'
import {AiOutlineArrowRight} from 'react-icons/ai';
import { sliderData } from './slider-data';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/shopContext';
const Slider = () => {
    const {token}= useContext(ShopContext)
    const [currSlide, setCurrSlide] = useState(0);
    const slideLength = sliderData.length;
    //slideLength=1 2 3
    //currSlide = 0 1 2


    const autoScroll = true;
    let slideInterval;
    let intervalTime = 3000;


    const nextSlide = ()=>{
        setCurrSlide(currSlide === slideLength-1? 0 : currSlide+1 )
    }
    const prevSlide = () =>{
        setCurrSlide(currSlide === 0 ? slideLength-1 : currSlide-1)
    }

    function auto(){
        slideInterval = setInterval(nextSlide, intervalTime)
    }

    useEffect(()=>{
        setCurrSlide(0)
    },[])

    useEffect(()=>{
       if(autoScroll){
        auto()
       }
       return () => clearInterval(slideInterval)
    },[currSlide])
  return (
    <div className='slider-container'>

    <div className='slider'>

   
        <AiOutlineArrowLeft className='arrow prev' onClick={prevSlide}/>
        <AiOutlineArrowRight className='arrow next' onClick={nextSlide}/>

        {sliderData.map((slide, index)=>{
            return(
                <div className={index === currSlide ? "slide current": "slide"} key={index}>
                    {index === currSlide && (
                        <>
                            <img src={slide.image} className='img'/>
                            <div className='content'>
                                <h2>{slide.heading}</h2>
                                <p>{slide.desc}</p>
                                <button className='btn'><Link to={token? '/category': '/register'} style={{color:'white'}}>Let's Get started</Link></button>
                            </div>
                        </>
                    )}

                    
                </div>
            )
        })}
        </div>
    </div>
  )
}

export default Slider
