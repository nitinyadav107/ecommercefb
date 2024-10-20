import React, { useContext } from 'react'
import { useParams } from 'react-router';
import { ShopContext } from '../context/ShopContext';

const Product = () => {
  const {productId}=useParams();
  const {products}=useContext(ShopContext);
  const [productData,setProductData]=useState(false);

  const fetchProductData=async()=>{
    productData.map((item)=>{
      if(item.id===productId){
        setProductData(item);
      }
      
      
    });
  }
  return (
    <div>
      
    </div>
  )
}

export default Product
