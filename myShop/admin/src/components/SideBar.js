import React, { useContext } from 'react'
import './SideBar.css'
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt } from 'react-icons/fa';
import { FaBoxes } from 'react-icons/fa';
import { FaClipboardList } from 'react-icons/fa';
import { FaUsers } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa';
import { AdminContext } from '../context/adminContext';

const SideBar = () => {
    const {isOpen} = useContext(AdminContext)
    return (
        <div className='container'>
              <div className={`sideBar-container ${isOpen ? 'visible' : 'hidden'}`}>
                <ul>
                    <NavLink to='/'><FaTachometerAlt/> <p>DashBoard</p></NavLink>
                    <NavLink to='inventory'><FaBoxes/><p>Inventory</p></NavLink>
                    <NavLink to='orders'><FaClipboardList/><p>Orders</p></NavLink>
                    <NavLink to='customers'><FaUsers/><p>Customers</p></NavLink>
                    <NavLink to='add'><FaPlus/><p>Add Product</p></NavLink>
                </ul>
            </div>
        </div>
    )
}

export default SideBar
