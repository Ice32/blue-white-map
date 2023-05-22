"use client";

import { getStore } from "./store";
import { Provider } from "react-redux";

const store = getStore();
export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
