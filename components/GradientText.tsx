import { ReactNode } from "react";

const GradientText = ({ children }: { children: ReactNode }) => {
  return (
    <span className="bg-linear-to-r from-[#E6A7E9] via-[#BE8EF2] to-[#898BE8] bg-clip-text text-transparent">
      {children}
    </span>
  );
};

export default GradientText;
