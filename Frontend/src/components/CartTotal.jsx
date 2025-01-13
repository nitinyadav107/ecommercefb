import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
  
  return (
    <div className='w-full dark:text-white dark:bg-slate-800 p-4 rounded-md'>
      <div className='text-2xl'>
        <Title text1={'CART'} text2={'TOTALS'} />
      </div>
      <div className='flex flex-col gap-2 mt-2 text-sm dark:text-gray-300'>
        <div className='flex justify-between'>
          <p>Subtotal</p>
          <p>{currency}{getCartAmount()}.00</p>
        </div>
        <hr className='border-gray-300 dark:border-gray-600' />
        <div className='flex justify-between'>
          <p>Delivery fee</p>
          <p>{currency} {delivery_fee}.00</p>
        </div>
        <hr className='border-gray-300 dark:border-gray-600' />
        <div className='flex justify-between'>
          <p>Total</p>
          <b>{currency}{getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}.00</b>
        </div>
      </div>
    </div>
  );
}

export default CartTotal;