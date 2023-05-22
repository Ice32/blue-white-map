import React from "react";
import { MapContainer, Polyline, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { appConfig } from "@/app/appConfig";
import {
  addPoint,
  createMapObject,
  selectMapObjects,
  toggleSelectedState,
} from "@/app/redux/mapSlice";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";

export function Map() {
  const mapObjects = useAppSelector(selectMapObjects);
  const dispatch = useAppDispatch();

  const MapEventListener = () => {
    useMapEvents({
      click: (e) => dispatch(addPoint([e.latlng.lat, e.latlng.lng])),
      dblclick: () => dispatch(createMapObject()),
    });
    return null;
  };

  return (
    <div role="map" style={{ height: "100%", minHeight: "100%" }}>
      <MapContainer
        style={{ height: "100%", minHeight: "100%" }}
        center={appConfig.MAP_DEFAULT_CENTER}
        zoom={12}
        doubleClickZoom={false}
        data-testid="map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapEventListener />
        {mapObjects.map((mo) => (
          <Polyline
            key={mo.key}
            pathOptions={{ color: mo.color, weight: mo.selected ? 4 : 2 }}
            positions={mo.points}
            eventHandlers={{
              click: () => dispatch(toggleSelectedState(mo.key)),
            }}
          />
        ))}
      </MapContainer>
    </div>
  );
}
