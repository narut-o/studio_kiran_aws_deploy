
 import{ PRODUCT_DETAILS_REQUEST,PRODUCT_DETAILS_SUCCESS,PRODUCT_DETAILS_FAIL, CLEAR_ERROR} from "../constants/productConstants";

const productDetailsReducer = (state = {products:[]},action)=>{
    switch(action.type)
    {
        case PRODUCT_DETAILS_REQUEST:
            return{
                loading:true,
                ...state
            }
        case PRODUCT_DETAILS_SUCCESS:
               return{
                   loading:false,
                   product:action.payload
                   
               }
        case PRODUCT_DETAILS_FAIL:
              return{
                    loading:false,
                     error:action.payload
                   }
        case CLEAR_ERROR:
            return{
                ...state,
                error:null
            }
       
            default:return state;
    }

}

export default productDetailsReducer;