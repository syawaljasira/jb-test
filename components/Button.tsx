import React, { ComponentPropsWithoutRef, ReactNode } from "react";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  children: ReactNode;
}

export const ButtonPrimary = ({ children, ...otherProps }: ButtonProps) => {
  return (
    <button
      type="button"
      className="w-auto bg-primary text-dark px-6 py-4.75 rounded-[19px] font-sans text-base cursor-pointer"
      {...otherProps}
    >
      {children}
    </button>
  );
};

export const ButtonOutline = ({ children, ...otherProps }: ButtonProps) => {
  return (
    <button
      type="button"
      className="w-auto bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-dark px-6 py-4.75 rounded-[19px] font-sans text-base cursor-pointer"
      {...otherProps}
    >
      {children}
    </button>
  );
};

export const ButtonLight = ({ children, ...otherProps }: ButtonProps) => {
  return (
    <button
      type="button"
      className="w-auto bg-light text-dark px-6 py-4.75 rounded-[19px] font-sans text-base cursor-pointer"
      {...otherProps}
    >
      {children}
    </button>
  );
};
