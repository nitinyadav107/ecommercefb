import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {
  const { products } = useContext(ShopContext);

  const [latestProducts, setlatestProducts] = useState([]);

  useEffect(() => {
    const latest = products.slice(0, 10);
    setlatestProducts(latest);
  }, [products]);

  return (
    <div className='my-10 dark:text-white dark:bg-slate-800'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={'LATEST'} text2={'COLLECTION'} />
        <p className='text-center text-gray-500 dark:text-gray-400'>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt molestias blanditiis distinctio facere sunt accusamus voluptatum sapiente quos,
        </p>
      </div>
      {/* Rendering products */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
          latestProducts.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))
        }
      </div>
    </div>
  );
}

export default LatestCollection;