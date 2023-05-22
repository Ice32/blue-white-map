import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { mapSlice } from "./mapSlice";
import { menuSlice } from "@/app/redux/menuSlice";

export const getStore = () =>
  configureStore({
    reducer: {
      [mapSlice.name]: mapSlice.reducer,
      [menuSlice.name]: menuSlice.reducer,
    },
    devTools: true,
  });

type Store = ReturnType<typeof getStore>;
export type AppState = ReturnType<Store["getState"]>;
export type AppDispatch = Store["dispatch"];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;
