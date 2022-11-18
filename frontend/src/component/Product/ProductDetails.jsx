import React,{Fragment, useEffect, useState} from 'react'
import Carousel from 'react-material-ui-carousel'
import ReviewCard from './ReviewCard.jsx'
import {useSelector, useDispatch} from 'react-redux';
import { clearErrors, getProductDetails, newReview } from '../../actions/productAction';
import Loader from '../layout/loader/Loader'
import {useAlert} from 'react-alert'
import MetaData from '../layout/MetaData.js';
import {addItemsToCart} from '../../actions/cartAction'

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { Rating } from '@mui/material';

import './ProductDetails.css'
import { NEW_REVIEW_REST } from '../../constants/productConstants.js';


const ProductDetails = ({match}) => {

    const alert = useAlert();

    const dispatch = useDispatch();

    const {product, loading, error} = useSelector((state)=> state.productDetails);
    const {success, error: reviewError} = useSelector((state)=> state.newReview);

    const [quantity, setQuantity] = useState(1);
    
    // usestate for reviwe/
    const [open, setOpen] = useState(false)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState("")

    const increaseQuantity = () => {

        if(product.stock <= quantity) return;

        const qty = quantity + 1;
        setQuantity(qty);
    }

    const decreaseQuantity = () => {
        if(1 >= quantity) return;

        const qty = quantity - 1;
        setQuantity(qty);
    }

    // add to cart  handler
    const addToCartHandler = () => {
        dispatch(addItemsToCart(match.params.id, quantity));
        alert.success("Item Added To Cart ")
    }

    // submit comment or review handler
    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
    }

    const reviewSubmitHandler = () => {

        const myForm = new FormData();

        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", match.params.id);

        dispatch(newReview(myForm));

        setOpen(false);
    };

    // ===================

    useEffect(() =>{

        if(error){
            alert.error(error);
            dispatch(clearErrors())
        }

        if(reviewError){
            alert.error(reviewError);
            dispatch(clearErrors())
        }

        if(success){
            alert.success("Review Submitted Successfully");
            dispatch({type: NEW_REVIEW_REST});
        }

        dispatch(getProductDetails(match.params.id))

    }, [dispatch, match.params.id, product, error, reviewError, success, alert])

    const options = {
        size: "large",
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
      }
    
    const carosel ={
        navButtonsAlwaysVisible: true,
        animation: "fade"
    }

  

  return (
   
    <Fragment>

        {loading ? <Loader/> :(

        <Fragment >

        <MetaData title={`${product.name} --ECOMMERCE`}/>

        <div className="Product-container">
            
            <div className='carousel'>
                <Carousel {...carosel}>
                    {product.images &&
                        product.images.map((item, i) => (
                            <img 
                                className='img-carosal'
                                key={item.url}
                                src={item.url}
                                alt={`${i} Slide`}
                            />
                        ))
                    }
                </Carousel>
            </div>
                
            <div className='detailsBlock'>       
                <div className='detailsBlock-2'>
                    <h2>{product.name}</h2>
                    <p>SKU : {product._id}</p>
                </div>
                
                <div className='detailsBlock-3'>
                    <Rating {...options}/>
                    <span className='reviews-blacok'>{product.numberofReviews} Reviews</span>
                </div>

                <div className='detailsBlock-4'>
                    <h1>{`RS ${product.price}`}</h1>

                    <div className='detailsBlock-4-1'>

                        <div className='detailsBlock-4-2'>
                            <button className="minus" onClick={decreaseQuantity}>-</button>
                            <input type="number"   value={quantity} readOnly/>
                            <button className="plus" onClick={increaseQuantity}>+</button>
                        </div>

                        <button disabled={product.stock < 1 ? true : false} onClick={addToCartHandler}>Add to Cart</button>

                    </div>

                    <p>Status: {" "}

                        <b className={product.stock < 1 ? "OutOfStock": "InStock"}>
                            {product.stock < 1 ? "OutOfStock" : "InStock"}
                        </b>

                    </p>

                </div>

                <div className="detailsBlock-5">
                    <span>Description :</span> 
                    <p>{product.description}</p>
                    <p>{product.descriptionA}</p>
                    <p>{product.descriptionB}</p>
                    <p>{product.descriptionC}</p>
                </div>

                <button className='submit-review' onClick={submitReviewToggle}>Submit Review</button>
                
            </div>

        </div>

        

        {/* submit review box */}
        <Dialog
            aria-labelledby='simple-dialog-title'
            open={open}
            onClose={submitReviewToggle}
        >

            <DialogTitle>Submit Review</DialogTitle>

            <DialogContent className='submitdialog'>
                <Rating 
                    onChange={(e) => setRating(e.target.value)}
                    value={rating}
                    size="large"
                />
                <textarea  cols="30" rows="5"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="dialogbox-textarea"
                ></textarea>

                <DialogActions>
                    <Button color="secondary" onClick={submitReviewToggle}>Cancel</Button>
                    <Button color="primary" onClick={reviewSubmitHandler}>Submit</Button>
                </DialogActions>

            </DialogContent>

        </Dialog>
        {/*  */}
        
        <h3 className="Allreviews">Reviews</h3>

        {product.reviews && product.reviews[0] ? (
            <div className="displayallreviews">
                {product.reviews.map((review) => 
                    <ReviewCard review={review}/>
                )}
            </div>
        ): 
            <p className="no-reviews">Not Reviews Yet</p>
        }

        </Fragment>

        )}

    </Fragment>

  )
}

export default ProductDetails