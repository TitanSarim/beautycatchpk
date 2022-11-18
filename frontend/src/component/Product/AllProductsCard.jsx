import React from 'react'
import { Link } from 'react-router-dom'
import { Rating } from '@mui/material';








const AllProductsCard = ({product}) => {

  const options = {
    readOnly: true,
    precision: 0.5, 
    value: product.ratings,
  }

  
  return (
    <Link className="all-product-cards" to={`/product/${product._id}`}>

        <img src={product.images[0].url} alt={product.name}/>

        <p>{product.name}</p>

        <div className='all-product-cards-rating'>
          <Rating {...options}/>
          <span className='all-product-cards-product-card-span'>({product.numberofReviews} Reviews)</span>
        </div>

       <span>{`RS ${product.price}`}</span>
      
    </Link>
  )
}

export default AllProductsCard