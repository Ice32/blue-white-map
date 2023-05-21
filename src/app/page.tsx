"use client";
import { Menu } from "@/app/menu/Menu";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("./map/Map").then((m) => m.Map), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="flex min-h-screen flex-row justify-between">
      <div className="min-h-fit">
        <Menu />
      </div>
      <div className="flex-grow min-h-fit">
        <Map />
      </div>
    </main>
  );
}
