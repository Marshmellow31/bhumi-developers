import Image from "next/image";

interface LogoProps {
  className?: string;
  /**
   * light = true  → logo displayed on a light/white background (no filter)
   * light = false → logo displayed on the dark navbar/footer (invert to make it white)
   */
  light?: boolean;
  width?: number;
  height?: number;
}

export default function Logo({
  className = "",
  light = false,
  width = 140,
  height = 56,
}: LogoProps) {
  return (
    <Image
      src="/logo.png"
      alt="Bhumi Developers"
      width={width}
      height={height}
      priority
      className={`object-contain w-auto ${
        light ? "" : "brightness-0 invert"
      } ${className}`}
    />
  );
}
