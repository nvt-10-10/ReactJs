import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import store from '../../redux-slice/store';
import { setIsLogin } from '../../redux-slice/auth/slice';

const ProtectedRoute = ({ redirectPath = '/' }) => {
  const dispatch = store.dispatch;
useEffect(()=>{
  const token = localStorage.getItem("authToken")
  if(token){
    dispatch(setIsLogin(true))
  }
})
  const isLogin = useSelector(state => state.isLogin);

  if (isLogin) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;