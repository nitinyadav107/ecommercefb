import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import axios from 'axios';


export const ShopContext = createContext();

export const ShopContextProvider = (props) => {
  const currency = '₹ ';
  const delivery_fee = 0;
  // console.log(import.meta.env);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  // console.log(backendUrl)
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState('');
  const [verifyemail,setVerifyemail]=useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error('Select Product Size');
      return;
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(`${backendUrl}/api/cart/add`, { itemId, size }, { headers: { token } });
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (let i in cartItems) {
      for (let j in cartItems[i]) {
        try {
          if (cartItems[i][j] > 0) {
            totalCount += cartItems[i][j];
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
    if (token) {
      try {
        await axios.post(`${backendUrl}/api/cart/update`, { itemId, size, quantity }, { headers: { token } });
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      }
    }
  };

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(`${backendUrl}/api/cart/get`, {}, { headers: { token } });
      if (response.data.success) {
        setCartItems(response.data.cartData);
        console.log(response.data);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const productId in cartItems) {
      const itemInfo = products.find((product) => product._id === productId);
      if (!itemInfo) continue; // Skip if product not found
  
      for (const size in cartItems[productId]) {
        try {
          const quantity = cartItems[productId][size];
          if (quantity > 0) {
            totalAmount += itemInfo.price * quantity;
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
    return totalAmount;
  };
  

  const getProductData = async (page = 1) => {
  try {
    const response = await axios.get(`${backendUrl}/api/product/list?page=${page}`);
    if (response.data.success) {
      setProducts(response.data.posts); // 'posts' contains the paginated data
      setTotalPages(response.data.totalPages);
      console.log(response.data);
    } else {
      console.error(response.data);
      toast.error(response.data.message);
    }
  } catch (error) {
    console.error(error);
    toast.error('Something went wrong while fetching products');
  }
};
// Fetch products on component mount and when page changes
useEffect(() => {
  getProductData(currentPage);
}, [currentPage]);

  useEffect(() => {
    if (!token && localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'));
      getUserCart(localStorage.getItem('token'));
    }
  }, [token]);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken,
    verifyemail,
    setVerifyemail
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};
