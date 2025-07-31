
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Collection from './pages/Collection';
import About from './pages/About';
import Contact from './pages/Contact';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import PlaceOrder from './pages/PlaceOrder';
import Order from './pages/Order';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VerifyEmail from './pages/VerifyEmail';
import axios from 'axios';
import { products } from './assets/assets';
import { useEffect } from 'react';

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const token = import.meta.env.VITE_TOKEN;

// Utility: Sleep for delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Utility: Convert image URL to File object
const urlToFile = async (url, filename) => {
  const res = await fetch(url);
  const blob = await res.blob();
  return new File([blob], filename, { type: blob.type });
};

const uploadProducts = async (products) => {
  for (const product of products) {
    try {
      const formData = new FormData();
      formData.append('name', product.name);
      formData.append('description', product.description);
      formData.append('price', product.price);
      formData.append('category', product.category);
      formData.append('subCategory', product.subCategory);
      formData.append('sizes', JSON.stringify(product.sizes));
      formData.append('bestseller', product.bestseller);

      //  Handle images - convert imported/static images to File
      if (product.image && Array.isArray(product.image)) {
        for (let i = 0; i < product.image.length; i++) {
          const imgUrl = product.image[i];

          // fetch the image and convert to File
          const file = await urlToFile(imgUrl, `image${i + 1}.jpg`);
          formData.append(`image${i + 1}`, file);
        }
      }

      const response = await axios.post(`${backendUrl}/api/product/add`, formData, {
        headers: {
          token,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(`✅ Uploaded: ${product.name}`, response.data);

      // Delay after each product upload (e.g. 2 seconds)
      await delay(3000);

    } catch (error) {
      console.error(`❌ Error uploading ${product.name}:`, error.response?.data || error.message);
    }
  }

  console.log("🎉 All products uploaded successfully!");
};


const App = () => {
  // useEffect(() => {
  //   uploadProducts(products);
  // },[]);
  return (
    <div className='dark:text-white dark:bg-slate-800 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] min-h-screen'>
      <ToastContainer />
      <Navbar />
      <div className='block md:hidden'>
        <SearchBar />
      </div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/place-order' element={<PlaceOrder />} />
        <Route path='/order' element={<Order />} />
       
        <Route path='/verifyemail' element={<VerifyEmail />} />
       
        
      </Routes>
    </div>
  );
};

export default App;