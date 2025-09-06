// src/features/user/userSlice.ts
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  academicRank: "",
  workAddress: "",
  date: "",
  fatherName: "",
  nationalId: "",
  shenasnamehNumber: "",
  birthDate: "",
  shenasnamehPlace: "",
  birthPlace: "",
  degree: "",
  bankSheba: "",
  bankName: "",
  insuranceType: "",
  insuranceNumber: "",
  taxExemption: "",
  employmentType: "",
  homeAddress: "",
  errors: {} as Record<string, boolean>, // Track validation errors
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserField: (
      state,
      action: {
        payload: { field: keyof typeof initialState; value: string };
      }
    ) => {
      const { field, value } = action.payload;
      if (field !== "errors") {
        state[field] = value;
        // Clear error when user starts typing
        if (state.errors[field]) {
          delete state.errors[field];
        }
      }
    },
    validateForm: (state) => {
      // Clear previous errors
      state.errors = {};

      // Check each field
      const fieldsToValidate = [
        "fullName",
        "academicRank",
        "workAddress",
        "date",
        "fatherName",
        "nationalId",
        "shenasnamehNumber",
        "birthDate",
        "shenasnamehPlace",
        "birthPlace",
        "degree",
        "bankSheba",
        "bankName",
        "insuranceType",
        "insuranceNumber",
        "taxExemption",
        "employmentType",
        "homeAddress",
      ];

      fieldsToValidate.forEach((field) => {
        if (!state[field as keyof typeof initialState]) {
          state.errors[field] = true;
        }
      });
    },
    clearErrors: (state) => {
      state.errors = {};
    },
    resetUser: () => initialState,
  },
});

export const { setUserField, validateForm, clearErrors, resetUser } = userSlice.actions;
export default userSlice.reducer;
