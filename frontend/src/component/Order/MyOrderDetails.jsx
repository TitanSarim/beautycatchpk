import React, {Fragment, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import {useAlert} from 'react-alert';
import MetaData from '../layout/MetaData'
import {clearErrors, getOrderDetails} from '../../actions/orderAction';
import Loader from '../layout/loader/Loader'

import './MyOrdersDetails.css'


const MyOrderDetails = ({match}) => {

    const {loading, error, order} = useSelector((state)=> state.orderDetails);

    const dispatch = useDispatch()
    const alert = useAlert();
    

    useEffect(() => {

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        dispatch(getOrderDetails(match.params.id))

    }, [dispatch, error, alert, match.params.id])

  return (
    <Fragment>
        
        {loading ? <Loader/> : (

            <Fragment>

                <MetaData title="Order Details"/>

                <div className='myorder-details-container'>'

                    <div className='myorder-details-wrapper'>

                        <div className='myorder-details-userinfo'>

                            <div className='myorder-details-address'>
                                <span>
                                    <h2>Order #{order && order._id}</h2>
                                </span>


                                <div className='myorder-details-cus-name'>
                                    <p>Name:</p>
                                    <span>{order.user && order.user.name}</span>
                                </div>

                                <div className='myorder-details-cus-address'>
                                    <p>Address:</p>
                                    <span>{order.shippingInfo && order.shippingInfo.address}</span>
                                </div>

                                <div className='myorder-details-cus-phone'>
                                    <p>Phone:</p>
                                    <span>{order.shippingInfo && order.shippingInfo.phoneNo}</span>
                                </div>

                                <div className='myorder-details-cus-city'>
                                    <p>City:</p>
                                    <span>{order.shippingInfo && order.shippingInfo.city}</span>
                                </div>


                                <div className='myorder-details-cus-country'>
                                    <p>Country:</p>
                                    <span>Pakistan</span>
                                </div>

                                <div className='myorder-details-cus-zipcode'>
                                    <p>ZipCode:</p>
                                    <span>{order.shippingInfo && order.shippingInfo.pinCode}</span>
                                </div>

                            </div>

                            {/*payment part  */}

                            <div className='myorder-details-payment'>

                                <span>
                                    <h2>Payment Info</h2>
                                </span>

                                <div className='myorder-details-payment-status'>
                                    <p className={order.paymentInfo && 
                                        order.paymentInfo.status === "succeeded" ? "greenColor" : "redColor "}>
                                            {order.paymentInfo && 
                                                order.paymentInfo.status === "succeeded" ? "PAID" : "Cash on Delivery"}
                                        </p>
                                </div>

                                <div className='myorder-details-payment-amount'>
                                    <p>Amount:</p>
                                    <span>{order.totalPrice && order.totalPrice} RS</span>
                                </div>

                            </div>


                            {/* Order status */}
                            <div className='myorder-details-status'>
                                <p className={order.orderStatus && order.orderStatus === "Delivered" ? "greenColor" : "redColor"}>
                                    {order.orderStatus && order.orderStatus}
                                </p>
                            </div>

                        </div>

                        
                        {/* cart items */}
                        
                        <div className='myorder-details-items'>
                            <span>
                                <h2>Order Items: </h2>
                            </span>

                            <div className='myorder-details-itemdetails'>
                                {order.orderItems && order.orderItems.map((item) => (
                                    <div key={item.product} className='myorder-details-items-info'>
                                        <div className='myorder-details-item-img-text'>
                                            <img src={item.image} alt="Product" />
                                            <Link to={`/product/${item.product}`} className='myorder-details-item-text'>{item.name}</Link>
                                        </div>
                                        <div className='myorder-details-items-price'>
                                            {item.quantity} x {item.price} = {" "}
                                            <b>{item.price * item.quantity} RS</b>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>

                    </div>

                </div>

            </Fragment>

        )}

    </Fragment>
  )
}

export default MyOrderDetails