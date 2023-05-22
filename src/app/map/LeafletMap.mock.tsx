import React from "react";
import "leaflet/dist/leaflet.css";
import { LeafletMapProps } from "@/app/map/LeafletMap";
import { LatLng } from "@/app/map/LatLng";

const startCoordinates = [1, 1];
const getRandomCoordinates = (): LatLng => [
  ++startCoordinates[0],
  ++startCoordinates[1],
];
export function LeafletMapMock({
  onMapClick,
  onMapDoubleClick,
  onMapObjectClick,
  mapObjects,
}: LeafletMapProps) {
  return (
    <div
      onClick={() => onMapClick(getRandomCoordinates())}
      onDoubleClick={onMapDoubleClick}
      data-testid="map"
    >
      {mapObjects.map((mo) => (
        <div
          key={mo.key}
          style={{ border: "1px solid " + mo.color }}
          onClick={() => onMapObjectClick(mo.key)}
        ></div>
      ))}
    </div>
  );
}
