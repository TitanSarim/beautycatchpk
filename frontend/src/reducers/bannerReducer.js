import{
    ALL_BANNER_REQUEST,
    ALL_BANNER_SUCCESS,
    ALL_BANNER_FAIL,
    ALL_ADMIN_BANNER_REQUEST,
    ALL_ADMIN_BANNER_SUCCESS,
    ALL_ADMIN_BANNER_FAIL,
    NEW_BANNER_SUCCESS,
    NEW_BANNER_REQUEST,
    NEW_BANNER_REST,
    NEW_BANNER_FAIL,
    DELETE_BANNNER_SUCCESS,
    DELETE_BANNNER_REQUEST,
    DELETE_BANNNER_REST,
    DELETE_BANNNER_FAIL,
    CLEAR_ERRORS,
} from '../constants/bannerConstants'


// banners reducer
export const bannerReducer = (state = {banners: [] }, action) =>{

    switch(action.type){
        case ALL_BANNER_REQUEST:
        case ALL_ADMIN_BANNER_REQUEST:
            return{
                ...state,
                loading: true,
                banners: [],
            }

        case  ALL_BANNER_SUCCESS:
            return{
                loading: false,
                banners: action.payload.banners,
            }

        case ALL_ADMIN_BANNER_SUCCESS:
            return{
                loading: false,
                banners: action.payload,
            }

        case  ALL_BANNER_FAIL:
        case ALL_ADMIN_BANNER_FAIL:
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



// CREATE new Banner --Admin
export const newBannerReducer = (state = {banner: {} }, action) =>{

    switch(action.type){
        case NEW_BANNER_REQUEST:
            return{
                loading: true,
                ...state,
            }

        case  NEW_BANNER_SUCCESS:
            return{
                loading: false,
                success: action.payload.success,
                banner: action.payload.banner
            }

        case  NEW_BANNER_FAIL:
            return{
                ...state,
                loading: false,
                error: action.payload
            }

        case NEW_BANNER_REST:
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

// Delete banner --Admin
export const deleteBannerReducer = (state = {}, action) =>{

    switch(action.type){
        case DELETE_BANNNER_REQUEST:
            return{
                loading: true,
                ...state,
            }

        case  DELETE_BANNNER_SUCCESS:
            return{
                ...state,
                loading: false,
                isDeleted: action.payload,
            }
   
        case  DELETE_BANNNER_FAIL:
            return{
                ...state,
                loading: false,
                error: action.payload
            }

        case DELETE_BANNNER_REST:
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
