import { addPoint, mapSlice } from "@/app/redux/mapSlice";
import { LatLng } from "@/app/map/LatLng";
import { Store } from "redux";
import { configureStore } from "@reduxjs/toolkit";

describe("Map slice", () => {
  let store: Store;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        [mapSlice.name]: mapSlice.reducer,
      },
    });
  });
  describe("addPoint", () => {
    it("should ignore duplicate points", () => {
      const point1: LatLng = [11.0, 12.0];
      const point2: LatLng = [11.0, 12.0];

      store.dispatch(addPoint(point1));
      store.dispatch(addPoint(point2));

      expect(store.getState().map.points).toHaveLength(1);
    });
    it("should not treat as duplicate if only lat same", () => {
      const point1: LatLng = [11.0, 12.0];
      const point2: LatLng = [11.0, 12.1];

      store.dispatch(addPoint(point1));
      store.dispatch(addPoint(point2));

      expect(store.getState().map.points).toHaveLength(2);
    });

    it("should not treat as duplicate if only lng same", () => {
      const point1: LatLng = [11.0, 12.0];
      const point2: LatLng = [1.0, 12.0];

      store.dispatch(addPoint(point1));
      store.dispatch(addPoint(point2));

      expect(store.getState().map.points).toHaveLength(2);
    });
  });
});
