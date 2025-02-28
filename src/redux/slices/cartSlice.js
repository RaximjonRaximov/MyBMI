import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // Savatchadagi mahsulotlar
  totalPrice: 0,
  finalPrice: 0, // Xizmat haqqi bilan yakuniy narx
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
      state.totalPrice += item.price;
      state.totalPrice = parseFloat(state.totalPrice.toFixed(0));
      state.finalPrice = parseFloat((state.totalPrice * 1.1).toFixed(0)); // 10% xizmat haqqi qo'shildi
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.items.find((i) => i.id === itemId);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
          state.totalPrice -= existingItem.price;
        } else {
          state.totalPrice -= existingItem.price;
          state.items = state.items.filter((i) => i.id !== itemId);
        }
      }
      state.totalPrice = parseFloat(state.totalPrice.toFixed(0));
      state.finalPrice = parseFloat((state.totalPrice * 1.1).toFixed(0)); // 10% xizmat haqqi qayta hisoblandi
    }
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;