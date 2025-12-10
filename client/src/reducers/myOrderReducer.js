import { CLEAR_ERRORS, MY_ORDERS_FAIL, MY_ORDERS_REQUEST, MY_ORDERS_SUCCESS } from "../constants/orderConstants";


const myOrdersReducer = (state={orders:[]},action)=>{
    switch (action.type) {
        case MY_ORDERS_REQUEST:
            return{
                loading:true
            }
        case MY_ORDERS_SUCCESS:
            return{
                loading:false,
                orders:action.payload
            }
        case MY_ORDERS_FAIL:
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
export default myOrdersReducer;