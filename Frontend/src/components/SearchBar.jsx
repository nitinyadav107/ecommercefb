import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch, backendUrl } = useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchtext, setSearchtext] = useState('');

  const searchSuggestionsResult = async () => {
    if (!backendUrl) return;
    try {

      const queryParams = new URLSearchParams({
        page: 1,
        search: searchtext,
      }).toString();

      const response = await axios.get(`${backendUrl}/api/product/list?${queryParams}`);
      if (response?.data?.success) {
        setSearchSuggestions(response.data.posts || []);
      } else {
        setSearchSuggestions([]);
        toast.error(response?.data?.message || 'No suggestions');
      }
    } catch (error) {
      console.error(error);
      setSearchSuggestions([]);
      toast.error('Error fetching suggestions');
    }
  };


  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchtext.trim() !== '') {
        searchSuggestionsResult();
      } else {
        setSearchSuggestions([]);
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [searchtext]);

  useEffect(() => {
    if (location.pathname.includes('/') && showSearch) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location, showSearch]);

  const handleInputChange = (e) => {
    setSearchtext(e.target.value);

  };

  const callCollection = () => {
    if (searchtext.trim() === '') return;
    setSearch(searchtext);
    // setShowSearch(false);

    setSearchSuggestions([]);
    navigate('/collection');
    setSearchtext('');
  };


  const handleBlur = () => {
    setShowSearch(false);
    setTimeout(() => setSearchSuggestions([]), 120);
  };

  return showSearch && visible ? (
    <div className='bg-white dark:bg-slate-800'>
      <div className="flex items-center justify-center p-6 md:p-0">
        <div className='relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl'>
          {/* Input */}
          <input
            onFocus={() => {

              if (searchtext.trim() !== '') searchSuggestionsResult();
            }}
            onBlur={handleBlur}
            type='text'
            className='w-full h-10 pr-10 border border-gray-300 rounded-full p-2 dark:bg-slate-700 dark:text-white dark:border-gray-600'
            placeholder='Search for products'
            value={searchtext}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                callCollection();
              }
            }}
          />
          <img
            src={assets.search_icon}
            alt="search"
            className='absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 opacity-50 dark:opacity-75'
          />

          {/* Suggestion Box */}
          {searchSuggestions.length > 0 && (
            <div className="absolute top-12 left-0 w-full bg-white dark:bg-slate-800 shadow-md rounded-md max-h-64 overflow-y-auto z-20 border border-gray-200 dark:border-gray-700 hide-scrollbar">
              {searchSuggestions.map((item) => (
                <span
                  key={item._id}
                  className="block px-4 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
                  onMouseDown={() => {
                    setSearch(item.name);
                    setSearchtext('');
                    navigate('/collection');
                  }}
                >
                  {item.name}
                </span>
              ))}
            </div>

          )}
        </div>
      </div>
    </div>
  ) : null;
};

export default SearchBar;
