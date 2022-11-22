import React from 'react'
import { Link } from 'react-router-dom'
import {BsArrowRepeat, BsTelephone} from 'react-icons/bs'
import {MdSupport} from 'react-icons/md'
import {FaShippingFast, FaFacebookF, FaInstagram, FaWhatsapp} from 'react-icons/fa'
import {RiSecurePaymentLine} from 'react-icons/ri'
import {AiOutlineCopyright} from 'react-icons/ai'
import {HiOutlineMail} from 'react-icons/hi'


import './style.css'

const Footer = () => {
  return (
    <div className='container'>

        <div className='services'>
            <div className='services-list'>
                <li>
                    <BsArrowRepeat size={48}/>
                    <span>Track Your Order</span>
                </li>

                <li>
                    <MdSupport size={48}/>
                    <span>Contact us 24 hours a day</span>
                </li>

                <li>
                    <FaShippingFast size={58}/>
                    <span>Fast and low cost International Shipping</span>
                </li>

                <li>
                    <RiSecurePaymentLine size={68}/>
                    <span>Secure Payments as International Standards</span>
                </li>

            </div>
        </div>

        <div className='wrapper'>
            <div className='wrapper-content'>
                
                {/* 1st container */}
                <div className='contact-us'>
                    <p className='contact-title'>Contact Us</p>
                    <li>
                        <p className='address'>Barkat Market New Garden Town Lahore</p>
                    </li>
                    <li>
                        <HiOutlineMail size={20}/>
                        <span>beautycatchpk@gmail.com</span>
                    </li>
                    <li>
                        <BsTelephone size={20}/>
                        <span className='phone'>+92 304 1446078</span>
                    </li>
                    
                    <li className='socail-icons'>
                        <span>
                           <a href="https://www.facebook.com/profile.php?id=100087737806185&mibextid=ZbWKwL">
                                <FaFacebookF size={25}/>
                           </a> 
                        </span>
                        <span>
                            <a href="">
                                <FaInstagram size={25}/>
                            </a>
                        </span>
                        <span>
                           <a href="">
                                <FaWhatsapp size={25}/>
                           </a>
                        </span>    
                    </li>

                </div>

                {/*Customer Care  */}
                <div className='customer-care'>
                    <p className='customer-care-title'>Customer Care</p>
                    <li>
                        <p>Excahnges & Returns</p>
                    </li>
                    <li>
                        <p>FAQs</p>
                    </li>
                    <li>
                        <p>
                            <Link to="/Contactus">
                                Contact Us
                            </Link>
                        </p>
                    </li>
                    <li>
                        <p>Payments</p>
                    </li>
                    <li>
                        <p>Track Your Order</p>
                    </li>
                </div>

                {/*Information */}
                
                <div className='information'>
                    <p className='information-title'>Information</p>
                    <li>
                        <p>
                            <Link to="/aboutus">
                                About Us
                            </Link>
                        </p>
                    </li>
                    <li>
                        <p>
                            <Link to='/privacy'>
                                Privacy & Policy
                            </Link>
                        </p>
                    </li>
                    
                </div>


            </div>

            <div className='copy-right'>
                <p>
                    Copyright 
                    <AiOutlineCopyright size={20}/> 2022 SARIMXAHID All Rights reserved
                </p>
            </div>
        </div>
    </div>
  )
}

export default Footer