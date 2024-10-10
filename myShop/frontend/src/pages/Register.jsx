import React, { useContext } from 'react'
import './Register.css'
import { useState, useEffect } from 'react'
import { ShopContext } from '../components/context/shopContext'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Register = () => {

    const navigate = useNavigate()
    const { setToken, url, userId, setUserId } = useContext(ShopContext);
    const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" })
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    const handleRegister = (evt) => {
        const { name, value } = evt.target
        setFormData((prev) => {
            return {
                ...prev, [name]: value
            }
        })
    }
    const handleSubmit = async (evt) => {
        evt.preventDefault()
        try {
            const response = await axios.post(`${url}/api/users/register`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (response.data.status === 'success') {
                setToken(response.data.token);
                setUserId(response.data.freshUser);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userId', response.data.freshUser)
                navigate('/');
                toast.success('Account created successfully')
            }

        } catch (e) {
            toast.error('Invalid credentials ')
        }
    }


    return (
        <div className='register-container'>
            <h1 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '2rem' }}>Sign Up</h1>
            <form className='form-container' onSubmit={handleSubmit}>

                <div className='first-div'>


                    <div>
                        <label>Full Name</label>
                        <input
                          
                            placeholder='Full Name'
                            name='name'
                            value={formData.name}
                            onChange={handleRegister}
                        />

                    </div>
                    <div>
                        <label>Email Address</label>
                        <input
                            type='email'
                            placeholder='E-mail Address'
                            name='email'
                            value={formData.email}
                            onChange={handleRegister}
                        />
                    </div>

                </div>

                <div className='second-div'>
                    <div>
                        <label>Password</label>
                        <input
                          type={isPasswordVisible ? 'text' : 'password'}
                          
                            placeholder='Password'
                            name='password'
                            value={formData.password}
                            onChange={handleRegister}
                        />
                        
                        <FontAwesomeIcon
                            icon={isPasswordVisible ? faEyeSlash : faEye}
                            className="toggle-icon"
                            onClick={() => setIsPasswordVisible(prevState => !prevState)}
                        />
                        <ul style={{padding:'1rem 0rem 0rem 1rem'}} className='pass-style'>
                            <li>Password must not be less than 8 characters</li>
                            <li>Password can be in any format </li>
                        </ul>
                    </div>
                    <div>
                        <label>Confirm Password</label>
                        <input
                              type={isConfirmPasswordVisible ? 'text' : 'password'}
                            placeholder='Confirm Password'
                            name='confirmPassword'
                            value={formData.confirmPassword}
                            onChange={handleRegister}
                        />
                           <FontAwesomeIcon
                            icon={isConfirmPasswordVisible ? faEyeSlash : faEye}
                            className="toggle-icon"
                            onClick={() => setIsConfirmPasswordVisible(prevState => !prevState)}
                        />
                       
                    </div>
                </div>
                <button className='submit' type='submit'>Submit</button>
                <Link to='/login' className='signup'>Already Have an account? <span>Sign In</span></Link>

            </form>


        </div>
    )
}

export default Register
