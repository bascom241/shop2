import React, { useRef } from 'react'
import './Footer.css'
import { FaFacebook, FaTwitter,FaLinkedin } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import deliver from '../../images/del2.png'
import { FaArrowRight } from 'react-icons/fa'
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify'
const Footer = () => {

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
    <div className='footer'>
      <div className='community'>

        <h1>Be Part Of Our Community</h1>
        <p>Recieve Exclusive offers and Updates about our Products</p>
        <form ref={form} onSubmit={sendEmail} className='sub-form-conf'>
          <input
            type='email'
            placeholder='email address'
            name='user_email'
            required
          />

          <button className='sub-arrowf'><FaArrowRight/></button>
        </form>

        <div className='socials'>

          <Link to='https://web.facebook.com/profile.php?id=61566812198077'><FaFacebook className='a' /></Link>
         <Link to='https://www.linkedin.com/in/abdulbasit-abdulwahab-144507258/'> <FaLinkedin className='a' /></Link>
         <Link to='https://x.com/basscotte_'><FaTwitter className='a' /></Link> 
        </div>
      </div>
      <div className='links'>
        <div>
          <Link to='/'>Our Blog</Link>
          <Link>Reviews</Link>
          <Link to='/about'>Contact</Link>
          <Link to='/about'>About us</Link>
        </div>
        <div>
          <Link>Faq</Link>
          <Link>Press</Link>
          <Link>Affliate Program</Link>
          <Link to='/about'>Our Company</Link>
        </div>

      </div>
      <div className='deliver'>
        <img src={deliver} />
      </div>

    </div>
  )
}

export default Footer
