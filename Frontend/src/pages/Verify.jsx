import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Verify = () => {
  const { navigate, token, setCartItems, backendUrl, cartItems } = useContext(ShopContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        if (!token) {
          
          return;
        }

        const response = await axios.post(
          `${backendUrl}/api/order/verifyStripe`,
          { success, orderId },
          { headers: { token } }
        );

        console.log(response.data);

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

    verifyPayment();
  }, [token, success, orderId, navigate, setCartItems, backendUrl]);

  return (
    <div className="dark:text-white dark:bg-slate-800 min-h-screen flex items-center justify-center">
      <p>Verifying payment...</p>
    </div>
  );
};

export default Verify;