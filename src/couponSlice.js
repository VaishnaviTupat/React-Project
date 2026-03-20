import { createSlice } from "@reduxjs/toolkit";
import { Coupons } from "./Coupons";

const couponSlice = createSlice({
  name: "coupon",
  initialState: {
    code: "",
    discount: 0,
    applied: false,
    message: ""
  },

  reducers: {
    applyCoupon: (state, action) => {
      const enterCode = action.payload.toUpperCase();

      if (Coupons[enterCode]) {
        state.code = enterCode;
        state.discount = Coupons[enterCode];
        state.applied = true;
        state.message = ``;
      } else {
        state.message = "Invalid coupon code.";
        state.applied = false;
        state.discount = 0;
      }
    },

    resetCoupon: (state) => {
      state.code = "";        
      state.discount = 0;     
      state.applied = false;  
      state.message = "";     
    }
  }
});

export const { applyCoupon, resetCoupon } = couponSlice.actions;

export default couponSlice.reducer;