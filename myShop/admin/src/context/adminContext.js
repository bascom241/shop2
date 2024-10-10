import React, { createContext, useState, useEffect } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

export const AdminContext = createContext(null);

const AdminContextProvider = (props) => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(prevState => !prevState);
    };



    const [users, setUsers] = useState(() => {
        const savedUsers = localStorage.getItem('users');
        return savedUsers ? JSON.parse(savedUsers) : [];
    });

    const [token, setToken] = useState(localStorage.getItem('token'));
    const [ordersList, setOrdersList] = useState([]);

    // Load totalOrder and totalRevenue from localStorage
    const [totalOrder, setTotalOrder] = useState(() => {
        const savedTotal = localStorage.getItem('totalOrder');
        return savedTotal ? JSON.parse(savedTotal) : 0;
    });

    const [totalRevenue, setTotalRevenue] = useState(() => {
        const savedRevenue = localStorage.getItem('totalRevenue');
        return savedRevenue ? JSON.parse(savedRevenue) : 0;
    });

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }

        
    }, []);

    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(users));
    }, [users]);

    const [list, setList] = useState(() => {
        const savedLists = localStorage.getItem('list');
        return savedLists ? JSON.parse(savedLists) : [];
    });

    useEffect(() => {
        localStorage.setItem('list', JSON.stringify(list));
    }, [list]);

    const url = "https://backend-abdulbasits-projects-70099814.vercel.app/";

    const fetchOrders = async () => {
        try {
            const response = await axios.get(`${url}/api/order/orders`);
            const orders = response.data.data;
           

            setOrdersList(orders);

            // Update totalOrder and save to localStorage
            const total = orders.length;
            setTotalOrder(total);
            localStorage.setItem('totalOrder', JSON.stringify(total));

            // Calculate total revenue
            const revenue = orders.reduce((acc, order) => {
                if (order.items && Array.isArray(order.items)) {
                    return acc + order.items.reduce((itemAcc, item) => {
                        const itemPrice = item.price || 0; // Use 0 if price is not defined
                        const itemQuantity = item.quantity || 0; // Use 0 if quantity is not defined
                        return itemAcc + (itemPrice * itemQuantity);
                    }, 0);
                }
                return acc; // If there are no items, just return accumulated revenue
            }, 0);

            setTotalRevenue(revenue);
            localStorage.setItem('totalRevenue', JSON.stringify(revenue)); // Save revenue to localStorage
        } catch (err) {
            toast.error('Error Fetching orders')
        }
    };

    const contextValue = { list, setList, url, users, setUsers, token, setToken, fetchOrders, ordersList, setOrdersList, totalOrder, totalRevenue ,toggleSidebar,isOpen};
    
    return (
        <AdminContext.Provider value={contextValue}>
            {props.children}
        </AdminContext.Provider>
    );
};

export default AdminContextProvider;
