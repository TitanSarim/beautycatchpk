import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../../images/logo.png'
import {BiSearchAlt} from 'react-icons/bi'
import {BsHandbag} from 'react-icons/bs';
import {RiAccountBoxLine} from 'react-icons/ri';
import {useSelector } from 'react-redux';

import './Nav.css'



const Logo = () => {

  const {cartItems} = useSelector((state)=> state.cart);

  return (
    <div className='logo'>
        <div className='logo-container'>
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>


        <div className='nav-icons'>
          <ul>

            <li>
              <Link to="/search">
                <BiSearchAlt size={27}/>
              </Link>
            </li>

            <li>
              <Link to="/cart">
                <BsHandbag size={25} style={{color: cartItems.length > 0 ? "tomato" : "unset"}}/>
              </Link>
            </li>

            <li>
              <Link to="/login">
                <RiAccountBoxLine size={28}/>
              </Link>
            </li>

          </ul>
        </div>

    </div>
  )
}

export default Logo