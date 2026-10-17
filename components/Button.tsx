import React, { ComponentPropsWithoutRef, ReactNode } from "react";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  children: ReactNode;
}

export const ButtonPrimary = ({ children, ...otherProps }: ButtonProps) => {
  return (
    <button
      className="w-auto bg-primary text-dark px-6 py-4.75 rounded-[19px] font-sans text-base"
      {...otherProps}
    >
      {children}
    </button>
  );
};
