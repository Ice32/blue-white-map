import { LatLng } from "@/app/map/LatLng";

export interface MapObject {
  key: string;
  points: LatLng[];
  color: string;
}
