import React,{Fragment} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {addItemsToCart, removeItemsToCart} from '../../actions/cartAction'
import {MdOutlineRemoveShoppingCart} from 'react-icons/md'
import { Typography } from "@material-ui/core";
import { Link } from 'react-router-dom';

import CartItemCard from './CartItemCard'

import './Cart.css';






const Cart = ({history}) => {

    const dispatch = useDispatch();

    const {cartItems} = useSelector((state)=> state.cart);

    // increase quantity
    const increaseQuantity = (id, quantity, stock) =>{
        const newQty = quantity + 1;
        if(stock <= quantity){
            return;
        }

        dispatch(addItemsToCart(id, newQty));
    }

    // decrease quantity
    const decreaseQuantity = (id, quantity) =>{
        const newQty = quantity - 1;
        if(1 >= quantity){
            return;
        }

        dispatch(addItemsToCart(id, newQty));
    }

    // delete cart item
    const deleteCartItems = (id) =>{
        dispatch(removeItemsToCart(id));

    }

    // check out
    const checkoutHandler = () => {
        history.push("/login?redirect=shipping")
    }

  return (
   <Fragment>

    {cartItems.length === 0 ? (
        
        <div className="cart-emptycart">
            <span>
                <MdOutlineRemoveShoppingCart size={60} />
            </span>
            <Typography>No Product Found In your Cart</Typography>
            <Link to="/products" className='cart-toproducts'>Add Products</Link>
        </div>) : (
    
        <Fragment>
            
            <div className="cartPage">
                <div className="cartHeader">
                    <p>Product</p>
                    <p>Quantity</p>
                    <p>SubTotal</p>
                </div>


                {cartItems && cartItems.map((item) =>(
                   
                        <div className='cart-container' key={item.product}>

                            <CartItemCard item={item} deleteCartItems={deleteCartItems}/>

                            <div className='cart-quantity'>
                                <button className='minus' onClick={() => decreaseQuantity(item.product, item.quantity)}>-</button>
                                <input type="number" readOnly value={item.quantity}/>
                                <button className='plus' onClick={() =>increaseQuantity(item.product, item.quantity, item.stock )}>+</button>
                            </div>

                            <p className='cart-subtotal'>{`${item.price * item.quantity}`} RS</p>
                        </div>
                    
                ))}


                <div className='cart-grossprofit'>
                    <div></div>
                    <div className='cart-grossprofit-box'>
                        <p>Total Amount</p>
                        <p>{`${cartItems.reduce(
                                (acc, item) => acc + item.quantity * item.price, 0
                            )}`} RS</p>
                    </div>

                    <div></div>  

                    <div className='cart-checkoutbtn'>
                        <button onClick={checkoutHandler}>Check Out</button>
                    </div>
                </div>

            </div>

        </Fragment>

    )}

   </Fragment>
  )
}

export default Cart