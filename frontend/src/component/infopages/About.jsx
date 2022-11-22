import React from 'react'
import undraw from '../../images/undraw.svg'
import {BiMessageSquare} from 'react-icons/bi'
import {FaRegAddressBook} from 'react-icons/fa'


import './About.css'

const About = () => {

  return (

    <div>

          <head>
            <title>Beauthcatch About Us</title>
            <meta name="Find beauty products in Pakistan by using Beauthcatch"/>
          </head>

            <div className='about-contianer'>

                <div className='about-content'>
                  <h1>About Us</h1>
                  <p>Beauthcatch is the Top-Rated Jobs site in the Pakistan with awesome beauty products and unique visitors every month. Beauthcatch strives to put lastest and most demanding products, giving them free access to search for products of there own choice and buy them. Every day, we connect Thousands of people.
                    <br />
                    Please note that Beauth-catch and its affiliates are directly or indirectly owned by a Pvt. Ltd. company.
                  </p>

                  <ul className='about-content-icons'>

                    <li>
                      <span className='about-content-icons-span'><BiMessageSquare size={25}/></span>
                        <p>Email: <span>beautycatchpk@gmail.com</span></p>
                    </li>

                    <li>
                      <span className='about-content-icons-span'><FaRegAddressBook size={25}/></span>
                        <p>Phone No: <span>+923041446078</span></p>
                    </li>


                  </ul>

                </div>

                <div className='about-image'>
                  <img
                    src={undraw}
                    alt="about-us image"
                    width={400}
                  />
                </div>


            </div>
    </div>

  )


}

export default About

