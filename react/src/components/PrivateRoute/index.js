import React from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "./utils/authToken";

const PrivateRoute = ({ element }) => {
  const token = getToken();

  if (!token) {
    // Nếu không có token, điều hướng về trang login
    return <Navigate to="/login" />;
  }

  return element; // Nếu có token, hiển thị component được truyền vào
};

export default PrivateRoute;
