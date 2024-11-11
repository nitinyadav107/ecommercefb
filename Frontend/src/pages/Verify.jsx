import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useSearchParams, useNavigate } from 'react-router-dom'; // Ensure useNavigate is imported
import axios from 'axios';
import { toast } from 'react-toastify';

const Verify = () => {
  const { token, setCartItems, backendUrl } = useContext(ShopContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const verifyPayment = async () => {
    try {
      if (!token) {
        toast.error("User not authenticated.");
        navigate("/login");
        return;
      }
      
      const response = await axios.post(
        `${backendUrl}/api/order/verifyStripe`, // Adjusted URL to ensure proper endpoint structure
        { success, orderId },
        { headers: { token } }
      );

      if (response.data.success) {
        setCartItems({});
        navigate("/");
        toast.success("Payment verified successfully!");
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

  return <div>Verifying payment...</div>;
};

export default Verify;
