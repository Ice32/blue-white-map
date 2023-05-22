import React from "react";
import { MapContainer, Polyline, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { appConfig } from "@/app/appConfig";
import { LatLng } from "@/app/map/LatLng";
import { MapObject, MapObjectKey } from "@/app/map/MapObject";

export interface LeafletMapProps {
  onMapClick: (latLng: LatLng) => void;
  onMapDoubleClick: () => void;
  onMapObjectClick: (mapObject: MapObjectKey) => void;
  mapObjects: MapObject[];
}

export function LeafletMap({
  onMapClick,
  onMapDoubleClick,
  onMapObjectClick,
  mapObjects,
}: LeafletMapProps) {
  const MapEventListener = () => {
    useMapEvents({
      click: (e) => onMapClick([e.latlng.lat, e.latlng.lng]),
      dblclick: onMapDoubleClick,
    });
    return null;
  };

  return (
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
            click: onMapObjectClick.bind(null, mo.key),
          }}
        />
      ))}
    </MapContainer>
  );
}
