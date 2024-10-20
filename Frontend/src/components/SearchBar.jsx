import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { useLocation } from 'react-router';

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [visible,setVisible]=useState(false);
  const location=useLocation();

  useEffect(()=>{
    if(location.pathname.includes('collection' ) && showSearch){
      setVisible(true);
    }
    else{
      setVisible(false);
    }
  },[location])


  return showSearch && visible ? (
    <div className='border-t border-b bg-gray-50'>
      <div className='flex items-center justify-center p-4'>
        <div className='relative w-full max-w-md sm:w-96'>
          <input
            type='text'
            className='w-full h-10 pr-10 border-2 border-gray-400 rounded-full p-2'
            placeholder='Search for products'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <img
            src={assets.search_icon}
            alt="search"
            className='absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 opacity-50'
          />
        </div>
        <img
          src={assets.cross_icon}
          alt="clear"
          className='w-6 h-6 ml-3 cursor-pointer opacity-50 hover:opacity-100'
          onClick={() => setShowSearch(false)}
        />
      </div>
    </div>
  ) : null;
};

export default SearchBar;
