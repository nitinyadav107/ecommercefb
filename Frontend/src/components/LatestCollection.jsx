import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';
import { Oval } from 'react-loader-spinner';

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  console.log(products);

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
          Unveil the season’s freshest styles with our Latest Collection, designed to keep you ahead in fashion. From timeless classics to bold new trends, find pieces that truly define you.
        </p>
      </div>
      {/* Rendering products */}
      {
        latestProducts.length > 0 ?
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
          </div> : <div className='flex items-center justify-center'>
            <Oval
              height={40}
              width={40}
              color="#4fa94d"
              wrapperStyle={{}}
              wrapperClass="spinner-border text-primary"
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#FFFFFF"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          </div>
      }
    </div>
  );
}

export default LatestCollection;