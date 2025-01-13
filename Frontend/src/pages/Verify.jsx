import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Verify = () => {
  const { navigate,token, setCartItems, backendUrl } = useContext(ShopContext);
  // const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const verifyPayment = async () => {
    try {
      if (!token) {
       
        return null;
      }
      
      const response = await axios.post(
        `${backendUrl}/api/order/verifyStripe`,
        { success, orderId },
        { headers: { token } }
      );

      if (response.data.success) {
        setCartItems({});
        toast.success("Payment verified successfully!");
        navigate("/order");
      } else {
        navigate("/cart");
        toast.error("Payment verification failed.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during payment verification.");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [token]);

  return (
    <div className="dark:text-white dark:bg-slate-800 min-h-screen flex items-center justify-center">
      <p>Verifying payment...</p>
    </div>
  );
};

export default Verify;