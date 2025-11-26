"use client";

import { createContext, useContext, useRef } from "react";
import RootStore from "@/stores/RootStore";

const StoresContext = createContext<RootStore | null>(null);

export function StoresProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef(new RootStore());

  return (
    <StoresContext.Provider value={storeRef.current}>
      {children}
    </StoresContext.Provider>
  );
}

export const useStores = () => {
  const ctx = useContext(StoresContext);
  if (!ctx) throw new Error("useStores must be inside StoresProvider");
  return ctx;
};
