import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import LayoutUser from "./layout/user.layout";
import store from "./redux-slice/store";
import { Home } from "./pages/users/Home";
import { Login } from "./pages/users/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import List from "./pages/users/Supplier/List";
import { Detail } from "./pages/users/Supplier/Detail";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutUser />}>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/supplier" element={<List />} >
            <Route path="/supplier/:code" element={<Detail />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/auth/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
    {/* </React.StrictMode> */}
  </Provider>
);

reportWebVitals();
