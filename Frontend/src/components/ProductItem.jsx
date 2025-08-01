import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link to={`/product/${id}`} onClick={() => window.scrollTo(0, 0)} className='block dark:bg-slate-800 rounded-lg overflow-hidden shadow-md'>
      <div className='overflow-hidden'>
        <img className='hover:scale-110 transition-all ease-in-out duration-300' src={image[0]} alt={name} />
      </div>
      <div className='p-3'>
        <p className='pt-3 pb-1 text-sm dark:text-white'>{name}</p>
        <p className='text-sm font-bold dark:text-white'>{currency}{price}</p>
      </div>
    </Link>
  );
}

export default ProductItem;