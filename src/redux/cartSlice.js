import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalPrice: 0,
  finalPrice: 0,
  totalCount: 0,
  tableNumber: null,
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
      const priceToAdd = Number(item.price) || 0;
      state.totalPrice = Number(state.totalPrice) + priceToAdd;
      state.totalCount += 1;
      state.totalPrice = Math.round(state.totalPrice);
      state.finalPrice = Math.round(state.totalPrice * 1.1);
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.items.find((i) => i.id === itemId);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
          state.totalPrice -= Number(existingItem.price) || 0;
          state.totalCount -= 1;
        } else {
          state.totalPrice -= Number(existingItem.price) || 0;
          state.items = state.items.filter((i) => i.id !== itemId);
          state.totalCount -= 1;
        }
      }
      state.totalPrice = Math.round(Math.max(state.totalPrice, 0));
      state.finalPrice = Math.round(state.totalPrice * 1.1);
    },
    removeItemCompletely: (state, action) => {
      const itemId = action.payload;
      const itemToRemove = state.items.find((i) => i.id === itemId);
      if (itemToRemove) {
        state.totalPrice -= (Number(itemToRemove.price) || 0) * itemToRemove.quantity;
        state.totalCount -= itemToRemove.quantity;
        state.items = state.items.filter((i) => i.id !== itemId);
      }
      state.totalPrice = Math.round(Math.max(state.totalPrice, 0));
      state.finalPrice = Math.round(state.totalPrice * 1.1);
    },
    setTableNumber: (state, action) => {
      state.tableNumber = action.payload;
      sessionStorage.setItem("tableNumber", action.payload);
    },
    // Yangi reducer: clearCart
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.finalPrice = 0;
      state.totalCount = 0;
      // tableNumber saqlanib qoladi, chunki u buyurtmadan mustaqil
    },
  },
});

export const { addToCart, removeFromCart, removeItemCompletely, setTableNumber, clearCart } = cartSlice.actions;
export default cartSlice.reducer;