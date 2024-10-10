import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import SideBar from './SideBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './LayOut.css'; // Import the CSS file for styling

const LayOut = () => {
    return (
        <>
            <div className="layout-container">
                <ToastContainer />
                <NavBar />
                <div className="content-wrapper">
                    <SideBar />
                    <Outlet />
                </div>
            </div>
        </>
    );
}

export default LayOut;
