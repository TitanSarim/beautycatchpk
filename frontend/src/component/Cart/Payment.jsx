import React,{Fragment, useEffect} from 'react'
import CheckoutSteps from './CheckoutSteps';
import MetaData from '../layout/MetaData'
import { useAlert } from 'react-alert';
import {useSelector, useDispatch} from 'react-redux';


import {createOrder, clearErrors} from '../../actions/orderAction'


import './Payment.css'






const Payment = ({history}) => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const {shippingInfo, cartItems} = useSelector((state)=> state.cart);
    const {user} = useSelector((state)=> state.user)
    const {error} = useSelector((state)=> state.newOrder)

    const orderInfo= JSON.parse(sessionStorage.getItem("orderInfo"));

  

    // create order for for user 
    const order = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo.subtotal,
        // taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice,
    }

    
    const submitHandler = (e) => {

        e.preventDefault();

        dispatch(createOrder(order));

        history.push("/success");

    }
    //    `/api/v1/order/new`
    
    // 
    useEffect(() => {
      if(error){
        alert.error(error);
        dispatch(clearErrors())
      }
    
    }, [dispatch, error, alert])
    

  return (
    <Fragment>

        <MetaData title="Payment"/>

        <CheckoutSteps activeStep={2}/>

        <div className='payment-contianer'>

            <form onSubmit={(e) => submitHandler(e)}   className='payment-form'>

                <div className='payment-cardinfo-heading'>
                    <h2>Payment Info</h2>
                </div>

                <div>
                    <h2>
                        Cash On Delivery
                    </h2>
                </div>

                <input 
                    onSubmit={(e) => submitHandler(e)}
                    type="submit" 
                    value={`Place Order of RS ${orderInfo && orderInfo.totalPrice} `}
                    className='payment-stripe-btn'   
                />

            </form>
        </div>


    </Fragment>
  )
}

export default Payment 