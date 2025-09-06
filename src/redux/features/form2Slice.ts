// src/store/formSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type AnswerValue = string | number | string[];

interface FormState {
  answers: Record<string, AnswerValue>;
}

const initialState: FormState = {
  answers: {}, // will store { "q1": 15, "q2": 12, "q15": ["phd","masters"], ... }
};

const formSlice2 = createSlice({
  name: "form",
  initialState,
  reducers: {
    setAnswer2: (state, action: PayloadAction<{ id: string; value: AnswerValue }>) => {
      state.answers[action.payload.id] = action.payload.value;
    },
    resetForm2: (state) => {
      state.answers = {};
    },
  },
});

export const { setAnswer2, resetForm2 } = formSlice2.actions;
export default formSlice2.reducer;
