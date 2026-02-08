import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSheet = createAsyncThunk("sheet/fetchSheet", async () => {
  const res = await axios.get(
    "https://node.codolio.com/api/question-tracker/v1/sheet/public/get-sheet-by-slug/striver-sde-sheet",
  );
  console.log(res.data.data.questions);
  return res.data.data;
});

const initialState = {
  topics: [],
  status: "idle",
  error: null,
};

const sheetSlice = createSlice({
  name: "sheet",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSheet.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSheet.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.topics = action.payload;
      })
      .addCase(fetchSheet.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default sheetSlice.reducer;
