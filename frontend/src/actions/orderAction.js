import * as api from '../api/index';
import axios from 'axios';

import { ALL_ORDERS_FAIL, ALL_ORDERS_REQUEST, ALL_ORDERS_SUCCESS, CLEAR_ERRORS, MY_ORDERS_FAIL, MY_ORDERS_REQUEST, MY_ORDERS_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, UPDATE_ORDER_FAIL, UPDATE_ORDER_REQUEST, UPDATE_ORDER_SUCCESS } from '../constants/orderConstants';

export const myOrders =()=>async(dispatch)=>{
    try {
        dispatch({
            type:MY_ORDERS_REQUEST
        });
        const {data}  = await api.getMyOrders();
     
        dispatch({
            type:MY_ORDERS_SUCCESS,
            payload:data.orders
        })
    } catch (error) {
        dispatch({
            type:MY_ORDERS_FAIL,
            payload:error.response.data.message
        })
    }
}
export const getOrderDetails = (id)=>async(dispatch)=>{
    try {
        dispatch({
            type:ORDER_DETAILS_REQUEST
        })
    const {data}  = await api.getOrderDetails(id);
    
    dispatch({
        type:ORDER_DETAILS_SUCCESS,
        payload:data.order
    })
        
    } catch (error) {
        dispatch({
            type:ORDER_DETAILS_FAIL,
            payload:error.response.data.message
        })
    }
}

// get all orders (admin) with pagination
export const getAllOrders = (page = 1) => async (dispatch) => {
  try {
    dispatch({ type: "ALL_ORDERS_REQUEST" });

    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/admin/orders?page=${page}&limit=20`,
      { withCredentials: true }
    );

    dispatch({
      type: "ALL_ORDERS_SUCCESS",
      payload: {
        orders: data.orders,
        totalAmount: data.totalAmount,
        totalOrders: data.totalOrders,
        resultPerPage: data.resultPerPage,
        currentPage: data.currentPage,
        totalPages: data.totalPages,
      },
    });
  } catch (error) {
    dispatch({
      type: "ALL_ORDERS_FAIL",
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const updateOrder = (id, status) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDER_REQUEST });
    await api.updateOrder(id,status);
    dispatch({
      type: UPDATE_ORDER_SUCCESS,
      payload: true,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};


// export const updateOrder = (id, status) => async (dispatch) => {
//   try {
//     dispatch({ type: UPDATE_ORDER_REQUEST });

//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//       withCredentials: true, // if you use cookies for auth
//     };

//     console.log("Sending to backend:", { status }); // DEBUG

//     const { data } = await api.put(`/admin/order/${id}`, { status }, config);

//     console.log("Backend response:", data); // DEBUG

//     dispatch({
//       type: UPDATE_ORDER_SUCCESS,
//       payload: true,
//     });
//   } catch (error) {
//     console.error("Update order error:", error); // DEBUG
//     dispatch({
//       type: UPDATE_ORDER_FAIL,
//       payload: error.response?.data?.message || error.message,
//     });
//   }
// };



export const clearErrors = ()=>async(dispatch)=>{
    dispatch({type:CLEAR_ERRORS});
}