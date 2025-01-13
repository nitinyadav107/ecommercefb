import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item]
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  return (
    <div className='border-t pt-14 dark:text-white dark:bg-slate-800'>
      <div className='text-2xl mb-3 dark:text-white'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>
      <div>
        {cartData.length > 0 ? (
          cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id);

            return (
              <div key={index} className='flex justify-between items-center border-b py-3 dark:text-white dark:bg-slate-800'>
                <div className='flex items-center'>
                  <img src={productData?.image[0]} alt={productData?.title} className='w-20 h-20 mr-3' />
                  <div>
                    <h2 className='text-lg font-semibold dark:text-white'>{productData?.name}</h2>
                    <p className='text-sm text-gray-500 dark:text-gray-400'>Size: {item.size}</p>
                    <label className='text-sm text-gray-500 dark:text-gray-400'>
                      Quantity:
                      <input onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))}
                        type="number"
                        min={1}
                        max={100}
                        className='ml-2 w-24 rounded px-2 py-1 dark:text-black'
                        defaultValue={item.quantity}
                      />
                    </label>
                  </div>
                </div>
                <div className='flex gap-4 sm:gap-14 text-right top-0 bottom-0 dark:text-white'>
                  <p className='text-lg font-semibold dark:text-white'>
                    {currency}
                    {productData ? (productData.price * item.quantity).toFixed(2) : 'N/A'}
                  </p>
                  <img onClick={() => updateQuantity(item._id, item.size, 0)} className='w-5 h-5 mr-4 sm:w-5 cursor-pointer dark:text-white dark:bg-slate-800' src={assets.bin_icon} alt="Delete Icon" />
                </div>
              </div>
            );
          })
        ) : (
          <p className='text-center text-lg dark:text-white'>Your cart is empty.</p>
        )}
      </div>
      <div className='flex flex-col justify-end my-20 dark:text-white dark:bg-slate-800'>
        <div className='w-full sm:w-[450px] text-end dark:text-white dark:bg-slate-800'>
          <CartTotal />
        </div>
        <div className='w-full mt-5 text-end sm:w-[450px] dark:text-white dark:bg-slate-800'>
          <button className='bg-black text-white px-8 py-3 rounded-full dark:bg-gray-700 dark:text-white' onClick={() => navigate('/place-order')}>PROCEED TO CHECKOUT</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;