import React from 'react'
import { Rating } from '@mui/material';
import profile from '../../images/profile.png'

import './ProductDetails.css'

const ReviewCard = ({review}) => {

    const options = {
        size: "large",
        readOnly: true,
        precision: 0.5,
        value: review.rating,
      }


  return (
    <div className='allreview-card'>
        <div className='allreview-card2'>
            <img src={profile} alt="User" />
            <p>{review.name}</p>
            <Rating {...options}/>
            <span className='review-comment'>{review.comment}</span>
        </div>
    </div>
  )
}

export default ReviewCard