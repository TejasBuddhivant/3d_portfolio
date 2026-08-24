"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, type AppStore } from "@/store";

/**
 * Creates one Redux store per browser session and one per server request,
 * following the recommended Next.js App Router store pattern.
 */
export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
