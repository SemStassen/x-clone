import { HTMLInputTypeAttribute } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type InputProps = {
  label: string;
  name: string;
  type: HTMLInputTypeAttribute;
  register: UseFormRegisterReturn;
};

export default function Input({ label, name, type, register }: InputProps) {
  return (
    <div>
      <label className="block font-bold" htmlFor={name}>
        {label}
      </label>
      <input className="p-2 text-xl" type={type} id={name} {...register} />
    </div>
  );
}
