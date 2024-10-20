import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({id,image,name,price}) => {
  const {currency}=useContext(ShopContext)
  return (
    <Link to={`/product/${id}`}>
      <div className='overflow-hidden'>
        <img className='hover:scale-110 transition-all ease-in-out duration-300' src={image[0]} alt="" />
      </div>
      <p className='pt-3 pb-1 text-sm'>{name}</p>
      <p className='text-sm font-bold'>{currency}{price}</p>
      
    </Link>
  )
}

export default ProductItem
