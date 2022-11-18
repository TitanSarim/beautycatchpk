import React,{Fragment, useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import { useAlert } from 'react-alert';
import { DataGrid } from "@material-ui/data-grid";
import { clearErrors, deleteReview, getallReview  } from '../../actions/productAction';
import {GiRoundStar} from 'react-icons/gi';
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar';
import { Button } from "@material-ui/core";
import {AiOutlineDelete} from 'react-icons/ai';

import './ProductReviews.css'
import { DELETE_REVIEW_REST } from '../../constants/productConstants';













const ProductReviews = ({history}) => {




    const dispatch = useDispatch()
    const alert = useAlert();

    const {error, reviews, loading} = useSelector((state)=> state.productReviews);
    const {error: deleteError, isDeleted} = useSelector((state)=> state.deleteReview);

    const deleteReviewHandler = (reviewId) =>{
        dispatch(deleteReview(reviewId,productId))
    }

    const [productId, setProductId] = useState("")
    
    const ProductReviewSubmitHandler = (e) => {
        e.preventDefault();

        dispatch(getallReview(productId))

    }


    useEffect(() => {


        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }

        if(deleteError){
            alert.error(error)
            dispatch(clearErrors())
        }

        if(isDeleted){
            alert.success("Review Deleted Successfully");
            history.push("/admin/products");
            dispatch({type: DELETE_REVIEW_REST});
        }

    }, [dispatch, alert, error, deleteError, isDeleted, history])

    const columns = [
        {field: "id", headerName:"Review ID", minWidth: 200, flex: 0.5},
        {field: "name", headerName:"Name", minWidth: 150, flex: 0.3},
        {field: "comment", headerName:"Comment", minWidth: 350, flex: 1},
        {field: "rating", headerName:"Rating", type:"number", minWidth: 250, flex: 0.5,

            cellClassName: (params)  =>{
                return params.getValue(params.id,"rating") >= "3" 
                    ? "greenColor" : "redColor"
                },
        },

        {field: "actions", headerName:"Actions", type:"number", minWidth: 150, flex: 0.3, sortable:false,
            renderCell: (params) => {
                return(
                    <Fragment>
                        <Button onClick={(e) => deleteReviewHandler(params.getValue(params.id, "id"))}>
                            <AiOutlineDelete size={23} color="tomato"/>
                        </Button>

                    </Fragment>
                );
            }
        },
    ]

    const rows = [];

    reviews && 
        reviews.forEach((item) => {
            rows.push({
                id: item._id,
                rating: item.rating,
                comment: item.comment,
                name: item.name,
            })
        })





  return (
    <Fragment>

        <MetaData title={`All REVIEWS - Admin`} />

        <div className='admin-dashboard'>

            <Sidebar/>

            <div className='admin-dashboard-product-reviews'>

                <form 
                    encType='multipart/form-data'
                    onSubmit={ProductReviewSubmitHandler}
                    className='admin-dashboard-product-reviews-form'
                >
    
                    <div className='admin-dashboard-product-reviews-heading'>
                        <h2>All Reviews</h2>
                    </div>
        
                    <div className='admin-dashboard-product-reviews-name'>
                        <GiRoundStar size={30} color="tomato"/>
                        <input 
                            type="text" 
                            placeholder='Enter Product Id'
                            required
                            value={productId}
                            onChange={(e) =>  setProductId(e.target.value)}    
                        />
                    </div>
        
        
                    <button 
                        id="createProductBtn"
                        className='admin-dashboard-product-reviews-btn'
                        disabled={loading ? true : false ||  productId === "" ? true : false} 
                    >
                        Search
                    </button>
                        
    
                </form>

                {reviews && reviews.length > 0 ? 

                     <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    className=''
                    autoHeight
                />

                :
                
                <div className='admin-dashboard-product-review-noreview'>
                    <h1>No Reviews Found</h1>
                </div>
                }

            </div>

        </div>

    </Fragment>
  )
}

export default ProductReviews