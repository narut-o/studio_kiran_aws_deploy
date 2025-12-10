import React from 'react'
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";



const AuthRoute = ({children}) => {
 const { loading, isAuthenticated} = useSelector((state) => state.user);

    if(loading===false)
    {
                  
 if(isAuthenticated){
    return children
  }
  return <Navigate to="/login" />
  
    }
}

export default AuthRoute
