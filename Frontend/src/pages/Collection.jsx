import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ProductItem from '../components/ProductItem';
import Title from '../components/Title';
import { ShopContext } from '../context/ShopContext';
import { useRef } from 'react';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Collection = () => {
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortOption, setSortOption] = useState('relevant');
  const [showFilter, setShowFilter] = useState(false);
  const { search, products, setProducts, currentPage, setCurrentPage, totalPages, setTotalPages, searchGet } = useContext(ShopContext);




  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const cacheRef = useRef(new Map());
   const CACHE_EXPIRY = 5 * 60 * 1000; 

  const getProductData = async (page) => {
    try {
      const queryParams = new URLSearchParams({
        page,
        search,
        category: category.join(','),
        subCategory: subCategory.join(','),
        sort: sortOption
      }).toString();

      if (cacheRef.current.has(queryParams)) {
        const cachedData = cacheRef.current.get(queryParams);
        const isExpired = Date.now() - cachedData.timestamp > CACHE_EXPIRY;

        if (!isExpired) {
          console.log("Cache hit ", queryParams);
          setProducts(cachedData.posts);
          setTotalPages(cachedData.totalPages);
          return;
        } else {
          console.log("Cache expired", queryParams);
          cacheRef.current.delete(queryParams);
        }
      }

      const response = await axios.get(`${backendUrl}/api/product/list?${queryParams}`);
      if (response.data.success) {
        setProducts(response.data.posts);
        setTotalPages(response.data.totalPages);

         cacheRef.current.set(queryParams, {
          posts: response.data.posts,
          totalPages: response.data.totalPages,
          timestamp: Date.now()
        });

      } else {
        toast.error(response.data.message);
      }
      
    } catch (error) {
      console.error(error);
      toast.error('Error fetching products');
    }
  };


  useEffect(() => {
    getProductData(currentPage);
  }, [currentPage, category, subCategory, sortOption, search, searchGet]);
  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t dark:text-white dark:bg-slate-800'>
      <div className='min-w-60'>
        <p
          className='my-2 text-xl flex items-center cursor-pointer gap-2'
          onClick={() => setShowFilter(!showFilter)}
        >
          FILTERS
        </p>

        {/* Category Filter */}
        <div className={`border pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='text-lg font-semibold'>Category</p>
          {['Men', 'Women', 'Kids'].map((item) => (
            <div key={item} className='flex items-center gap-2 mt-2'>
              <input type="checkbox" value={item} onChange={toggleCategory} checked={category.includes(item)} />
              <p>{item}</p>
            </div>
          ))}
        </div>

        {/* SubCategory Filter */}
        <div className={`border pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='text-lg font-semibold'>Type</p>
          {['Topwear', 'Bottomwear', 'Winterwear'].map((item) => (
            <div key={item} className='flex items-center gap-2 mt-2'>
              <input type="checkbox" value={item} onChange={toggleSubCategory} checked={subCategory.includes(item)} />
              <p>{item}</p>
            </div>
          ))}
        </div>
      </div>

      <div className='flex-1'>
        <div className='flex flex-col sm:flex-row justify-between mb-4'>
          <Title text1={'All'} text2={'Collections'} />
          <select
            className='border px-2 text-sm w-fit sm:w-auto mt-2 sm:mt-0'
            onChange={(e) => setSortOption(e.target.value)}
            value={sortOption}
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
          {products.length > 0 ? (
            products.map((item, index) => (
              <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
            ))
          ) : (
            <div className='text-center text-lg flex items-center justify-center'>
              <svg className='w-12 h-12 text-red-600 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' /></svg>
              <p className='text-red-600'>No products found.</p>
            </div>
          )}
        </div>


        {/* Pagination */}
        <div className="flex justify-center mt-12 mb-12 gap-2">
          {/* Previous Button */}
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          {/* Dynamic Page Buttons */}
          {[...Array(4)].map((_, idx) => {
            const pageNum = currentPage + idx;
            if (pageNum > totalPages) return null; // Don't render if exceeding total pages
            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`px-3 py-1 border rounded ${currentPage === pageNum ? 'bg-black text-white' : ''
                  }`}
              >
                {pageNum}
              </button>
            );
          })}

          {/* Next Button */}
          <button
            disabled={currentPage + 1 > totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>

      </div>
    </div>
  );
};

export default Collection;
