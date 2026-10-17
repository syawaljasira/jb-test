import { ComponentPropsWithoutRef } from "react";
import Image from "next/image";

import { useMainContext } from "@/lib/hooks";
import arrowUpIcon from "@/assets/icons/arrow-up.svg";

interface FormInputProps extends ComponentPropsWithoutRef<"input"> {
  isName: boolean;
  error?: string;
  kind?: string;
}

const FormInput = ({ isName, error, kind, ...otherProps }: FormInputProps) => {
  const { nameError, emailError } = useMainContext();

  return (
    <>
      <div className="relative">
        <input
          className="h-14 w-full rounded-xl border border-[#686372] bg-[#181922] px-4 font-[inherit] text-white outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-[#8b8794] focus:border-[#c9a5ff] focus:shadow-[0_0_0_3px_rgba(201,165,255,.18)] aria-invalid:border-[#f3a6be] focus-visible:outline-[3px] focus-visible:outline-[#c9a5ff] focus-visible:outline-offset-[3px]"
          name={kind}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error ? `${isName ? "text" : "email"}-error` : undefined
          }
          aria-errormessage={
            error ? `${isName ? nameError : emailError}-error` : undefined
          }
          {...otherProps}
        />

        <button
          type="submit"
          className="absolute right-3 top-[50%] translate-y-[-50%] rounded-full p-1.5 bg-light/40"
        >
          <Image
            src={arrowUpIcon}
            alt="Arrow Up"
            width={arrowUpIcon.width}
            height={arrowUpIcon.height}
            className="w-5 h-5 opacity-60"
          />
        </button>
      </div>

      <p
        className="mx-0.5 mt-2 min-h-6 text-xs text-[#ffb8cc]"
        id={`${kind}-error`}
        role={error ? "alert" : undefined}
      >
        {error || "\u00a0"}
      </p>
    </>
  );
};

export default FormInput;
