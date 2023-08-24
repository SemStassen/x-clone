import { UseFormRegisterReturn } from "react-hook-form";

type InputProps = {
  label: string;
  name: string;
  register: UseFormRegisterReturn;
  className?: string;
};

export default function Input({
  label,
  name,
  register,
  className,
}: InputProps) {
  return (
    <div>
      <label className="block font-bold" htmlFor={name}>
        {label}
      </label>
      <textarea
        className={`rounded-lg border border-slate-400 p-2 text-xl ${className}`}
        id={name}
        {...register}
      />
    </div>
  );
}
