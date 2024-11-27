import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { checkTokens } from "../../redux-slice/auth/thunk";

const PrivateRoute = ({ element }) => {
  const dispatch = useDispatch();
  const { isLoggedIn, isLoading } = useSelector((state) => state.auth);
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    const verifyLogin = async () => {
      const result = await dispatch(checkTokens()).unwrap(); // Sử dụng `.unwrap()` nếu bạn đang dùng Redux Toolkit
      console.log({ result });

      if (result === true) {
        setIsLogin(true);
      }
    };
    verifyLogin();
  }, [dispatch, isLoggedIn]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Chuyển hướng nếu chưa đăng nhập
  if (!setIsLogin) {
    return <Navigate to="/auth/login" />;
  }

  // Hiển thị component nếu đã đăng nhập
  return element;
};

export default PrivateRoute;
