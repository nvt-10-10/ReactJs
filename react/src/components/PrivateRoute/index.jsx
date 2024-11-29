import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { checkTokens } from "../../redux-slice/auth/thunk";

export const PrivateRoute = ({ element }) => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const verifyLogin = async () => {
      const result = await dispatch(checkTokens()).unwrap(); // Sử dụng `.unwrap()` nếu bạn đang dùng Redux Toolkit
      console.log({result});
      
      if (result === true) {
        setIsLogin(true);
      }
    setIsLoading(true)

    };
    verifyLogin();
  }, [dispatch, isLoggedIn]);

  if (!isLoading) {
    return <div>Loading...</div>;
  }

  // Chuyển hướng nếu chưa đăng nhập
  if (!isLogin && isLoading) {
    return <Navigate to="/auth/login" />;
  }

  return element;
};
