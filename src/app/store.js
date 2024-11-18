// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "../features/itemSlice";

export const store = configureStore({
  reducer: {
    items: itemsReducer,
  },
});
