import React, { useEffect, useContext } from 'react';
import './Orders.css';
import { AdminContext } from '../context/adminContext';

const Orders = () => {
  const { fetchOrders, ordersList } = useContext(AdminContext);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <div className='container'>
      <div className='wrapper'>
        <table className='orders-table'>
          <caption>{ordersList.length} Orders available</caption>
          <thead>
            <tr className='heading'>
              <th>Customer Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Payment Status</th>
              <th>Items</th>
            </tr>
          </thead>
          <tbody>
            {ordersList.map(order => (
              <tr key={order._id}>
                <td data-cell='customer-name'>{order.customerDetails.firstname} {order.customerDetails.lastname}</td>
                <td data-cell='email'>{order.customerDetails.email}</td>
                <td data-cell='address'>{order.customerDetails.street}, {order.customerDetails.city}</td>
                <td data-cell='payment-status'>{order.paymentStatus}</td>
                <td data-cell='items'>
                  <ul>
                    {order.items.map(item => (
                      <li key={item.productId}>
                        {item.name} (Price: {item.price}, Quantity: {item.quantity})
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;
