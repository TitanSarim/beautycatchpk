import axios from 'axios';
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
    DELETE_BANNNER_FAIL,
    CLEAR_ERRORS,
} from '../constants/bannerConstants'


// getall banners
export const getBanners = () => async (dispatch) => {

    try {

        dispatch({type: ALL_BANNER_REQUEST});

        let link = `/api/v1/banners`;

        const {data} = await axios.get(link);

        dispatch({
            type:  ALL_BANNER_SUCCESS,
            payload: data,
        })
        
    } catch (error) {
        dispatch({
            type: ALL_BANNER_FAIL,
            payload: error.response.data.message,
        })
    }

};


// get all banner for admin
export const getAdminBanners = () => async (dispatch) => {
    
    try{

        dispatch({type: ALL_ADMIN_BANNER_REQUEST});
        
        const {data} = await axios.get(`/api/v1/admin/banners`);

        dispatch({
            type: ALL_ADMIN_BANNER_SUCCESS,
            payload: data.banners,
        });

    }catch (error) {
        dispatch({
            type: ALL_ADMIN_BANNER_FAIL,
            payload: error.response.data.message,
        })
    }

}


// Create Banner --Admin
export const createBanner = (bannerData) => async (dispatch) => {

    try {

        dispatch({type: NEW_BANNER_REQUEST});

        const config = {headers: { "Content-Type": "application/json" },}

        const {data} = await axios.post(`/api/v1/admin/banner/new`, bannerData, config);

        dispatch({
            type:  NEW_BANNER_SUCCESS,
            payload: data,
        })
        
    } catch (error) {
        dispatch({
            type: NEW_BANNER_FAIL,
            payload: error.response.data.message,
        })
    }

};


// delete  Banner --Admin
export const deleteBanner = (id) => async (dispatch) => {

    try {

        dispatch({type: DELETE_BANNNER_REQUEST});

        const {data} = await axios.delete(`/api/v1/admin/banners/${id}`);

        dispatch({
            type:  DELETE_BANNNER_SUCCESS,
            payload: data.success,
        })
        
    } catch (error) {
        dispatch({
            type: DELETE_BANNNER_FAIL,
            payload: error.response.data.message,
        })
    }

};


// clearing errors

export const clearErrors = () => async (dispatch) => {

    dispatch({type: CLEAR_ERRORS})

}