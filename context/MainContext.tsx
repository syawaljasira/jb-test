"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

interface MainContextType {
  slider: number;
  setSlider: Dispatch<SetStateAction<number>>;
}

export const MainContext = createContext<MainContextType | undefined>(
  undefined,
);

const MainContextProvider = ({ children }: { children: ReactNode }) => {
  const [slider, setSlider] = useState(0);

  return (
    <MainContext.Provider value={{ slider, setSlider }}>
      {children}
    </MainContext.Provider>
  );
};

export default MainContextProvider;
