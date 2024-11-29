import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import LayoutUser from "./layout/user.layout";
import { PrivateRoute } from "./components/PrivateRoute";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { Home } from "./pages/users/Home";
import { Spinner } from "react-bootstrap";
import Loading from "./components/Loading";
// Sử dụng React.lazy để lazy-load các component
// const Home = React.lazy(() => import("./pages/users/Home"));
const Login = React.lazy(() => import("./pages/users/Login"));
const List = React.lazy(() => import("./pages/users/Supplier/List"));
const Detail = React.lazy(() => import("./pages/users/Supplier/Detail"));
const ListQuote = React.lazy(() => import("./pages/users/Quote/List"));
const Create = React.lazy(() => import("./pages/users/Quote/Create"));

// import PrivateRoute from "./components/PrivateRoute";
const App = () => {
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    // Trì hoãn hiển thị fallback sau 1 giây
    const timer = setTimeout(() => {
      setShowFallback(true);
    }, 1500);

    return () => clearTimeout(timer); // Dọn dẹp timer nếu component unmount
  }, []);

  return (
    <BrowserRouter>
      <Suspense fallback={showFallback ? <Loading /> : null}>
        <Routes>
          {/* LayoutUser là layout chính, chứa các route con */}
          <Route path="/" element={<LayoutUser />}>
            <Route index element={<Home />} />
            <Route path="/supplier" element={<List />} />
            <Route path="/supplier/:slug/:code" element={<Detail />} />
            <Route path="/quote" element={<ListQuote />} />
            <Route path="/quote/:slug/:code" element={<Detail />} />

            <Route
              path="/quote/create"
              element={<PrivateRoute element={<Create />} />}
            />
          </Route>

          {/* Đảm bảo bảo vệ các route sau khi login */}
          <Route element={<ProtectedRoute />}>
            <Route path="/auth/login" element={<Login />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
