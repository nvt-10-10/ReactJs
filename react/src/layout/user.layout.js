import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/users/header/header.js";
import "../assets/css/base/index.css";
import "../assets/css/common/index.css";


import { Footer } from "../components/Footer/Footer.js";
import { setIsLogin } from "../redux-slice/auth/slice/auth.slice.js";
import store from "../redux-slice/store.js";
const LayoutUser = () => {
  useEffect(() => {
    const dispatch = store.dispatch;
    const token = localStorage.getItem("authToken")
    if(token){
      dispatch(setIsLogin(true))
    }
    const link = document.createElement("link");
    link.rel = "icon";
    link.type = "image/x-icon";
    link.href = "/assets/favicon.png";
    document.head.appendChild(link);

    return () => {
      // Cleanup if necessary
      document.head.removeChild(link);
    };
  }, []);
  return (
    <div>
      <Header></Header>
      <main>
        {/* Render các component con ở đây */}
        <Outlet />
      </main>
      <Footer></Footer>
    </div>
  );
};

export default LayoutUser;
