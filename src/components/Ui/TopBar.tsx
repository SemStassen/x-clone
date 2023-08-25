import { Return } from "../General";

interface TopBarProps {
  children?: React.ReactNode;
}

export default function TopBar({ children }: TopBarProps) {
  return (
    <div className="flex gap-4 border border-white p-4">
      <Return />
      <h2 className="text-2xl text-white">{children}</h2>
    </div>
  );
}
