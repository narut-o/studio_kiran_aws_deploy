import {
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  ALL_ORDERS_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  UPDATE_ORDER_RESET,
  CLEAR_ERRORS,
} from "../constants/orderConstants";

// all orders list for admin
// reducers/orderReducer.js
export const allOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case "ALL_ORDERS_REQUEST":
      return { loading: true, orders: [] };

    case "ALL_ORDERS_SUCCESS":
      return {
        loading: false,
        orders: action.payload.orders,
        totalAmount: action.payload.totalAmount,
        totalOrders: action.payload.totalOrders,
        resultPerPage: action.payload.resultPerPage,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages,
      };

    case "ALL_ORDERS_FAIL":
      return { loading: false, error: action.payload };

    case "CLEAR_ERRORS":
      return { ...state, error: null };

    default:
      return state;
  }
};

// update order status reducer (admin)
export const orderAdminReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case UPDATE_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_ORDER_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};