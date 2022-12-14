import {
        ALL_PRODUCT_REQUEST, 
        ALL_PRODUCT_SUCCESS, 
        ALL_PRODUCT_FAIL, 
        PRODUCT_DETAILS_REQUEST,
        PRODUCT_DETAILS_SUCCESS,
        PRODUCT_DETAILS_FAIL,
        NEW_REVIEW_REQUEST,
        NEW_REVIEW_SUCCESS,
        NEW_REVIEW_REST,
        NEW_REVIEW_FAIL,
        ADMIN_PRODUCT_REQUEST,
        ADMIN_PRODUCT_SUCCESS,
        ADMIN_PRODUCT_FAIL,
        NEW_PRODUCT_SUCCESS,
        NEW_PRODUCT_REQUEST,
        NEW_PRODUCT_REST,
        NEW_PRODUCT_FAIL,
        DELETE_PRODUCT_SUCCESS,
        DELETE_PRODUCT_REQUEST,
        DELETE_PRODUCT_REST,
        DELETE_PRODUCT_FAIL,
        UPDATE_PRODUCT_SUCCESS,
        UPDATE_PRODUCT_REQUEST,
        UPDATE_PRODUCT_REST,
        UPDATE_PRODUCT_FAIL,
        ALL_REVIEW_REQUEST,
        ALL_REVIEW_SUCCESS,
        ALL_REVIEW_FAIL,
        DELETE_REVIEW_REQUEST,
        DELETE_REVIEW_SUCCESS,
        DELETE_REVIEW_REST,
        DELETE_REVIEW_FAIL,
        CLEAR_ERRORS,
} from '../constants/productConstants'


// Products reducer
export const productReducer = (state = {products: [] }, action) =>{

    switch(action.type){
        case ALL_PRODUCT_REQUEST:
        case ADMIN_PRODUCT_REQUEST:
            return{
                loading: true,
                products: []
            }

        case  ALL_PRODUCT_SUCCESS:
            return{
                loading: false,
                products: action.payload.products,
                productCount: action.payload.productCount,
                resultPerPage: action.payload.resultPerPage,
                filteredProductsCount: action.payload.filteredProductsCount,
            }

        case ADMIN_PRODUCT_SUCCESS:
            return{
                loading: false,
                products: action.payload,
            }

        case  ALL_PRODUCT_FAIL:
        case ADMIN_PRODUCT_FAIL:
            return{
                loading: false,
                error: action.payload
            }

        case  CLEAR_ERRORS:
            return{
                ...state,
                error: null,
            }

        default:
            return state
        
    }

}


// Product detials reducer
export const productDetailsReducer = (state = {product: {} }, action) =>{

    switch(action.type){
        case PRODUCT_DETAILS_REQUEST:
            return{
                loading: true,
                ...state,
            }

        case  PRODUCT_DETAILS_SUCCESS:
            return{
                loading: false,
                product: action.payload,
            }

        case  PRODUCT_DETAILS_FAIL:
            return{
                loading: false,
                error: action.payload
            }

        case  CLEAR_ERRORS:
            return{
                ...state,
                error: null,
            }

        default:
            return state
        
    }

}


// Submit review
export const newReviewReducer = (state = {}, action) =>{

    switch(action.type){
        case NEW_REVIEW_REQUEST:
            return{
                loading: true,
                ...state,
            }

        case  NEW_REVIEW_SUCCESS:
            return{
                loading: false,
                success: action.payload,
            }

        case  NEW_REVIEW_FAIL:
            return{
                ...state,
                loading: false,
                error: action.payload
            }

        case NEW_REVIEW_REST:
            return{
                ...state,
                success: false,
            }

        case  CLEAR_ERRORS:
            return{
                ...state,
                error: null,
            }

        default:
            return state
        
    }

}






// CREATE new product --Admin
export const newProductReducer = (state = {product: {} }, action) =>{

    switch(action.type){
        case NEW_PRODUCT_REQUEST:
            return{
                loading: true,
                ...state,
            }

        case  NEW_PRODUCT_SUCCESS:
            return{
                loading: false,
                success: action.payload.success,
                product: action.payload.product
            }

        case  NEW_PRODUCT_FAIL:
            return{
                ...state,
                loading: false,
                error: action.payload
            }

        case NEW_PRODUCT_REST:
            return{
                ...state,
                success: false,
            }

        case  CLEAR_ERRORS:
            return{
                ...state,
                error: null,
            }

        default:
            return state
        
    }

}

// UPDATE  Product --Admin
export const updateProductReducer = (state = {}, action) =>{

    switch(action.type){
        
        case UPDATE_PRODUCT_REQUEST:
            return{
                loading: true,
                ...state,
            }

        case  UPDATE_PRODUCT_SUCCESS:
            return{
                ...state,
                loading: false,
                isUpdated: action.payload,
            }

        case  UPDATE_PRODUCT_FAIL:
            return{
                ...state,
                loading: false,
                error: action.payload
            }

        case UPDATE_PRODUCT_REST:
            return{
                ...state,
                isUpdated: false,
            }

        case  CLEAR_ERRORS:
            return{
                ...state,
                error: null,
            }

        default:
            return state
        
    }

}


// Delete Product --Admin
export const deleteProductReducer = (state = {}, action) =>{

    switch(action.type){
        case DELETE_PRODUCT_REQUEST:
            return{
                loading: true,
                ...state,
            }

        case  DELETE_PRODUCT_SUCCESS:
            return{
                ...state,
                loading: false,
                isDeleted: action.payload,
            }
   
        case  DELETE_PRODUCT_FAIL:
            return{
                ...state,
                loading: false,
                error: action.payload
            }

        case DELETE_PRODUCT_REST:
            return{
                ...state,
                isDeleted: false,
            }


        case  CLEAR_ERRORS:
            return{
                ...state,
                error: null,
            }

        default:
            return state
        
    }

}


// all reviews --Admin
export const allReviewssReducer = (state = {reviews: [] }, action) =>{

    switch(action.type){
        case ALL_REVIEW_REQUEST:
            return{
                loading: true,
                ...state,
            }

        case  ALL_REVIEW_SUCCESS:
            return{
                loading: false,
                reviews: action.payload,
            }

        case  ALL_REVIEW_FAIL:
            return{
                ...state,
                loading: false,
                error: action.payload
            }

        case  CLEAR_ERRORS:
            return{
                ...state,
                error: null,
            }

        default:
            return state
        
    }

}



// Delete Review --Admin
export const deleteReviewReducer = (state = {}, action) =>{

    switch(action.type){
        case DELETE_REVIEW_REQUEST:
            return{
                ...state,
                loading: true
            }

        case  DELETE_REVIEW_SUCCESS:
            return{
                ...state,
                loading: false,
                isDeleted: action.payload,
            }
   
        case  DELETE_REVIEW_FAIL:
            return{
                ...state,
                loading: false,
                error: action.payload,
            }

        case DELETE_REVIEW_REST:
            return{
                ...state,
                isDeleted: false,
            }


        case  CLEAR_ERRORS:
            return{
                ...state,
                error: null,
            }

        default:
            return state
        
    }

}
