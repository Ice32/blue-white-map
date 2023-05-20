"use client";
import { Menu } from "@/app/menu/Menu";
import { useRef, useState } from "react";
import { MapObject } from "@/app/map/MapObject";
import { NewMapObject } from "@/app/map/NewMapObject";
import { MenuItemContent } from "@/app/menu/MenuItemContent";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("./map/Map").then((m) => m.Map), {
  ssr: false,
});

export default function Home() {
  const [items, setItems] = useState([] as MapObject[]);
  const objectCounter = useRef(0);

  const mapObjectCreated = (item: NewMapObject) => {
    const newObject: MapObject = {
      points: item.points,
      key: (++objectCounter.current).toString(10),
      color: item.color,
    };
    setItems((prevItems) => [...prevItems, newObject]);
  };

  const mapObjectRemoved = (item: MenuItemContent) =>
    setItems((prevItems) => prevItems.filter((pi) => pi.key !== item.key));

  return (
    <main className="flex min-h-screen flex-row justify-between">
      <div className="min-h-fit w-80">
        <Menu
          items={items.map((i) => ({
            key: i.key,
            title: `Route ${i.key}`,
            subtitle: "Line string",
          }))}
          onRemove={mapObjectRemoved}
        />
      </div>
      <div className="flex-grow min-h-fit">
        <Map mapObjects={items} mapObjectCreated={mapObjectCreated} />
      </div>
    </main>
  );
}
