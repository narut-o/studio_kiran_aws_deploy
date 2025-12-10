import { CLEAR_ERRORS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS } from "../constants/orderConstants";


const orderDetailsReducer = (state = {order:{}},action)=>{
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return{
                loading:true,
            }
        case ORDER_DETAILS_SUCCESS:
            return{
                loading:false,
                order:action.payload
            }
        case ORDER_DETAILS_FAIL:
            return{
                loading:false,
                error:action.payload
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null
            }
            
            
    
        default:
           return state;
    }
}

export default orderDetailsReducer;