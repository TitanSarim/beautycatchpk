import React,{Fragment, useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import MetaData from '../layout/MetaData'
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { getOrderDetails, clearErrors, updateOrder } from '../../actions/orderAction';
import { useAlert } from 'react-alert';
import Loader from '../layout/loader/Loader';

import {BiCategory} from 'react-icons/bi';

import './ProcessOrder.css'
import { UPDATE_ORDER_REST } from '../../constants/orderConstants';




const ProcessOrder = ({history, match}) => {

    const {loading, error, order} = useSelector((state)=> state.orderDetails);
    const {error: updateError, isUpdated} = useSelector((state)=> state.order);
    
   

  
   const updateOrderSubmitProcessHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("status", status);

        dispatch(updateOrder(match.params.id, myForm));
   }

   const dispatch = useDispatch()
   const alert = useAlert();

   const [status, setStatus] = useState("")


   useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_REST });
    }

    dispatch(getOrderDetails(match.params.id));
  }, [dispatch, error, alert, match.params.id, isUpdated, updateError]);

  return (
    <Fragment>
        
    <MetaData title="Update Order Product"/>

    <div className='admin-dashboard'>
        <Sidebar/>

        <div className='admin-dashboard-confirmOrder'>

            <div className='admin-dashboard-orderprocess-heading'>
                <h2>Order Details</h2>
            </div>

        {loading? <Loader/> : (
            <div className='confirm-order'>

            <div className='confirm-address-container'>
                <div className='confirm-address-wrapper'>
                    <h2 className='admin_confirm-shipping-info-heading'>Shipping Info</h2>

                    <div className='confirm-address-name'>
                        <p>Name:</p>
                        <span>{order.user && order.user.name}</span>
                    </div>

                    <div className='confirm-address-phone'>
                        <p>Phone no:</p>
                        <span>{order.shippingInfo && order.shippingInfo.phoneNo}</span>
                    </div> 

                    <div className='confirm-address-address'>
                        <p>Address:</p>
                        <span>{order.shippingInfo && order.shippingInfo.address}</span>
                    </div>

                    <div className='confirm-address-city'>
                        <p>City:</p>
                        <span>{order.shippingInfo && order.shippingInfo.city}</span>
                    </div>

            
                    <div className='confirm-address-country'>
                        <p>country:</p>
                        <span>Pakistan</span>
                    </div>

                    <div className='confirm-address-zipcode'>
                        <p>ZipCode:</p>
                        <span>{order.shippingInfo && order.shippingInfo.pinCode}</span>
                    </div>


            </div>


            <div className='myorder-details-payment-process'>

                <span>
                    <h2>Payment Info</h2>
                </span>

                <div className='myorder-details-payment-status'>
                    <p className={order.paymentInfo && 
                        order.paymentInfo.status === "succeeded" ? "greenColor" : "redColor "}>
                            {order.paymentInfo && 
                                order.paymentInfo.status === "succeeded" ? "PAID" : "Cash On Delivery"}
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



            <h2 className='confirm-shipping-heading'>Your Cart Items</h2>

            <div className='confirm-cart-container'>
                {order.orderItems &&
                    order.orderItems.map((item) => (
                    <div key={item.product} className='admin-order-detial-wrapper'>
                    
                        <div className='admin-product-order-detail'>
                            <img src={item.image} alt="Product"/>

                                <Link to={`/product/${item.product}`} className='admin-product--order-name'>
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

            <div style={{
                        display: order.orderStatus === "Delivered" ? "none" : "block"
                    }}>
                          
                <form 
                    onSubmit={updateOrderSubmitProcessHandler}
                    className='admin-dashboard-process-form'
                >

                    <div className='admin-dashboard-process-heading'>
                        <h2>Process Order</h2>
                    </div>

                   
                    <div className='admin-dashboard-process-categories'>
                        <BiCategory size={30} color='tomato'/>
                        <select onChange={(e) => setStatus(e.target.value)}>
                            <option value="">Choose Category</option>
                            {order.orderStatus === "Processing" && (
                                <option value="Shipped">Shipped</option>
                            )}
                            {order.orderStatus === "Shipped" && (
                                <option value="Delivered">Delivered</option>
                            )}
                        </select>
                    </div>

                   

                  
                    

                    <button 
                        id="createProductBtn"
                        type='submit'
                        className='admin-dashboard-process-btn'
                        disabled={loading ? true : false || status === "" ? true : false}
                    >
                        Update Product
                    </button>
                    

                </form>
                
            </div>


        </div>
        )}

    </div>

        
</div>

</Fragment>
  )
}

export default ProcessOrder