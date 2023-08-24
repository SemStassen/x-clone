import { HTMLInputTypeAttribute } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { twMerge } from "tailwind-merge";

type InputProps = {
  label: string;
  name: string;
  type: HTMLInputTypeAttribute;
  register: UseFormRegisterReturn;
  className?: string;
};

export default function Input({
  label,
  name,
  type,
  register,
  className,
}: InputProps) {
  return (
    <div>
      <label className="block font-bold" htmlFor={name}>
        {label}
      </label>
      <input
        className={twMerge(
          "rounded-lg border border-slate-400 p-2 text-xl",
          className,
        )}
        type={type}
        id={name}
        {...register}
      />
    </div>
  );
}
