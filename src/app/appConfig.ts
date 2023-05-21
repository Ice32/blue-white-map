import { LatLng } from "@/app/map/LatLng";

export interface AppConfig {
  MAP_DEFAULT_CENTER: LatLng;
}
export const appConfig: AppConfig = {
  MAP_DEFAULT_CENTER: [44.798142, 20.4664719],
};
