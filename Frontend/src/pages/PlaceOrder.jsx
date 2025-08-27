import React, { useContext, useState, useEffect } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const [showForm, setShowForm] = useState(false); // toggle add form
  const [selectedAddress, setSelectedAddress] = useState(null); // active address
  const [changeInaddress, setChangeInaddress] = useState(false);

  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products, addresses, setAddresses } = useContext(ShopContext);

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

  // fetch addresses on mount
  useEffect(() => {
    console.log(addresses);
    const fetchAddresses = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/address/get`, { headers: { token } });
        if (data.success) {
          setAddresses(data.address || []);
          toast.success(data.message);
        }
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      }
    };
    fetchAddresses();
  }, [changeInaddress]);


  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // save new address
  const saveAddressHandler = async () => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/address/add`, { address: formData }, { headers: { token } });
      console.log(data, "nitin");
      if (data.success) {
        setAddresses(prev => [...prev, formData]);
        setChangeInaddress(!changeInaddress);
        toast.success("Address saved successfully");
        setShowForm(false);
        setFormData({
          firstName: '', lastName: '', email: '', street: '', city: '', state: '',
          zipcode: '', country: '', phone: ''
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to save address");
    }
  };

  // remove address
  const removeAddressHandler = async (address) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/address/remove`, { address }, { headers: { token } });
      console.log(address)
      if (data.success) {
        setChangeInaddress(!changeInaddress);
        setAddresses(addresses.filter(a => a._id !== address._id));
        toast.success("Address removed");
      }
      console.log('N');
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove address");
    }
  };

  // payment integration
  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Order Payment',
      description: 'Order Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        response.mongoOrderId = order.receipt;
        try {
          const { data } = await axios.post(`${backendUrl}/api/order/verifyRazorpay`, response, { headers: { token } });
          if (data.success) {
            setCartItems({});
            toast.success(data.message);
            navigate('/order');
          }
        } catch (error) {
          console.error(error);
          toast.error("Payment verification failed");
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // place order
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

      if (!selectedAddress) {

        toast.error("Please select a delivery address");
        return;
      }
      console.log(selectedAddress);
      const orderData = {
        address: selectedAddress,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      };

      switch (method) {
        case 'cod': {
          const response = await axios.post(`${backendUrl}/api/order/place`, orderData, { headers: { token } });
          if (response.data.success) {
            setCartItems({});
            toast.success(response.data.message);
            navigate('/order');
          } else {
            toast.error(response.data.message);
          }
          break;
        }
        case 'razorpay': {
          const responseRazorpay = await axios.post(`${backendUrl}/api/order/razorpay`, orderData, { headers: { token } });
          if (responseRazorpay.data.success) {
            initPay(responseRazorpay.data.order);
          } else {
            toast.error("Razorpay payment failed");
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
    <form onSubmit={onSubmitHandler} className="flex justify-center py-8 bg-gray-50 min-h-screen dark:bg-slate-800">
      <div className="flex flex-col lg:flex-row lg:space-x-10 w-full max-w-7xl px-4 sm:px-8">

        {/* Left Section: Address Management */}
        <div className="flex flex-col gap-6 w-full lg:w-3/5 p-6 bg-white rounded-lg shadow-md dark:bg-slate-700">
          <div className="text-xl sm:text-2xl px-3">
            <Title text1={'Delivery'} text2={'Address'} />
          </div>

          {/* Address List */}
          {addresses.length > 0 && (
            <div className="space-y-4">
              {addresses.map((addr) => (
                <div onClick={() => setSelectedAddress(addr)}
                  key={addr}
                  className={`p-4 border rounded-sm flex justify-between items-center cursor-pointer 
        ${selectedAddress == addr
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300"}`}

                >
                  <div>
                    <p className="font-semibold ">
                      {addr.firstName} {addr.lastName}
                    </p>
                    <p className="text-sm">
                      {addr.street}, {addr.city}, {addr.state}, {addr.zipcode}, {addr.country}
                    </p>
                    <p className="text-sm">Phone: {addr.phone}</p>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeAddressHandler(addr);
                      // agar selectedAddress remove ho raha hai to reset karo
                      if (selectedAddress === addr) {
                        setSelectedAddress(null);
                      }
                    }}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Add New Address */}
          {!showForm && (
            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md w-max"
            >
              + Add New Address
            </button>
          )}

          {showForm && (
            <div className="space-y-3">
              <input required onChange={onChangeHandler} name="firstName" value={formData.firstName} className="border rounded-lg px-3 py-2 w-full" placeholder="First Name" />
              <input required onChange={onChangeHandler} name="lastName" value={formData.lastName} className="border rounded-lg px-3 py-2 w-full" placeholder="Last Name" />
              <input required onChange={onChangeHandler} name="email" value={formData.email} className="border rounded-lg px-3 py-2 w-full" placeholder="Email" />
              <input required onChange={onChangeHandler} name="street" value={formData.street} className="border rounded-lg px-3 py-2 w-full" placeholder="Street" />
              <input required onChange={onChangeHandler} name="city" value={formData.city} className="border rounded-lg px-3 py-2 w-full" placeholder="City" />
              <input required onChange={onChangeHandler} name="state" value={formData.state} className="border rounded-lg px-3 py-2 w-full" placeholder="State" />
              <input required onChange={onChangeHandler} name="zipcode" value={formData.zipcode} className="border rounded-lg px-3 py-2 w-full" placeholder="Zipcode" />
              <input required onChange={onChangeHandler} name="country" value={formData.country} className="border rounded-lg px-3 py-2 w-full" placeholder="Country" />
              <input required onChange={onChangeHandler} name="phone" value={formData.phone} className="border rounded-lg px-3 py-2 w-full" placeholder="Phone" />
              <div className="flex gap-4">
                <button type="button" onClick={saveAddressHandler} className="bg-green-500 text-white px-4 py-2 rounded-md">Save</button>
                <button type="button" onClick={() => setShowForm(false)} className="bg-gray-400 text-white px-4 py-2 rounded-md">Cancel</button>
              </div>
            </div>
          )}
        </div>

        {/* Right Section: Cart + Payment */}
        <div className="flex flex-col gap-6 w-full lg:w-2/5 p-6 bg-white rounded-lg shadow-md mt-8 lg:mt-0 dark:bg-slate-700">
          <CartTotal />
          <div className="text-xl sm:text-2xl p-4">
            <Title text1={'Payment'} text2={'Method'} />

            <div className="flex flex-col sm:flex-row gap-4 mt-4">
                {/* Razorpay Payment Option */}
              <div
                onClick={() => setMethod("razorpay")}
                className={`flex items-center justify-center w-full sm:w-auto p-4  border-[2px] rounded-lg shadow-md cursor-pointer transition duration-150 ease-in-out 
      ${method === "razorpay"
                    ? "bg-gray-300 text-black border-blue-800 shadow-lg  dark:bg-slate-600 dark:border-blue-600 dark:text-white"
                    : "border-gray-200 hover:border-blue-500 hover:shadow-lg dark:border-slate-600 dark:hover:border-blue-400 dark:bg-slate-600"
                  }`}
              >
                <img src={assets.razorpay_logo} alt="Razorpay Logo" className="h-4 w-auto dark:bg-slate-600 " />
              </div>

              {/* Cash on Delivery Option */}
              <div
                onClick={() => setMethod("cod")}
                className={`flex items-center justify-center w-full sm:w-auto p-4 border-[2px] rounded-lg shadow-md cursor-pointer transition duration-150 ease-in-out 
      ${method === "cod"
                    ? "bg-slate-300 text-black border-blue-800 shadow-lg dark:bg-slate-600 dark:text-white dark:border-blue-600"
                    : "border-slate-200 hover:border-blue-500 hover:shadow-lg dark:border-slate-600 dark:hover:border-blue-400 dark:bg-slate-600"
                  }`}
              >
                <p className="ml-2 font-semibold text-sm dark:text-white dark:bg-slate-600 ">Cash on Delivery</p>
              </div>
            </div>


            <div className="w-full text-end mt-8">
              <button type="submit" className="bg-black text-white px-16 py-3 text-sm hover:bg-slate-700 dark:bg-gray-600 hover:dark:bg-slate-700 dark:border-slate-600 dark:hover:border-blue-400 dark:text-white dark:border-w-6 ">PLACE ORDER</button>
            </div>
          </div>
        </div>
      </div>
    </form >
  );
};

export default PlaceOrder;