import React from 'react'
import './Login.css'

import { AdminContext } from '../context/adminContext'
import { useContext } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
const Login = () => {
    const { url, token, setToken } = useContext(AdminContext);

    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });


    const handleFormData = (evt) => {
        const { name, value } = evt.target;
        setFormData((prev) => {
            return {
                ...prev, [name]: value
            }
        })
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault()

        try {


            const response = await axios.post(`${url}/api/users/admin`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (response.data.status === 'success') {
                setFormData('')
                setToken(response.data.token);
                localStorage.setItem('token', response.data.token);
                toast.success('Login successfully')
                navigate('/')
            }
        } catch (err) {
            toast.error('Invalid credentials')
        }
    }

    return (
        <div className='form-login-container'>
           
            <form className='login-container' onSubmit={handleSubmit}>
            <h1 style={{textAlign:'center'}}>SIGN IN</h1>
                <div >
                    <input
                        placeholder='Email'
                        type='email'
                        onChange={handleFormData}
                        value={formData.email}
                        name='email'

                    />
                </div>

                <div>
                    <input
                        placeholder='Password'
                        type='password'
                        onChange={handleFormData}
                        value={formData.password}
                        name='password'
                    />

                </div>
                <button className='btn-submit' type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default Login
