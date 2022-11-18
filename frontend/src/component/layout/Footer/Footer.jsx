import React from 'react'

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
                        <p className='address'>New Satellite Town House no 4A street no 1 Bahawalpur</p>
                    </li>
                    <li>
                        <HiOutlineMail size={20}/>
                        <span>Sarimxahid123@gmail.com</span>
                    </li>
                    <li>
                        <BsTelephone size={20}/>
                        <span className='phone'>+92 0310 67278 74</span>
                    </li>
                    
                    <li className='socail-icons'>
                        <span>
                            <FaFacebookF size={25}/>
                        </span>
                        <span>
                            <FaInstagram size={25}/>
                        </span>
                        <span>
                            <FaWhatsapp size={25}/>
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
                        <p>Contact Us</p>
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
                        <p>About Us</p>
                    </li>
                    <li>
                        <p>Privacy & Policy</p>
                    </li>
                    <li>
                        <p>Store Locator</p>
                    </li>
                    <li>
                        <p>Suppliers</p>
                    </li>
                    <li>
                        <p>Brands</p>
                    </li>
                    <li>
                        <p>Sale Guide</p>
                    </li>
                    <li>
                        <p>Blogs</p>
                    </li>
                    
                </div>


            </div>

            <div className='copy-right'>
                <p>
                    Copyright 
                    <AiOutlineCopyright size={20}/> 2022 Bbegy All Rights reserved
                </p>
            </div>
        </div>
    </div>
  )
}

export default Footer