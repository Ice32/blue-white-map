import React, { useState } from "react";
import { LatLng } from "@/app/map/LatLng";
import { MapContainer, Polyline, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { appConfig } from "@/app/appConfig";
import {
  createMapObject,
  selectMapObjects,
  toggleSelectedState,
} from "@/app/redux/mapSlice";
import { useDispatch, useSelector } from "react-redux";

const MIN_SHAPE_POINTS = 2;

export function Map() {
  const [points, setPoints] = useState([] as LatLng[]);
  const mapObjects = useSelector(selectMapObjects);
  const dispatch = useDispatch();

  const MapEventListener = () => {
    useMapEvents({
      click(e) {
        setPoints((prevItems) => [...prevItems, [e.latlng.lat, e.latlng.lng]]);
      },
      dblclick: () => {
        if (points.length < MIN_SHAPE_POINTS) {
          return;
        }
        dispatch(createMapObject({ points }));
        setPoints([]);
      },
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
