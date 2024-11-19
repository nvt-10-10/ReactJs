import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkTokens } from "../../redux-slice/auth/thunk";

const PrivateRoute = ({ element }) => {
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(checkTokens());
  }, []);

  if (!isLogin) {
    // Nếu không có token, điều hướng về trang login
    // return <Navigate to="/auth/login" />;
  }

  return element; // Nếu có token, hiển thị component được truyền vào
};

export default PrivateRoute;
