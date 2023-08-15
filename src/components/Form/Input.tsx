import { HTMLInputTypeAttribute } from "react";
import { RegisterOptions, UseFormRegister } from "react-hook-form";
import type { FormDataSignUp } from "@/app/sign-up/page";

type InputProps = {
  label: string;
  name: keyof FormDataSignUp;
  register: UseFormRegister<FormDataSignUp>;
  type: HTMLInputTypeAttribute;
  options?: RegisterOptions;
};

export default function Input({
  label,
  name,
  type,
  register,
  options,
}: InputProps) {
  return (
    <div>
      <label className="block font-bold" htmlFor={name}>
        {label}
      </label>
      <input
        className="p-2 text-xl"
        type={type}
        id={name}
        {...register(name, options)}
      />
    </div>
  );
}
