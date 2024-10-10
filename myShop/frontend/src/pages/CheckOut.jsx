import React, { useContext, useState } from 'react'
import './CheckOut.css'
import { ShopContext } from '../components/context/shopContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
const CheckOut = () => {


  const navigate = useNavigate();
  const { cartTotalPrice, cart, userId, token,url,setCart } = useContext(ShopContext)



  const [customerDetails, setCustomerDetails] = useState({
    firstname: '',
    lastname: '',
    email: '',
    street: '',
    city: '',
    state: '',
    poastal: '',
    country: '',
    phone: ''

  })

  let cartTotal = cartTotalPrice 

  let DeliveryQuantity = cart.map(c => c.quantity).reduce((acc, item) => acc + item, 0)


  const calculateDeliveryFee = (quantity) => {
    if (quantity > 2) {
      return 40 * quantity
    } else {
      return 50 * quantity
    }
  }

  let DeliveryFee = calculateDeliveryFee(DeliveryQuantity)

  const handleCustomerDetailsChange = (evt) => {
    const { name, value } = evt.target;
    setCustomerDetails((prev) => {
      return {
        ...prev, [name]: value
      }
    })
  }

  const handlePayment = () => {
    if (!window.PaystackPop) {
      toast.error('Please check your internet connection.');
      return;
    }
    const paystackHandler = window.PaystackPop.setup({
      key: 'pk_live_386aeb6861a9ab587cc40236781dde8fd72329b8',
      email: customerDetails.email,
      amount: (cartTotal + DeliveryFee) * 100,
      currency: 'NGN',
      callback: function (response) {
        // Paystack returns a reference on successful payment
        toast.success(`Payment successful! Reference: ${response.reference}`);
        console.log(response.reference)

        // Call the backend to verify the payment
        verifyPayment(response.reference);
      },
      onClose: function () {
        toast.error('Transaction was not completed.');
      },
    });

    // Open the Paystack payment modal
    paystackHandler.openIframe();
  };



  const verifyPayment = async (reference) => {

    if(!customerDetails){
      toast.error('Inavlid Details provided')
    }

    try {
      const response = await axios.post(`${url}/api/order/verify-payment`, {
        reference,
        userId, // Assuming userId is available in the context
        cart,
        customerDetails,
        cartTotal,
        DeliveryFee,
      },  {
        headers: { Authorization: `Bearer ${token}` }
        
    });
      if (response) {
        toast.success('Payment verified successfully and order created.');
        // Optionally redirect or perform further actions here
        setCart([]);
        setCustomerDetails('');
        navigate(`/thank-you/${userId}`)

      } else {
        toast.error('Payment verification failed.');
      }
    } catch (err) {
      console.log('Error verifying payment:', err.message);
      toast.error(err.message);
    }
  };

  return (
    <div className='check-out-container'>
      <div>
        <h1 className='delivery-h2'>Delivery Information</h1>
        <form className='delivery-form-container'>
          <div>
            <input
              placeholder='Firstname'
              type='text'
              value={customerDetails.firstname}
              name='firstname'
              onChange={handleCustomerDetailsChange}
            />
            <input
              type='text'
              placeholder='Lastname'
              value={customerDetails.lastname}
              name='lastname'
              onChange={handleCustomerDetailsChange}
            />

          </div>
          <input
            type='email'
            placeholder='Email Address'
            value={customerDetails.email}
            name='email'
            onChange={handleCustomerDetailsChange}
          />
          <input
            type='text'
            placeholder='Street'
            value={customerDetails.street}
            name='street'
            onChange={handleCustomerDetailsChange}
          />
          <div>
            <input
              type='text'
              placeholder='City'
              value={customerDetails.city}
              name='city'
              onChange={handleCustomerDetailsChange}
            />
            <input
              type='text'
              placeholder='State'
              value={customerDetails.state}
              name='state'
              onChange={handleCustomerDetailsChange}
            />
          </div>

          <div>
            <input
              type='number'
              placeholder='Zip Code'
              value={customerDetails.poastal}
              name='poastal'
              onChange={handleCustomerDetailsChange}

            />
            <input
              type='text'
              placeholder='Country'
              name='country'
              value={customerDetails.country}
              onChange={handleCustomerDetailsChange}
            />
          </div>
          <input
            type='number'
            placeholder='Phone Number'
            value={customerDetails.phone}
            name='phone'
            onChange={handleCustomerDetailsChange}

          />

        </form>
      </div>
      <div className='cart-tools-container'>
        <h1>Cart Tools</h1>
        <div>
          <p>SubTotal</p>
          <p>{cart.length ? cartTotal : 0}</p>
        </div>
        <hr />
        <div>
          <p>Delivery Fee</p>
          <p> {cart.length ?  DeliveryFee : 0}</p>
        </div>
        <hr />
        <div>
          <p>Total</p>
          <p>{cart.length ? cartTotal + DeliveryFee : 0}</p>
        </div>

        <button className='payment-btn' onClick={handlePayment} type='submit'>Proceed To Payment</button>
      </div>
    </div>
  )
}

export default CheckOut
