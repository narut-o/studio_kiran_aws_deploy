import { CLEAR_ERROR,FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,FORGOT_PASSWORD_FAIL,
     RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL} from "../constants/userConstants";


const forgotPasswordReducer = (state={user:{}},action)=>{

   switch (action.type) {
       
       case FORGOT_PASSWORD_REQUEST:
       case RESET_PASSWORD_REQUEST:
           return{
               ...state,
               loading:true,
               error:null
           };
       
        case FORGOT_PASSWORD_SUCCESS:
            return{
                ...state,
                loading:false,
                message:action.payload
            };
        case RESET_PASSWORD_SUCCESS:
            return{
                ...state,
                loading:false,
                user:action.payload,
                isAuthenticated:true
            };
     
      
        case FORGOT_PASSWORD_FAIL:
        case RESET_PASSWORD_FAIL:
            return{
                ...state,
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

export default forgotPasswordReducer;