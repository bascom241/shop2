import React, { useEffect, useContext } from 'react';
import './Inventory.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AdminContext } from '../context/adminContext';

const Inventory = () => {
  const { list, setList, url, token } = useContext(AdminContext);

  const fetchItems = async () => {
    try {
      const response = await axios.get(`${url}/api/products`);
      if (response) {
        setList(response.data.products);
      } else {
        toast.error('Error Fetching Products');
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleRemoveProduct = async (productId) => {
    try {
      if (token) {
        const response = await axios.delete(`${url}/api/${productId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response) {
          await fetchItems();
          toast.success('Product removed');
        } else {
          toast.error('Error');
        }
      }
    } catch (err) {
      toast.error('Error');
    }
  };

  return (
    <div className="inventory-container">
      <div className="inventory-wrapper">
        <table className="inventory-table">
          <caption>{list.length} Products available</caption>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Color</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {list.map((product, index) => (
              <tr key={index}>
                <td data-cell="image">
                  <img className="product-image" src={product.image} alt={product.name} />
                </td>
                <td data-cell="name">{product.name}</td>
                <td data-cell="description">{product.description}</td>
                <td data-cell="price">#{product.price}</td>
                <td data-cell="color">{product.color}</td>
                <td data-cell="button">
                  <button className="remove-button" onClick={() => handleRemoveProduct(product._id)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;
