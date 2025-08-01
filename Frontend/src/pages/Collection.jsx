import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ProductItem from '../components/ProductItem';
import Title from '../components/Title';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Collection = () => {
  const [products, setProducts] = useState([]);
  const [filterProduct, setFilterProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortOption, setSortOption] = useState('relevant');
  const [showFilter, setShowFilter] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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

  const getProductData = async (page = 1) => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list?page=${page}`);
      if (response.data.success) {
        setProducts(response.data.posts);
        setTotalPages(response.data.totalPages);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Error fetching products');
    }
  };

  const sortProducts = (items) => {
    switch (sortOption) {
      case 'low-high':
        return [...items].sort((a, b) => a.price - b.price);
      case 'high-low':
        return [...items].sort((a, b) => b.price - a.price);
      default:
        return items;
    }
  };

  const filterAndSortProducts = () => {
    let filtered = [...products];

    if (category.length > 0) {
      filtered = filtered.filter((item) => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      filtered = filtered.filter((item) => subCategory.includes(item.subCategory));
    }

    filtered = sortProducts(filtered);
    setFilterProduct(filtered);
  };

  useEffect(() => {
    getProductData(currentPage);
  }, [currentPage]);

  useEffect(() => {
    filterAndSortProducts();
  }, [products, category, subCategory, sortOption]);

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
              <input type="checkbox" value={item} onChange={toggleCategory} />
              <p>{item}</p>
            </div>
          ))}
        </div>

        {/* SubCategory Filter */}
        <div className={`border pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='text-lg font-semibold'>Type</p>
          {['Topwear', 'Bottomwear', 'Winterwear'].map((item) => (
            <div key={item} className='flex items-center gap-2 mt-2'>
              <input type="checkbox" value={item} onChange={toggleSubCategory} />
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
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
          {filterProduct.map((item, index) => (
            <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
          ))}
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
        className={`px-3 py-1 border rounded ${
          currentPage === pageNum ? 'bg-black text-white' : ''
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
