"use client";
import { Menu } from "@/app/menu/Menu";
import { Map } from "@/app/map/Map";
import { useRef, useState } from "react";
import { MapObject } from "@/app/map/MapObject";
import { NewMapObject } from "@/app/map/NewMapObject";
import { MenuItemContent } from "@/app/menu/MenuItemContent";

export default function Home() {
  const [items, setItems] = useState([] as MapObject[]);
  const objectCounter = useRef(0);

  const mapObjectCreated = (item: NewMapObject) => {
    const newObject: MapObject = {
      points: item.points,
      key: (++objectCounter.current).toString(10),
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
      <div className="flex-grow">
        <Map mapObjectCreated={mapObjectCreated} />
      </div>
    </main>
  );
}
