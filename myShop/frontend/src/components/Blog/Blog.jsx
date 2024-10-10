import React, { useContext } from 'react'
import './Blog.css'
import blogData from './BlogData'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa'
import { ShopContext } from '../context/shopContext';
const Blog = () => {

const {token} = useContext(ShopContext)
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

    const trunCate = (text,length) =>{
        if (text.length> length){
          return text.slice(0, length) + '...'
        } else{
          return text + '....'
        }
      }

    return (
        <div className='my-Blog'>
            <div className='magazine'>
                <h1>Our Magazines</h1>
                <Link to={token?'/category':'register'}>Get Started <FaArrowRight /></Link>
            </div>
            <Carousel responsive={responsive}>
                {blogData.map((bG) => {
                    return (

                        <div key={bG.id} className='post-container'>
                            <img src={bG.image} />
                            <p className='bG'>{trunCate(bG.title,30)}</p>
                            <Link to= {`/detail/${bG.id}`}>Read More <FaArrowRight /></Link>
                        </div>
                    )
                })}
            </Carousel>
        </div>
    )
}

export default Blog
