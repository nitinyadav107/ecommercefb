import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import {toast} from 'react-hot-toast';
import { assets } from '../assets/assets';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return null;

    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const statusHandler=async (event ,orderId)=>{
    try{
      const response = await axios.post(backendUrl + "/api/order/status",{orderId,status:event.target.value},{headers:{token}})
      if(response.data.success){
        await fetchAllOrders();
      }
    
    }
    catch(error){
      console.log(error)
      toast.error(response.data.message);
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="px-4 py-8 mx-auto max-w-7xl">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">Order Page</h3>
      <div className="space-y-6">
        {orders.map((order, index) => (
          <div
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-4 items-start border border-gray-200 rounded-lg shadow-lg p-5 md:p-8 bg-white"
            key={index}
          >
            <img className="w-12 h-12 object-cover rounded-full" src={assets.parcel_icon} alt="" />
            
            <div className="col-span-2">
              <div className="text-lg font-semibold text-gray-900 mb-2">
                {order.items.map((item, idx) => (
                  <span key={idx} className="py-0.5">{item.name}{idx < order.items.length - 1 && ','} </span>
                ))}
              </div>
            </div>
            
            <div className="text-sm text-gray-600">
              <p className="font-semibold">{order.address.firstName + " " + order.address.lastName}</p>
              <div className="leading-tight">
                <p>{order.address.street},</p>
                <p>{order.address.city}, {order.address.country}, {order.address.zipcode}</p>
              </div>
              <p>📞 {order.address.phone}</p>
            </div>
            
            <div className="text-sm text-gray-600 space-y-1">
              <p><span className="font-semibold">Items:</span> {order.items.length}</p>
              <p><span className="font-semibold">Method:</span> {order.paymentMethod}</p>
              <p><span className="font-semibold">Payment:</span> {order.payment ? 'Done' : 'Pending'}</p>
              <p><span className="font-semibold">Date:</span> {new Date(order.date).toLocaleDateString()}</p>
            </div>
            
            <p className="text-lg font-semibold text-gray-800">{currency}{order.amount}</p>
            
            <div className="col-span-full lg:col-span-1">
              <select onChange={(event)=>statusHandler(event,order._id)} value={order.status} className="w-full bg-gray-100 border border-gray-300 rounded-md p-2 text-gray-600">
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
