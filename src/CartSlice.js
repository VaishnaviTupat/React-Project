import { createSlice } from "@reduxjs/toolkit";

let CartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      let existingItem = state.find(
        (item) => item.name === action.payload.name
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        let finalObject = { ...action.payload, quantity: 1 };
        state.push(finalObject);
      }
    },
    
    // INCREMENT logic
    incrementQty: (state, action) => {
      let item = state.find(
        (item) => item.name === action.payload.name
      );
      if (item) {
        item.quantity += 1;
      }
    },

    // DECREMENT logic
    decrementQty: (state, action) => {
      let item = state.find(
        (item) => item.name === action.payload.name
      );
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    removeCart: (state, action) => {
      return state.filter(
        (item) => item.name !== action.payload.name
      );
    },

    clearCart: () => []
  }
});
// ✅ Export BOTH actions
export const { addToCart,incrementQty,decrementQty,removeCart,clearCart } = CartSlice.actions;

export default CartSlice.reducer;