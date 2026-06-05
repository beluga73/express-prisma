import { createContext, useContext } from "react";
import { RootStore } from "./RootStore";

export const StoresContext = createContext<ReturnType<
  RootStore["getStores"]
> | null>(null);

export const useStores = () => {
  const value = useContext(StoresContext);

  if (value === null) {
    throw new Error("Calling useRootContext outside Provider");
  }

  return value;
};
