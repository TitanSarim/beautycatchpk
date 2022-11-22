import React from 'react'
import Form from './Form'
import {GoLocation} from 'react-icons/go';
import {BsTelephone} from 'react-icons/bs';
import {SiMinutemailer} from 'react-icons/si';
import {TbBrandGoogle} from 'react-icons/tb';

import './Contact.css'

const Contact = () => {
 

  return (

    <div>

            
          <head>
            <title>Beauthcatch Contact Us</title>
            <meta name="Find beauty products in Pakistan by using Beauthcatch"/>
          </head>

            <div className='contact-contianer'>

                <div className='contactus-form'>

                 <Form/>

                </div>

                <div className='contactus-address'>

                  <h1>Contact Information</h1>

                  <p>We're open for any suggesstion or just to have a chat</p>

                  <div className='contactus-address-info'>
                    <ul>
                      <li>
                        <p className='address-icons'><GoLocation size={25}/></p>
                        <span>Address: <p>Pakistan, Lahore</p></span>
                      </li>
                      <li>
                        <p className='address-icons'><BsTelephone size={25}/></p>
                        <span> Phone: <p>+923041446078</p></span>
                      </li>
                      <li>
                        <p className='address-icons'><SiMinutemailer size={25}/></p>
                        <span>Email: <p>beautycatchpk@gmail.com</p></span>
                      </li>
                      <li>
                        <p className='address-icons'><TbBrandGoogle size={25}/></p>
                        <span>Website: <p>www.beautycatch.pk</p></span>
                      </li>
                    </ul>
                  </div>

                </div>

            </div>
            
    </div>

  )



}


export default Contact