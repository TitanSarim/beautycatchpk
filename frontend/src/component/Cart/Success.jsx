import React from 'react'
import { Link } from 'react-router-dom'
import {IoMdCheckmarkCircleOutline} from 'react-icons/io';

import './Success.css'


const Success = () => {
  return (
    <div className='success'>

        <IoMdCheckmarkCircleOutline size={100} style={{color: "green"}}/>

        <h2>Your Order has been placed Successfully</h2>

        <Link to="/orders" className='view-orders'>View Orders</Link>

    </div>

  )
}

export default Success