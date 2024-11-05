import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./auth/slice/auth.slice";
import userSlice from "./user/slice/user.slice";
import categorySlice from "./categories/slice/category.slice";
import productSlice from "./products/slice/product.slice";
const rootReducer = combineReducers({
    auth: authSlice,
    user: userSlice,
    category: categorySlice,
    product: productSlice,
});

export default rootReducer;
