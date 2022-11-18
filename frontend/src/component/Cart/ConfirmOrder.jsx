import React,{Fragment} from 'react'
import CheckoutSteps from './CheckoutSteps'
import {useSelector} from 'react-redux';
import MetaData from '../layout/MetaData'
import { Link } from 'react-router-dom';

import './ConfirmOrder.css'


const ConfirmOrder = ({history}) => {

    const {shippingInfo,cartItems} = useSelector((state)=> state.cart);
    const {user} = useSelector((state)=> state.user);

  
    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
      );

    const shippingCharges = 15;

    const tax = subtotal * 0.15;

    const totalPrice = subtotal + tax + shippingCharges;

    const proceedToPaayment = () => {
        const data = {
            subtotal,
            shippingCharges,
            tax,
            totalPrice,
        };

        sessionStorage.setItem("orderInfo", JSON.stringify(data));

        history.push("/process/payment");
    }

  return (

    <Fragment>
        <MetaData title="Confirm Order"/>

        <CheckoutSteps activeStep={1}/>

        <div className='confirm-order'>

            <div className='confirm-address-container'>
                <div className='confirm-address-wrapper'>
                    <h2 className='confirm-shipping-info-heading'>Shipping Info</h2>

                    <div className='confirm-address-name'>
                        <p>Name:</p>
                        <span>{user.name}</span>
                    </div>

                    <div className='confirm-address-phone'>
                        <p>Phone no:</p>
                        <span>{shippingInfo.phoneNo}</span>
                    </div> 

                    <div className='confirm-address-address'>
                        <p>Address:</p>
                        <span>{shippingInfo.address}</span>
                    </div>

                    <div className='confirm-address-city'>
                        <p>City:</p>
                        <span>{shippingInfo.city}</span>
                    </div>

                    <div className='confirm-address-country'>
                        <p>country:</p>
                        <span>Pakistan</span>
                    </div>

                    <div className='confirm-address-zipcode'>
                        <p>ZipCode:</p>
                        <span>{shippingInfo.pinCode}</span>
                    </div>


                </div>



                <h2 className='confirm-shipping-heading'>Your Cart Items</h2>

                <div className='confirm-cart-container'>
                {cartItems &&
                    cartItems.map((item) => (
                    <div key={item.product} className='confirm-cart-wrapper'>
                    
                        <div className='confirm-cart-product-detail'>
                            <img src={item.image} alt="Product"/>

                                <Link to={`/product/${item.product}`} className='confirm-cart-product-name'>
                                    {item.name}
                                </Link>{" "}
                        </div>      

                        <span>
                            {item.quantity} x {item.price} RS ={" "}

                            <b>{item.price * item.quantity} RS</b>
                        </span>
                    </div>
                ))}
                </div>


            </div>


{/* ======================================= */}

            <div className='confirm-order-summary-container'>
                 <h2>Order Summary</h2>

                    <div className='confirm-order-summary-wrapper'>
                        
                            
                        <div className='confirm-order-summary-bill'>

                            <div className='confirm-order-summary-subprice'>
                                <p>SubTotal:</p>
                                <span>{subtotal} RS</span>
                            </div>

                            <div className='confirm-order-summary-shippingharges'>
                                <p>Shipping Charges:</p>
                                <span>{shippingCharges} RS</span>
                            </div>

                            <div className='confirm-order-summary-tax'>
                                <p>Tax:</p>
                                <span>{tax} RS</span>
                            </div>

                        </div>

                        <div className='confirm-order-summary-totalprice'>
                            <p>
                                <b>Total:</b>
                            </p>
                            <span>{totalPrice} RS</span>
                        </div>

                        <button className='confrim-to-payment' onClick={proceedToPaayment}>Confirm Order</button>

                    </div>
                

            </div>

        </div>


    </Fragment>

  )
}

export default ConfirmOrder