import { NewMapObject } from "@/app/map/NewMapObject";
import React, { useRef, useState } from "react";
import { LatLng } from "@/app/map/LatLng";
import { MapContainer, Polyline, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { MapObject } from "@/app/map/MapObject";

export interface MapProps {
  mapObjectCreated: (mapObject: NewMapObject) => void;
  mapObjects: MapObject[];
  mapObjectClicked: (key: string) => void;
}

const colors = ["blue", "black", "lime", "purple", "red"];

export function Map({
  mapObjectCreated,
  mapObjects,
  mapObjectClicked,
}: MapProps) {
  const [items, setItems] = useState([] as LatLng[]);
  const nextColorIndex = useRef(0);

  const getNextColor = () => colors[++nextColorIndex.current % colors.length];
  const MapEventListener = () => {
    useMapEvents({
      click(e) {
        setItems((prevItems) => [...prevItems, [e.latlng.lat, e.latlng.lng]]);
      },
      dblclick: () => {
        mapObjectCreated({ points: items, color: getNextColor() });
        setItems([]);
      },
    });
    return null;
  };

  return (
    <div role="map" style={{ height: "100%", minHeight: "100%" }}>
      <MapContainer
        style={{ height: "100%", minHeight: "100%" }}
        center={[51.505, -0.09]}
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
              click: () => mapObjectClicked(mo.key),
            }}
          />
        ))}
      </MapContainer>
    </div>
  );
}
