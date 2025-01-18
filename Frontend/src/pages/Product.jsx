import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProduct from '../components/RelatedProduct';

const Product = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { products, currency, addToCart,token } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  

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
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 mb-5 dark:text-white dark:bg-slate-800'>
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        <div className='flex-1 flex flex-col gap-3 sm:flex-row'> {/* Use flex-row for horizontal layout */}
          {/* Image Thumbnails */}
          <div className='flex sm:flex-col justify-between sm:justify-normal w-full sm:w-[23.5%]'>
            {productData.image.map((item, index) => (
              <img
                src={item}
                key={index}
                className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer dark:text-white'
                alt={`Product Thumbnail ${index}`}
                onClick={() => setImage(item)}
              />
            ))}
          </div>

          {/* Selected Image Display */}
          <div className='w-full'>
            <img className='w-full h-auto dark:text-white' src={image} alt="Selected Product" />
          </div>
        </div>
        <div className='flex-1 dark:text-white'>
          <h1 className='font-medium text-2xl mt-2 dark:text-white'>{productData.name}</h1>
          <div className='flex items-center gap-2 mt-2'>
            <img className='w-3 dark:text-white' src={assets.star_icon} alt="" />
            <img className='w-3 dark:text-white' src={assets.star_icon} alt="" />
            <img className='w-3 dark:text-white' src={assets.star_icon} alt="" />
            <img className='w-3 dark:text-white' src={assets.star_icon} alt="" />
            <img className='w-3 dark:text-white' src={assets.star_dull_icon} alt="" />
            <p>(1k)</p>
          </div>
          <p className='text-sm font-bold dark:text-white'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5 dark:text-gray-400'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p className='dark:text-white'>Select Size</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item, index) => (
                <button key={index} className={`border py-2 px-4 bg-gray-200 dark:bg-slate-800 ${item === size ? 'border-orange-500' : ''}`} onClick={() => setSize(item)}>{item}</button>
              ))}
            </div>
          </div>
          <button onClick={()=>token ? addToCart(productData._id, size): navigate('/login')}  
          className='bg-black hover:bg-slate-800 text-white px-8 py-3 text-sm dark:bg-gray-700 dark:text-white  hover:dark:bg-slate-500'>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5 dark:text-white' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1 dark:text-gray-400'>
            <p>100% Original Product</p>
            <p>Cash on Delivery is available on this product</p>
            <p>Easy return and exchange policy within 7 days</p>
          </div>
        </div>
      </div>
      {/* description */}
      <div className='mt-20 dark:text-white'>
        <div className='flex'>
          <b className='border px-5 text-sm py-3 dark:text-white dark:bg-slate-800'>Description</b>
          <p className='border px-5 py-3 text-sm dark:text-white dark:bg-slate-800'>Reviews (122)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500 dark:text-gray-400'>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam commodi alias aut voluptas quia!</p>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
      </div>
      {/* display related products */}
      <RelatedProduct category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : (
    <div className='opacity-0 dark:text-white dark:bg-slate-800'></div>
  );
};

export default Product;