import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./CartSlice";
import couponReducer from "./couponSlice";
import orderReducer from "./OrderSlice";


const Store = configureStore({
  reducer: {
    cart: cartReducer,
    orders : orderReducer,
    coupon : couponReducer,
   
  },
});

export default Store;