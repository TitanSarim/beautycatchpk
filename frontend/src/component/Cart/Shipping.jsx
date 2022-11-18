import React,{Fragment, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import CheckoutSteps from './CheckoutSteps'
import {saveShippingInfo} from '../../actions/cartAction'
import {useAlert} from 'react-alert';
import MetaData from '../layout/MetaData';
import {Country, State} from 'country-state-city'

import {AiOutlineHome} from 'react-icons/ai';
import {MdLocationCity} from 'react-icons/md';
import {FiPhone, FiMapPin} from 'react-icons/fi';
import {GiWorld} from 'react-icons/gi';
import {SiWalkman} from 'react-icons/si';

import './Shipping.css'






const Shipping = ({history}) => {

    const dispatch = useDispatch()
    const alert = useAlert();

    const {shippingInfo} = useSelector((state)=> state.cart);

    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

    const shippingSubmit = (e) =>{
        e.preventDefault();

        if(phoneNo.length < 8 || phoneNo.length > 16){
            alert.error("Phone Number Should be above 8 digits of less then 16")
            return;
        }

        dispatch(
            saveShippingInfo({address, city, pinCode, phoneNo})
        )

        history.push("/order/confirm");
    }

  return (
    <Fragment>

        <MetaData title="Shipping Details"/>

        <CheckoutSteps activeStep={0}/> 

        <div className="shipping-container">
            <div className='shipping-box'>
                <div className='shipping-heading'>
                    <h2>Shpping Details</h2>
                </div>

                <form 
                    className='shipping-form'
                    encType='multipart/form-data'
                    onSubmit={shippingSubmit}
                >

                    <div className='shipping-address'>  
                        <AiOutlineHome size={27} style={{color: "tomato"}}/>
                        <input 
                            type="text" 
                            placeholder='Address'
                            required
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>

                    <div className='shipping-city'>  
                        <MdLocationCity size={28} style={{color: "tomato"}}/>
                        <input 
                            type="text" 
                            placeholder='City'
                            required
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>


                    <div className='shipping-zip'>  
                        <FiMapPin size={26} style={{color: "tomato"}}/>
                        <input 
                            type="number" 
                            placeholder='Zip Code'
                            required
                            value={pinCode}
                            onChange={(e) => setPinCode(e.target.value)}
                        />
                    </div>

                    <div className='shipping-phone'>  
                        <FiPhone size={26} style={{color: "tomato"}}/>
                        <input 
                            type="number" 
                            placeholder='Phone Number'
                            required
                            value={phoneNo}
                            onChange={(e) => setPhoneNo(e.target.value)}
                            
                        />
                    </div>

                    <div className='shipping-country'>
                        <GiWorld size={28} style={{color: "tomato"}}/>
                        <p>Pakistan</p>
                    </div>


                    <input 
                        type="submit" 
                        value="Continue"
                        className='shipping-Btn'
                    />

                </form>

            </div>
        </div>

    </Fragment>
  )
}

export default Shipping