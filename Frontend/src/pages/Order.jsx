import  { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';

const Order = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }
      const response = await axios.post(backendUrl + '/api/order/userorders', {}, {
        headers: { token }
      });
      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentMethod;
            item['date'] = order.date;
            allOrdersItem.push(item);
          });
        });
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, []);

  return (
    <div className='border-t pt-16 dark:text-white dark:bg-slate-800'>
      <div className='text-2xl dark:text-white'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>
      <div>
        {
          orderData.map((item, index) => (
            <div key={index} className='py-4 border-t border-b text-gray-700 dark:text-white dark:bg-slate-800 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <div className='flex items-start gap-6 text-sm'>
                <img className='w-16 sm:w-20 dark:text-white' src={item.image[0]} alt="Product" />
                <div>
                  <p className='sm:text-base font-medium dark:text-white'>{item.name}</p>
                  <div className='flex items-center gap-3 mt-2 text-base text-gray-700 dark:text-gray-300'>
                    <p>{currency}{item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p className='mt-2 dark:text-white'>Date: <span className='text-gray-400 dark:text-gray-500'>{new Date(item.date).toDateString()}</span></p>
                  <p className='mt-2 dark:text-white'>Payment Method: <span className='text-gray-400 dark:text-gray-500'>{item.paymentMethod}</span></p>
                </div>
              </div>
              <div className='md:w-1/2 flex justify-between'>
                <div className='flex items-center gap-2'>
                  <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                  <p className='text-sm md:text-base dark:text-white'>{item.status}</p>
                </div>
                <button onClick={loadOrderData} className='border px-4 py-2 text-sm font-medium rounded-sm dark:border-white dark:bg-slate-800 dark:text-white'>Track Order</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Order;