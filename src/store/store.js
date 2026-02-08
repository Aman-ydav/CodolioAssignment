import { configureStore } from "@reduxjs/toolkit";
import sheetReducer from "./sheetSlice";

export const store = configureStore({
  reducer: {
    sheet: sheetReducer,
  },
});
