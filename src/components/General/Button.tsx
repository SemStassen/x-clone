import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export default function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={twMerge(
        "rounded-2xl bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
