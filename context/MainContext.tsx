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
  name: string;
  email: string;
  nameError: string;
  emailError: string;
  setSlider: Dispatch<SetStateAction<number>>;
  setName: Dispatch<SetStateAction<string>>;
  setEmail: Dispatch<SetStateAction<string>>;
  setNameError: Dispatch<SetStateAction<string>>;
  setEmailError: Dispatch<SetStateAction<string>>;
}

export const MainContext = createContext<MainContextType | undefined>(
  undefined,
);

const MainContextProvider = ({ children }: { children: ReactNode }) => {
  const [slider, setSlider] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");

  return (
    <MainContext.Provider
      value={{
        slider,
        setSlider,
        name,
        setName,
        email,
        setEmail,
        nameError,
        setNameError,
        emailError,
        setEmailError,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainContextProvider;
