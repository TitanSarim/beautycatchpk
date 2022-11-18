import React from 'react'
import MetaData from '../layout/MetaData';
import {BiError} from 'react-icons/bi';
import { Link } from 'react-router-dom';

import './NotFound.css'

const NotFound = () => {
  return (
    <div className='notFound-container'>
        <MetaData title='Page Not Found'/>
        <div className='notfound-wrapper'>
          <BiError size={100} color='red'/>
          <h1 className='notfound-heading'>Page Not Found</h1>
          <button>
            <Link to='/'>
              Home
            </Link>
          </button>
        </div>
    </div>
  )
}

export default NotFound