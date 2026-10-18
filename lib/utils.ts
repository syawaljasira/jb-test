type ValidationType = {
  value: string;
  option: "name" | "email";
};

export const validation = ({ value, option }: ValidationType) => {
  if (option === "name") {
    if (value.trim().length < 3) return true;
  }

  if (option === "email") {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return true;
  }

  return false;
};
