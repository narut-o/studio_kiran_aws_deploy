import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL,RESET_PASSWORD_FAIL,RESET_PASSWORD_SUCCESS,RESET_PASSWORD_REQUEST, CLEAR_ERROR, REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS, LOAD_USER_FAIL, LOAD_USER_REQUEST,LOAD_USER_SUCCESS, LOGOUT_FAIL, LOGOUT_SUCCESS, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL, UPDATE_PASSWORD_FAIL, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAIL, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS} from "../constants/userConstants"
import * as api from "../api/index";

export const login = (email,password)=>async(dispatch)=>{
   try {
       dispatch({
           type:LOGIN_REQUEST
        });
        const {data} = await api.login(email,password);
    
        dispatch({
            type:LOGIN_SUCCESS,
            payload:data.user
        })
   } catch (error) {
      
       dispatch({
           type:LOGIN_FAIL,
           payload:error.response.data.message
       })
   }
}

export const logout = ()=>async(dispatch)=>{
    try {
        await api.logout();
        dispatch({
            type:LOGOUT_SUCCESS
        })
    } catch (error) {
        dispatch({
            type:LOGOUT_FAIL,
            payload:error.response.data.message
        })
    }
}

export const register = (userData)=>async(dispatch)=>{
    try {
        dispatch({
            type:REGISTER_REQUEST
        });
        const {data} = await api.signup(userData);

        dispatch({
            type:REGISTER_SUCCESS,
            payload:data.user
        })
        
    } catch (error) {
        dispatch({
            type:REGISTER_FAIL,
            payload:error.response.data.message
        })
    }
}
export const getUser = ()=>async(dispatch)=>{
    try {
        dispatch({
            type:LOAD_USER_REQUEST
        });
        const {data} = await api.getUser();
      
        dispatch({
            type:LOAD_USER_SUCCESS,
            payload:data.user
        })
        
    } catch (error) {
        dispatch({
            type:LOAD_USER_FAIL,
            payload:error.response.data.message
        })
    }
}


export const updateProfile = (userData)=>async(dispatch)=>{
    try {
        dispatch({
            type:UPDATE_PROFILE_REQUEST
        });
        const {data} = await api.updateProfile(userData);
     
        dispatch({
            type:UPDATE_PROFILE_SUCCESS,
            payload:data.success
        })
        
    } catch (error) {
        dispatch({
            type:UPDATE_PROFILE_FAIL,
            payload:error.response.data.message
        })
    }
}
export const updatePassword = (password) =>async(dispatch)=>{
    try {
        dispatch({
            type:UPDATE_PASSWORD_REQUEST
        });
        const {data} = await api.updatePassword(password);
        dispatch({
             type:UPDATE_PASSWORD_SUCCESS,
             payload:data.success
        });
    } catch (error) {
      dispatch({
          type:UPDATE_PASSWORD_FAIL,
          payload:error.response.data.message
      })        
    }
}
export const forgotPassword = (email)=>async(dispatch)=>{
        try {
            dispatch({
                type:FORGOT_PASSWORD_REQUEST
            });
            const {data} =  await api.forgotPassword(email);
            dispatch({
                type:FORGOT_PASSWORD_SUCCESS,
                payload:data.message
            })
            
        } catch (error) {
            dispatch({
                type:FORGOT_PASSWORD_FAIL,
                payload:error.response.data.message
            })
        }
}

export const resetPassword = (token,passwords)=>async(dispatch)=>{

    try {
        
        dispatch({
            type:RESET_PASSWORD_REQUEST,
        });
        const {data} = await api.resetPassword(token,passwords);
        dispatch({
            type:RESET_PASSWORD_SUCCESS,
            payload:data.user
        })
    } catch (error) {
        dispatch({
            type:RESET_PASSWORD_FAIL,
            payload:error.response.data.message
        })
    }
}




export const clearErrors = ()=>async(dispatch)=>{
    dispatch({type:CLEAR_ERROR});
}