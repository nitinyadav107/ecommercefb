
import  { useContext, useState, useEffect } from 'react';
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
  const initPay = (order, orderData) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Order Payment',
      description: 'Order Payment',
      order_id: order.id,
      handler: async (response) => {
        try {
          // Prepare the payload for verification
          const verifyPayload = {
            response: {
              razorpay_order_id: response.order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            },
            orderData,
          };
  
          // Send the payload to the backend for verification
          const { data } = await axios.post(`${backendUrl}/api/order/verifyRazorpay`, verifyPayload, {
            headers: { token },
          });
  
          if (data.success) {
            setCartItems({});
            toast.success(data.message);
            navigate('/order');
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          console.error('Error during payment verification:', error);
          toast.error('Payment verification failed.');
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  
  
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];
  
      // Prepare order items
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
        amount: getCartAmount() + delivery_fee,
      };
  
      switch (method) {
        case 'cod': {
          const response = await axios.post(`${backendUrl}/api/order/place`, orderData, { headers: { token } });
          if (response.data.success) {
            console.log(orderData);
            localStorage.setItem('orderFormData', JSON.stringify(formData));
            setCartItems({});
            toast(response.data.message);
            navigate('/order');
          } else {
            toast.error(response.data.message);
          }
          break;
        }
        case 'razorpay': {
          try {
            // Send order data to create Razorpay order
            const responseRazorpay = await axios.post(`${backendUrl}/api/order/razorpay`, orderData, {
              headers: { token },
            });
  
            if (responseRazorpay.data.success) {
              console.log(responseRazorpay.data.order);
              initPay(responseRazorpay.data.order, orderData);
            } else {
              toast.error('Failed to create Razorpay order.');
            }
          } catch (error) {
            console.error('Error with Razorpay payment request:', error);
            toast.error('Failed to initiate Razorpay payment.');
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
    <form onSubmit={onSubmitHandler} className="flex justify-center py-8 bg-gray-50 min-h-screen dark:bg-slate-800" >
      <div className="flex flex-col lg:flex-row lg:space-x-10 w-full max-w-7xl px-4 sm:px-8">
        {/* Left Section: Delivery Information */}
        <div className="flex flex-col gap-6 w-full lg:w-3/5 p-6 bg-white rounded-lg shadow-md dark:bg-slate-700">
          <div className="text-xl sm:text-2xl">
            <Title text1={'Delivery'} text2={'Information'} />
          </div>
          <div className="flex gap-4">
            <input required onChange={onChangeHandler} name="firstName" value={formData.firstName} className="border border-gray-300 rounded-lg px-3 py-2 w-1/2 dark:bg-slate-800 dark:border-slate-600 dark:text-white" type="text" placeholder="First Name" />
            <input required onChange={onChangeHandler} name="lastName" value={formData.lastName} className="border border-gray-300 rounded-lg px-3 py-2 w-1/2 dark:bg-slate-800 dark:border-slate-600 dark:text-white" type="text" placeholder="Last Name" />
          </div>
          <input required onChange={onChangeHandler} name="email" value={formData.email} className="border border-gray-300 rounded-lg px-3 py-2 w-full dark:bg-slate-800 dark:border-slate-600 dark:text-white" type="text" placeholder="Email Address" />
          <input required onChange={onChangeHandler} name="street" value={formData.street} className="border border-gray-300 rounded-lg px-3 py-2 w-full mt-3 dark:bg-slate-800 dark:border-slate-600 dark:text-white" type="text" placeholder="Street" />
          <div className="flex gap-4 mt-3">
            <input required onChange={onChangeHandler} name="city" value={formData.city} className="border border-gray-300 rounded-lg px-3 py-2 w-1/2 dark:bg-slate-800 dark:border-slate-600 dark:text-white" type="text" placeholder="City" />
            <input required onChange={onChangeHandler} name="state" value={formData.state} className="border border-gray-300 rounded-lg px-3 py-2 w-1/2 dark:bg-slate-800 dark:border-slate-600 dark:text-white" type="text" placeholder="State" />
          </div>
          <div className="flex gap-4 mt-3">
            <input required onChange={onChangeHandler} name="zipcode" value={formData.zipcode} className="border border-gray-300 rounded-lg px-3 py-2 w-1/2 dark:bg-slate-800 dark:border-slate-600 dark:text-white" type="number" placeholder="Pincode" />
            <input required onChange={onChangeHandler} name="country" value={formData.country} className="border border-gray-300 rounded-lg px-3 py-2 w-1/2 dark:bg-slate-800 dark:border-slate-600 dark:text-white" type="text" placeholder="Country" />
          </div>
          <div className="flex gap-4 mt-3">
            <input required onChange={onChangeHandler} name="phone" value={formData.phone} className="border border-gray-300 rounded-lg px-3 py-2 w-1/2 dark:bg-slate-800 dark:border-slate-600 dark:text-white" type="text" placeholder="Phone" />
          </div>

        </div>

        {/* Right Section: Cart Total and Payment Method */}
        <div className="flex flex-col gap-6 w-full lg:w-2/5 p-6 bg-white rounded-lg shadow-md mt-8 lg:mt-0 dark:bg-slate-700">
          <div>
            <CartTotal />
          </div>
          <div>
            <Title text1={'Payment'} text2={'Method'} />
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
          

              {/* Razorpay Payment Option */}
              <div onClick={() => setMethod('razorpay')} className={`flex items-center justify-center w-full sm:w-auto p-4 border rounded-lg shadow-md cursor-pointer transition duration-150 ease-in-out 
        ${method === "razorpay" ? "bg-slate-300 border-slate-800 shadow-lg" : "border-gray-200 hover:border-blue-500 hover:shadow-lg dark:border-slate-600"}`}>
                <img src={assets.razorpay_logo} alt="Razorpay Logo" className="h-4 w-auto" />
              </div>

              {/* Cash on Delivery Option */}
              <div onClick={() => setMethod('cod')} className={`flex items-center justify-center w-full sm:w-auto p-4 border rounded-lg shadow-md cursor-pointer transition duration-150 ease-in-out 
        ${method === "cod" ? "bg-slate-300 text-black border-slate-800 shadow-lg" : "border-gray-200 hover:border-blue-500 hover:shadow-lg dark:border-slate-600"}`}>
                <p className="ml-2 font-semibold text-sm dark:text-white">Cash on Delivery</p>
              </div>
            </div>
            <div className="w-full text-end mt-8">
              <button type="submit" className="bg-black text-white px-16 py-3 text-sm hover:bg-gray-700 dark:bg-gray-600 hover:dark:bg-gray-800 dark:text-white">PLACE ORDER</button>
            </div>
          </div>
        </div>
      </div>
    </form >
  );
};

export default PlaceOrder;