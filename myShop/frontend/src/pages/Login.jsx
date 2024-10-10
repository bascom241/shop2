import React, { useContext } from 'react'
import './Login.css'
import { useState } from 'react'
import axios from 'axios'
import { ShopContext } from '../components/context/shopContext'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


const Login = () => {

    const navigate = useNavigate();
    const { url, setToken, setUserId } = useContext(ShopContext);

    const [formData, setFormData] = useState({ email: "", password: "" })
    const [isLoginPasswordVisible, setIsLoginPasswordVisible] = useState(false);
    const handleChange = (evt) => {
        const { name, value } = evt.target
        setFormData((prev) => {
            return {
                ...prev, [name]: value
            }
        })
    }

    const handleSignInSubmit = async (evt) => {
        evt.preventDefault()
        try {


            const response = await axios.post(`${url}/api/users/signin`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (response.data.status === 'success') {
                setFormData('');
                setToken(response.data.token);
                setUserId(response.data.freshUser);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userId', response.data.freshUser)
                navigate('/')
                toast.success('Login successfully')
            }
        } catch (err) {
            console.log(err.message);
            toast.error('Invalid Login Credentials')
        }
    }

    return (

        <div className='overall'>

            <h1>Sign In</h1>
            <div className='signInPageContainer'>
                <form className='sign-form-container' onSubmit={handleSignInSubmit}>
                    <div>
                        <label>User Name</label>
                        <input
                            placeholder='E-mail Address'
                            type='email'
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='lo-pasword'>
                        <label>Password</label>
                        <input
                            type={isLoginPasswordVisible ? 'text' : 'password'}
                            placeholder='Password'

                            name='password'
                            value={formData.password}
                            onChange={handleChange}
                        />

                        <FontAwesomeIcon
                            icon={isLoginPasswordVisible ? faEyeSlash : faEye}
                            className="toggle-iconl"
                            onClick={() => setIsLoginPasswordVisible(prevState => !prevState)}
                        />
                    </div>
                    <div className='forgot-your-password'>
                        <button type='submit' className='submit2'>Submit</button>
                        <p>Forgot Your Password?</p>
                    </div>
                </form>
                <div className='signInBox'>
                    <h2>First Time Here?</h2>
                    <p>Register with us and you have access to:</p>
                    <ul>
                        <li>Get Discount Offers</li>
                        <li>Analyze Your Orders</li>
                        <li>Get a refund</li>
                        <li>Track Orders</li>

                        <Link to='/register'>Create Account</Link>
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default Login
