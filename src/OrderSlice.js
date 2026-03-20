import { createSlice } from "@reduxjs/toolkit";

const generateOrderId = () => {
  return "ORD-" + Math.random().toString(36).substring(2, 10).toUpperCase();
};

const orderSlice = createSlice({
  name: "orders",
  initialState: [],
  reducers: {
    addOrder: (state, action) => {
           state.push(action.payload);
      const newOrder = {
        id: generateOrderId(),
        date: action.payload.date,
        items: action.payload.items,
        totalPrice: action.payload.totalPrice
      };

      state.push(newOrder);
    },
  },
});

export const { addOrder } = orderSlice.actions;
export default orderSlice.reducer;