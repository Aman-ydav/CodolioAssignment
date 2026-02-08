import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  topics: [],
};

const sheetSlice = createSlice({
  name: "sheet",
  initialState,
  reducers: {},
});

export default sheetSlice.reducer;
