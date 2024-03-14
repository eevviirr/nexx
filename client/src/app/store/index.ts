import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import searchSlice from "./slices/searchSlice";
import filterSlice from './slices/filterSlice'
export const store = configureStore({
  reducer: {
    searchSlice,
    userSlice,
    filterSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
