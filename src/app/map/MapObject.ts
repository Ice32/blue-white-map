import { LatLng } from "@/app/map/LatLng";

export type MapObjectKey = string;
export interface MapObject {
  key: MapObjectKey;
  points: LatLng[];
  color: string;
  selected: boolean;
}
