import { createSlice } from "@reduxjs/toolkit";
import { AppState, AppThunk } from "./store";

export interface MenuState {
  open: boolean;
}

const initialState: MenuState = {
  open: true,
};

const removeGrayAreaOnMapSizeChange = () =>
  window.dispatchEvent(new Event("resize"));

export const toggleMenuOpenState =
  (): AppThunk =>
  (dispatch): void => {
    dispatch(menuSlice.actions.toggleMenuOpenState());
    removeGrayAreaOnMapSizeChange();
  };

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    toggleMenuOpenState(state) {
      state.open = !state.open;
    },
  },
});

export const selectMenuOpenState = (state: AppState) => state.menu.open;

export default menuSlice.reducer;
