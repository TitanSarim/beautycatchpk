import React from 'react'
import { Link } from 'react-router-dom'
import { Rating } from "@material-ui/lab";


const ProductCard = ({product}) => {

  const options = {
    readOnly: true,
    precision: 0.5, 
    value: product.ratings,
  }

  let count = 22;
  
  return (
    <Link className="product-card" to={`/product/${product._id}`}>

        <img src={product.images[0].url} alt={product.name}/>

        <p>{product.name.slice(0, count)+ (product.name.length > count ? " . . ." : " ")}</p>

        <div className='rating'>
          <Rating {...options}/>
          <span className='productcard-span'>({product.numberofReviews} Reviews)</span>
        </div>

       <span>{`RS ${product.price}`}</span>
      
    </Link>
  )
}

export default ProductCard