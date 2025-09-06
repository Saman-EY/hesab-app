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

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setAnswer: (state, action: PayloadAction<{ id: string; value: AnswerValue }>) => {
      state.answers[action.payload.id] = action.payload.value;
    },
    resetForm: (state) => {
      state.answers = {};
    },
  },
});

export const { setAnswer, resetForm } = formSlice.actions;
export default formSlice.reducer;
