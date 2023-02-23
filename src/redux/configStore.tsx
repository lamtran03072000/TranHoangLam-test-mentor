import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./AuthReducer/authSlice";

export const store = configureStore({
  reducer: {
    authSlice,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;
