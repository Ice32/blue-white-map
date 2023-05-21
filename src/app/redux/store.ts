import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { mapSlice } from "./mapSlice";
import { menuSlice } from "@/app/redux/menuSlice";

export const store = configureStore({
  reducer: {
    [mapSlice.name]: mapSlice.reducer,
    [menuSlice.name]: menuSlice.reducer,
  },
  devTools: true,
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;
