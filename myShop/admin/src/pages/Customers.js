import React, { useContext, useEffect } from 'react';
import './Customers.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AdminContext } from '../context/adminContext';

const Customers = () => {
  const { users, setUsers, url, token } = useContext(AdminContext);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${url}/api/users/users`);
      if (response) {
        setUsers(response.data.data);
      } else {
        toast.error('Error fetching users');
      }
    } catch (error) {
      toast.error('Error fetching users');
    }
  };

  const removeUser = async (userId) => {
    try {
      const response = await axios.post(`${url}/api/users/remove`, { id: userId }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchData();
      if (response) {
        toast.success(response.data.message);
      }
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message || 'An error occurred. Please try again.');
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='container'>
      <div className='wrapper'>
        <table className='table'>
          <caption>{users.length} Registered Customers</caption>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} style={{ backgroundColor: user.isAdmin ? 'lightgreen' : 'transparent' }}>
                <td data-cell='Name'>{user.name}</td>
                <td data-cell='Email'>{user.email}</td>
                <td data-cell='Role'>{user.role}</td>
                <td data-cell='button'>
                  <button className='remove' onClick={() => removeUser(user._id)}>Block</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Customers;
