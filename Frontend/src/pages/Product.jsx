import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';

const Product = () => {
  const { productId } = useParams();
  const { products, currency } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');

  const fetchProductData = () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
      return null; // Ensure every map function returns something.
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        <div className='flex-1 flex flex-col gap-3 sm:flex-row'> {/* Use flex-row for horizontal layout */}
          {/* Image Thumbnails */}
          <div className='flex sm:flex-col justify-between sm:justify-normal w-full sm:w-[23.5%] '>
            {productData.image.map((item, index) => (
              <img
                src={item}
                key={index}
                className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'
                alt={`Product Thumbnail ${index}`}
                onClick={() => setImage(item)} 
              />
            ))}
          </div>

          {/* Selected Image Display */}
          <div className='w-full '>
            <img className='w-full h-auto' src={image} alt="Selected Product" />
          </div>
        </div>
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-2 mt-2'>
           <img className='w-3 ' src={assets.star_icon} alt="" />
           <img className='w-3 ' src={assets.star_icon} alt="" />
           <img className='w-3 ' src={assets.star_icon} alt="" />
           <img className='w-3 ' src={assets.star_icon} alt="" />
           <img className='w-3 ' src={assets.star_dull_icon} alt="" />
           <p>(1K)</p>
          </div>
          <p></p>

        </div>
      </div>
    </div>
  ) : (
    <div className='opacity-0'></div>
  );
};

export default Product;
