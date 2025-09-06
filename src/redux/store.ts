import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./features/bookOptionsSlice";
import formReducer from "./features/formSlice";
import formReducer2 from "./features/form2Slice";
import userReducer from "./features/userFormSlice";

export const store = configureStore({
  reducer: {
    bookOptions: bookReducer,
    form: formReducer,
    form2: formReducer2,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
