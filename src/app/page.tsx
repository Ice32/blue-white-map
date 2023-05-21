"use client";
import { Menu } from "@/app/menu/Menu";
import { useState } from "react";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("./map/Map").then((m) => m.Map), {
  ssr: false,
});

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const removeGrayAreaOnMapSizeChange = () =>
    window.dispatchEvent(new Event("resize"));
  const menuToggle = () => {
    setIsMenuOpen((prev) => !prev);
    removeGrayAreaOnMapSizeChange();
  };

  return (
    <main className="flex min-h-screen flex-row justify-between">
      <div className="min-h-fit">
        <Menu isOpen={isMenuOpen} onToggle={menuToggle} />
      </div>
      <div className="flex-grow min-h-fit">
        <Map />
      </div>
    </main>
  );
}
