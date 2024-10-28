import React, { useContext, useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const {navigate} = useContext(ShopContext);
  return (
    <div className="flex justify-center py-8 bg-gray-50 min-h-screen">
      <div className="flex flex-col lg:flex-row lg:space-x-10 w-full max-w-7xl px-4 sm:px-8">
        {/* Left Section: Delivery Information */}
        <div className="flex flex-col gap-6 w-full lg:w-3/5 p-6 bg-white rounded-lg shadow-md">
          <div className="text-xl sm:text-2xl">
            <Title text1={'Delivery'} text2={'Information'} />
          </div>
          <div className="flex gap-4">
            <input className="border border-gray-300 rounded-lg px-3 py-2 w-1/2" type="text" placeholder="First Name" />
            <input className="border border-gray-300 rounded-lg px-3 py-2 w-1/2" type="text" placeholder="Last Name" />
          </div>
          <input className="border border-gray-300 rounded-lg px-3 py-2 w-full" type="email" placeholder="Email Address" />
          <input className="border border-gray-300 rounded-lg px-3 py-2 w-full mt-3" type="text" placeholder="Street" />
          <div className="flex gap-4 mt-3">
            <input className="border border-gray-300 rounded-lg px-3 py-2 w-1/2" type="text" placeholder="City" />
            <input className="border border-gray-300 rounded-lg px-3 py-2 w-1/2" type="text" placeholder="State" />
          </div>
          <div className="flex gap-4 mt-3">
            <input className="border border-gray-300 rounded-lg px-3 py-2 w-1/2" type="number" placeholder="Pincode" />
            <input className="border border-gray-300 rounded-lg px-3 py-2 w-1/2" type="text" placeholder="Country" />
          </div>
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
              <div onClick={() => setMethod('strip')} className="flex items-center justify-center w-full sm:w-auto p-4 border border-gray-200 rounded-lg shadow-md cursor-pointer hover:border-blue-500 hover:shadow-lg transition duration-150 ease-in-out">
                <img src={assets.stripe_logo} alt="Stripe Logo" className="h-4 w-auto" />

              </div>

              {/* Razorpay Payment Option */}
              <div onClick={() => setMethod('razorpay')} className="flex items-center justify-center w-full sm:w-auto p-4 border border-gray-200 rounded-lg shadow-md cursor-pointer hover:border-blue-500 hover:shadow-lg transition duration-150 ease-in-out">
                <img src={assets.razorpay_logo} alt="Razorpay Logo" className="h-4 w-auto" />

              </div>

              {/* Cash on Delivery Option */}
              <div onClick={() => setMethod('cod')} className="flex items-center justify-center w-full sm:w-auto p-2 border border-gray-200 rounded-lg shadow-md cursor-pointer hover:border-blue-500 hover:shadow-lg transition duration-150 ease-in-out">
                {/* Icon for Cash on Delivery */}
                <p className="ml-2 font-semibold text-sm">Cash on Delivery</p>
              </div>
            </div>
            <div className='w-full text-end mt-8'>
              <button onClick={()=> navigate('/order')} className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
