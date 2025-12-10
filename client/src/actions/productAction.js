
import {ALL_PRODUCT_REQUEST,ALL_PRODUCT_SUCCESS,ALL_PRODUCT_FAIL,CLEAR_ERROR,PRODUCT_DETAILS_REQUEST,PRODUCT_DETAILS_SUCCESS,PRODUCT_DETAILS_FAIL, NEW_REVIEW_FAIL, NEW_REVIEW_REQUEST, NEW_REVIEW_SUCCESS} from "../constants/productConstants";
import * as api from "../api/index";

export const getAllProducts = (keyword='',page=1,price=[0,30000],category,ratings)=>async(dispatch)=>{
    try {

        dispatch({
            type:ALL_PRODUCT_REQUEST
        });
        const {data} = await api.getAllProducts(keyword,page,price,category,ratings);
       
        dispatch({
            type:ALL_PRODUCT_SUCCESS,
            payload:data
        })
        
    } catch (error) {
        dispatch({
            type:ALL_PRODUCT_FAIL,
            payload:error
        })
    }
}

export const getProductDetails =(id)=>async(dispatch)=>{
    try {

        dispatch({
            type:PRODUCT_DETAILS_REQUEST
        });
        const {data} = await api.getProductDetails(id);
       
        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload:data.product
        })
        
    } catch (error) {
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload:error.response.data.message
        })
    }
}
export const newReview = (reviewData)=>async(dispatch)=>{
    try {
        dispatch({
            type:NEW_REVIEW_REQUEST
        });
        const {data} = await api.createReview(reviewData);
        dispatch({
            type:NEW_REVIEW_SUCCESS,
            payload:data.success
        })
        
    } catch (error) {
        dispatch({
            type:NEW_REVIEW_FAIL,
            payload:error.response.data.message
        })
    }
}






















export const clearErrors = ()=>async(dispatch)=>{
    dispatch({type:CLEAR_ERROR});
}