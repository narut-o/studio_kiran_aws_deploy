import { CLEAR_ERROR, UPDATE_PROFILE_FAIL, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_RESET, UPDATE_PROFILE_SUCCESS,UPDATE_PASSWORD_SUCCESS,UPDATE_PASSWORD_RESET,UPDATE_PASSWORD_FAIL,UPDATE_PASSWORD_REQUEST } from "../constants/userConstants";


const profileReducer = (state={user:{}},action)=>{

   switch (action.type) {
       case UPDATE_PROFILE_REQUEST:
       case UPDATE_PASSWORD_REQUEST:
           return{
               ...state,
               loading:true
           };
        case UPDATE_PROFILE_SUCCESS:
        case UPDATE_PASSWORD_SUCCESS:
            return{
                ...state,
                loading:false,
                isUpdated:action.payload
            };
        case UPDATE_PROFILE_RESET:
        case UPDATE_PASSWORD_RESET:
            return{
                ...state,
                isUpdated:false
            }
        case UPDATE_PROFILE_FAIL:
        case UPDATE_PASSWORD_FAIL:
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

export default profileReducer;