import React, { useContext, useState, useEffect } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  });

  useEffect(() => {
    // Load previously saved data from localStorage if available
    const savedData = JSON.parse(localStorage.getItem('orderFormData'));
    if (savedData) {
      setFormData(savedData);
    }
  }, []);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];

      for (const productId in cartItems) {
        for (const size in cartItems[productId]) {
          if (cartItems[productId][size] > 0) {
            const itemInfo = JSON.parse(JSON.stringify(products.find(product => product._id === productId)));
            if (itemInfo) {
              itemInfo.quantity = cartItems[productId][size];
              itemInfo.size = size;
              orderItems.push(itemInfo);
            }
          }
        }
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      };

      switch (method) {
        case 'cod': {
          const response = await axios.post(`${backendUrl}/api/order/place`, orderData, { headers: { token } });
          if (response.data.success) {
            // Save data to localStorage upon successful order placement
            localStorage.setItem('orderFormData', JSON.stringify(formData));
            setCartItems({});
            navigate('/order');
          } else {
            toast.error(response.data.message);
          }
          break;
        }
        case 'stripe': {
          try {
            const responseStripe = await axios.post(`${backendUrl}/api/order/stripe`, orderData, {
              headers: { token }
            });
        
            if (responseStripe.data.success) {
              const { session_url } = responseStripe.data;
              window.location.replace(session_url);
            } else {
              toast.error(responseStripe.data.message);
              console.log(responseStripe.data.message);
            }
          } catch (error) {
            console.error("Error with Stripe payment request:", error);
            toast.error("Failed to initiate Stripe payment.");
          }
          break;
        }
        
        default:
          toast.error('Payment method not supported.');
          break;
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to place order. Please try again.');
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex justify-center py-8 bg-gray-50 min-h-screen">
      <div className="flex flex-col lg:flex-row lg:space-x-10 w-full max-w-7xl px-4 sm:px-8">
        {/* Left Section: Delivery Information */}
        <div className="flex flex-col gap-6 w-full lg:w-3/5 p-6 bg-white rounded-lg shadow-md">
          <div className="text-xl sm:text-2xl">
            <Title text1={'Delivery'} text2={'Information'} />
          </div>
          <div className="flex gap-4">
            <input required onChange={onChangeHandler} name="firstName" value={formData.firstName} className="border border-gray-300 rounded-lg px-3 py-2 w-1/2" type="text" placeholder="First Name" />
            <input required onChange={onChangeHandler} name="lastName" value={formData.lastName} className="border border-gray-300 rounded-lg px-3 py-2 w-1/2" type="text" placeholder="Last Name" />
          </div>
          <input required onChange={onChangeHandler} name="email" value={formData.email} className="border border-gray-300 rounded-lg px-3 py-2 w-full" type="text" placeholder="Email Address" />
          <input required onChange={onChangeHandler} name="street" value={formData.street} className="border border-gray-300 rounded-lg px-3 py-2 w-full mt-3" type="text" placeholder="Street" />
          <div className="flex gap-4 mt-3">
            <input required onChange={onChangeHandler} name="city" value={formData.city} className="border border-gray-300 rounded-lg px-3 py-2 w-1/2" type="text" placeholder="City" />
            <input required onChange={onChangeHandler} name="state" value={formData.state} className="border border-gray-300 rounded-lg px-3 py-2 w-1/2" type="text" placeholder="State" />
          </div>
          <div className="flex gap-4 mt-3">
            <input required onChange={onChangeHandler} name="zipcode" value={formData.zipcode} className="border border-gray-300 rounded-lg px-3 py-2 w-1/2" type="number" placeholder="Pincode" />
            <input required onChange={onChangeHandler} name="country" value={formData.country} className="border border-gray-300 rounded-lg px-3 py-2 w-1/2" type="text" placeholder="Country" />
          </div>
          <input required onChange={onChangeHandler} name="phone" value={formData.phone} className="border border-gray-300 rounded-lg px-3 py-2 w-1/2" type="text" placeholder="Phone" />
        </div>

        {/* Right Section: Cart Total and Payment Method */}
        <div className="flex flex-col gap-6 w-full lg:w-2/5 p-6 bg-white rounded-lg shadow-md mt-8 lg:mt-0">
          <div>
            <CartTotal />
          </div>
          <div>
            <Title text1={'Payment'} text2={'Method'} />
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              {/* Stripe Payment Option */}
              <div onClick={() => setMethod('stripe')} className="flex items-center justify-center w-full sm:w-auto p-4 border border-gray-200 rounded-lg shadow-md cursor-pointer hover:border-blue-500 hover:shadow-lg transition duration-150 ease-in-out">
                <img src={assets.stripe_logo} alt="Stripe Logo" className="h-4 w-auto" />
              </div>

              {/* Razorpay Payment Option */}
              <div onClick={() => setMethod('razorpay')} className="flex items-center justify-center w-full sm:w-auto p-4 border border-gray-200 rounded-lg shadow-md cursor-pointer hover:border-blue-500 hover:shadow-lg transition duration-150 ease-in-out">
                <img src={assets.razorpay_logo} alt="Razorpay Logo" className="h-4 w-auto" />
              </div>

              {/* Cash on Delivery Option */}
              <div onClick={() => setMethod('cod')} className="flex items-center justify-center w-full sm:w-auto p-2 border border-gray-200 rounded-lg shadow-md cursor-pointer hover:border-blue-500 hover:shadow-lg transition duration-150 ease-in-out">
                <p className="ml-2 font-semibold text-sm">Cash on Delivery</p>
              </div>
            </div>
            <div className="w-full text-end mt-8">
              <button type="submit" className="bg-black text-white px-16 py-3 text-sm hover:bg-gray-700">PLACE ORDER</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
