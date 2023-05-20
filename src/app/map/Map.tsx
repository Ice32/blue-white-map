import { NewMapObject } from "@/app/map/NewMapObject";
import { useState } from "react";
import { LatLng } from "@/app/map/LatLng";
import Image from "next/image";

export interface MapProps {
  mapObjectCreated: (mapObject: NewMapObject) => void;
}
export function Map({ mapObjectCreated }: MapProps) {
  const [items, setItems] = useState([] as LatLng[]);
  return (
    <div
      role="map"
      onClick={(e) =>
        setItems((prevItems) => [...prevItems, [e.clientX, e.clientY]])
      }
      onDoubleClick={() => mapObjectCreated({ points: items })}
    >
      <Image
        src="/Political-World-Map.jpg"
        alt="world map"
        width={1000}
        height={500}
      />
    </div>
  );
}
