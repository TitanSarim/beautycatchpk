import React from 'react'
import loading from '../../../images/loading.svg'

import "./Loader.css"

const Loader = () => {
  return (
    <div className='loader'>
        <img src={loading} alt="loading-icon" />
    </div>
  )
}

export default Loader