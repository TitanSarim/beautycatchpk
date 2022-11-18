import React from 'react'
import { Link } from 'react-router-dom'
import { Rating } from "@material-ui/lab";


const ProductsAll = ({allproduct}) => {

  const options = {
    readOnly: true,
    precision: 0.5, 
    value: allproduct.ratings,
  }

  
  return (
    <Link className="product-card" to={`/product/${allproduct._id}`}>

        <img src={allproduct.images[0].url} alt={allproduct.name}/>

        <p>{allproduct.name}</p>

        <div className='rating'>
          <Rating {...options}/>
          <span className='productcard-span'>({allproduct.numberofReviews} Reviews)</span>
        </div>

       <span>{`$ ${allproduct.price}`}</span>
      
    </Link>
  )
}

export default ProductsAll