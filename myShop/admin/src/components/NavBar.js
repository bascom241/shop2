import React from 'react';

import './NavBar.css';
import { Link } from 'react-router-dom';
import { AdminContext } from '../context/adminContext';
import { useContext } from 'react';
import { FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { FaBars } from 'react-icons/fa';
const NavBar = () => {

    const { token, setToken, toggleSidebar } = useContext(AdminContext);
    const login = () => {
        localStorage.removeItem('token')
        setToken('');
        toast.success('You have logged out sucessfuly')



    }


    return (
        <div className='nav-container'>
           
                 {/* Hamburger icon */}
          
            <ul>
                <Link className='vis'>Shop It</Link>

                <FaBars className='bar' onClick={toggleSidebar} style={{fontSize:'1.2rem'}}/>


                <div className='link'>
                    <h2>Admin Dashboard</h2>
                </div>


                <div className='link'>

                    {token ? <p onClick={login} style={{ cursor: 'pointer' }}>Logout</p> : <Link to='login'>Login</Link>}

                    <div className='link2'>

                        {token && <FaUser />}
                        {/* <p>Notifications</p> */}
                    </div>
                </div>
            </ul>
        </div>
    );
};

export default NavBar;

