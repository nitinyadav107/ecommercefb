import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductItem from '../components/ProductItem';
import Title from '../components/Title';

const Collection = () => {
  
  const { products,search,showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProduct, setFilterProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortOption, setSortOption] = useState('relevant');

  const toggleCategory = (e) => {
    const value = e.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    if (subCategory.includes(value)) {
      setSubCategory(subCategory.filter((item) => item !== value));
    } else {
      setSubCategory([...subCategory, value]);
    }
  };

  const sortProducts = (products) => {
    switch (sortOption) {
      case 'low-high':
        return [...products].sort((a, b) => a.price - b.price);
      case 'high-low':
        return [...products].sort((a, b) => b.price - a.price);
      default:
        return products; // Keep as is for +'relevant'
    }
  };

  const filterAndSortProducts = () => {
    let filteredProducts = products;
    if(showSearch && search){
      filteredProducts = filteredProducts.filter(
        (item) => item.name.toLowerCase().includes(search.toLowerCase()
        )
      );

    }

    // Filter by category
    if (category.length > 0) {
      filteredProducts = filteredProducts.filter((item) =>
        category.includes(item.category)
      );
    }

    // Filter by subcategory
    if (subCategory.length > 0) {
      filteredProducts = filteredProducts.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    // Sort products
    filteredProducts = sortProducts(filteredProducts);

    setFilterProduct(filteredProducts);
  };

  useEffect(() => {
    filterAndSortProducts();
    console.log(subCategory)
  }, [category, subCategory, sortOption, products,search,showSearch]);

  return (
    
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      <div className='min-w-60'>
        <p
          className='my-2 text-xl flex items-center cursor-pointer gap-2'
          onClick={() => setShowFilter(!showFilter)}
        >
          FILTERS
        </p>
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='text-lg font-semibold'>Category</p>
          <div className='flex flex-col gap-2 mt-2'>
            <div className='flex items-center gap-2'>
              <input type="checkbox" value={'Men'} onChange={toggleCategory} />
              <p>Men</p>
            </div>
            <div className='flex items-center gap-2'>
              <input type="checkbox" value={'Women'} onChange={toggleCategory} />
              <p>Women</p>
            </div>
            <div className='flex items-center gap-2'>
              <input type="checkbox" value={'Kids'} onChange={toggleCategory} />
              <p>Kids</p>
            </div>
          </div>
        </div>
        {/* Subcategory */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='text-lg font-semibold'>Type</p>
          <div className='flex flex-col gap-2 mt-2'>
            <div className='flex items-center gap-2'>
              <input type="checkbox" value={'Topwear'} onChange={toggleSubCategory} />
              <p>Topwear</p>
            </div>
            <div className='flex items-center gap-2'>
              <input type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory} />
              <p>Bottomwear</p>
            </div>
            <div className='flex items-center gap-2'>
              <input type="checkbox" value={'Winterwear'} onChange={toggleSubCategory} />
              <p>Winterwear</p>
            </div>
          </div>
        </div>
      </div>
      <div className='flex-1'>
        <div className='flex flex-col sm:flex-row md:flex-row justify-between text-base sm:text-2xl md:text-2xl mb-4'>
          <Title text1={'All'} text2={'Collections'} />
          <select
            className='border border-gray-300 text-xs sm:text-sm md:text-sm px-2 w-fit sm:w-auto mt-2 sm:mt-0'
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
      </div>
    </div>
  );
};

export default Collection;
