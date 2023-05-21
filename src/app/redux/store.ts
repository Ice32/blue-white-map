import { configureStore } from "@reduxjs/toolkit";
import { mapSlice } from "./mapSlice";

export const store = configureStore({
  reducer: {
    [mapSlice.name]: mapSlice.reducer,
  },
  devTools: true,
});

export type AppState = ReturnType<typeof store.getState>;
