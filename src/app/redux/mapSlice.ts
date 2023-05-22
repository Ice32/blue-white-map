import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { MapObject, MapObjectKey } from "@/app/map/MapObject";
import { LatLng } from "@/app/map/LatLng";

export interface MapState {
  objects: MapObject[];
  points: LatLng[];
}

const initialState: MapState = {
  objects: [],
  points: [],
};

let objectCounter = 0;
const colors = ["blue", "black", "lime", "purple", "red"];
const getNextColor = () => colors[++objectCounter % colors.length];
const MIN_SHAPE_POINTS = 2;

export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    createMapObject(state, action: PayloadAction<void>) {
      if (state.points.length < MIN_SHAPE_POINTS) {
        return;
      }
      state.objects = [
        ...state.objects,
        {
          points: state.points,
          key: (++objectCounter).toString(10),
          color: getNextColor(),
          selected: false,
        },
      ];
      state.points = [];
    },
    addPoint(state, action: PayloadAction<LatLng>) {
      const isDuplicatePoint = state.points.find(
        (p) => p[0] === action.payload[0] && p[1] === action.payload[1]
      );
      if (isDuplicatePoint) {
        return;
      }
      state.points = [...state.points, action.payload];
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

export const {
  addPoint,
  createMapObject,
  removeMapObject,
  toggleSelectedState,
} = mapSlice.actions;
export const selectMapObjects = (state: AppState) => state.map.objects;

export default mapSlice.reducer;
