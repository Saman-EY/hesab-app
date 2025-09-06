import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface bookSlice {
  type?: string ;
  title?: string;
}

const initialState: bookSlice = {
  type: "",
  title: "",
};

const bookOptionsSlice = createSlice({
  name: "bookOptions",
  initialState,
  reducers: {
    setBookOptionRdx: (state, action: PayloadAction<bookSlice>) => {
      if (action.payload.type) {
        state.type = action.payload.type;
      } else if (action.payload.title) {
        state.title = action.payload.title;
      }
    },
  },
});

export const { setBookOptionRdx } = bookOptionsSlice.actions;
export default bookOptionsSlice.reducer;
