import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import LayoutUser from "./layout/user.layout";
import { Home } from "./pages/users/Home";
import { Login } from "./pages/users/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import List from "./pages/users/Supplier/List";
import { Detail } from "./pages/users/Supplier/Detail";
import { List as ListQuote } from "./pages/users/Quote/List";
import { Create } from "./pages/users/Quote/Create";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* LayoutUser là layout chính, chứa các route con */}
        <Route path="/" element={<LayoutUser />}>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/supplier" element={<List />}></Route>
          <Route path="/supplier/:slug/:code" element={<Detail />} />
          <Route path="/quote" element={<ListQuote />}></Route>
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
    </BrowserRouter>
  );
};

export default App;
