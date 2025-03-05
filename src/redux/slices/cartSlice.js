import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // Savatchadagi mahsulotlar
  totalPrice: 0,
  finalPrice: 0, // Xizmat haqqi bilan yakuniy narx
  totalCount: 0, // Umumiy mahsulotlar soni
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
      state.totalCount += 1; // Umumiy mahsulotlar sonini oshirish
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
          state.totalCount -= 1;
        } else {
          state.totalPrice -= existingItem.price;
          state.items = state.items.filter((i) => i.id !== itemId);
          state.totalCount -= 1;
        }
      }

      state.totalPrice = parseFloat(state.totalPrice.toFixed(0));
      state.finalPrice = parseFloat((state.totalPrice * 1.1).toFixed(0)); // 10% xizmat haqqi qayta hisoblandi
    },

    removeItemCompletely: (state, action) => {
      const itemId = action.payload;
      const itemToRemove = state.items.find((i) => i.id === itemId);

      if (itemToRemove) {
        state.totalPrice -= itemToRemove.price * itemToRemove.quantity;
        state.totalCount -= itemToRemove.quantity;
        state.items = state.items.filter((i) => i.id !== itemId);
      }

      state.totalPrice = parseFloat(state.totalPrice.toFixed(0));
      state.finalPrice = parseFloat((state.totalPrice * 1.1).toFixed(0));
    },
  },
});

export const { addToCart, removeFromCart, removeItemCompletely } = cartSlice.actions;
export default cartSlice.reducer;