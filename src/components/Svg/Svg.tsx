interface SvgProps {
  children?: React.ReactNode;
  viewBox?: string;
  ariaHidden?: boolean;
  className?: string;
}

export default function Svg({
  children,
  viewBox = "0 0 24 24",
  ariaHidden = true,
  className,
}: SvgProps) {
  return (
    <svg viewBox={viewBox} aria-hidden={ariaHidden} className={`${className}`}>
      {children}
    </svg>
  );
}
