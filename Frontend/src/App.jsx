
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


const App = () => {
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