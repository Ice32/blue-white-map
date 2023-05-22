import React from "react";
import "leaflet/dist/leaflet.css";
import {
  addPoint,
  createMapObject,
  selectMapObjects,
  toggleSelectedState,
} from "@/app/redux/mapSlice";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { LeafletMap } from "@/app/map/LeafletMap";

export function Map() {
  const mapObjects = useAppSelector(selectMapObjects);
  const dispatch = useAppDispatch();

  return (
    <div role="map" style={{ height: "100%", minHeight: "100%" }}>
      <LeafletMap
        mapObjects={mapObjects}
        onMapClick={(latLgn) => dispatch(addPoint(latLgn))}
        onMapDoubleClick={() => dispatch(createMapObject())}
        onMapObjectClick={(key) => dispatch(toggleSelectedState(key))}
      />
    </div>
  );
}
