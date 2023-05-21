import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { MapObject, MapObjectKey } from "@/app/map/MapObject";
import { NewMapObject } from "@/app/map/NewMapObject";

export interface MapState {
  objects: MapObject[];
}

const initialState: MapState = {
  objects: [],
};

let objectCounter = 0;
const colors = ["blue", "black", "lime", "purple", "red"];
const getNextColor = () => colors[++objectCounter % colors.length];

export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    createMapObject(state, action: PayloadAction<NewMapObject>) {
      state.objects = [
        ...state.objects,
        {
          ...action.payload,
          key: (++objectCounter).toString(10),
          color: getNextColor(),
          selected: false,
        },
      ];
    },
    removeMapObject(state, action: PayloadAction<MapObjectKey>) {
      state.objects = state.objects.filter((o) => o.key !== action.payload);
    },
    toggleSelectedState(state, action: PayloadAction<MapObjectKey>) {
      state.objects = state.objects.map((o) => ({
        ...o,
        selected: action.payload === o.key ? !o.selected : false,
      }));
    },
  },
});

export const { createMapObject, removeMapObject, toggleSelectedState } =
  mapSlice.actions;

export const selectMapObjects = (state: AppState) => state.map.objects;

export default mapSlice.reducer;
