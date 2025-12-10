import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../layout/Loader/Loader";

const AdminRoute = ({ children }) => {
  const { loading, isAuthenticated, user } = useSelector(
    (state) => state.user
  );

  if (loading) return <Loader />;

  if (!isAuthenticated || user?.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AdminRoute;