import Link from "next/link";
import type { FC } from "react";
import { cn } from "@/lib";

interface LogoProps {
  href?: string;
  className?: string;
  textColor?: string;
  iconBgColor?: string;
  iconTextColor?: string;
  size?: "sm" | "md" | "lg";
  /** Fires after navigation (e.g. close mobile sidebar). */
  onNavigate?: () => void;
}

const Logo: FC<LogoProps> = ({
  href = "/",
  className = "",
  textColor = "text-neutral-800",
  iconBgColor = "bg-primary",
  iconTextColor = "text-white",
  size = "md",
  onNavigate,
}) => {
  const sizeClasses = {
    sm: { icon: "size-8 text-base", text: "text-lg" },
    md: { icon: "size-10 text-xl", text: "text-2xl" },
    lg: { icon: "size-12 text-2xl", text: "text-3xl" },
  };
  const s = sizeClasses[size];

  return (
    <Link
      href={href}
      className={cn("flex items-center gap-2", className)}
      onClick={() => onNavigate?.()}
    >
      <div
        className={cn(
          s.icon,
          iconBgColor,
          "flex items-center justify-center rounded-lg font-black shadow-md",
          iconTextColor
        )}
      >
        E
      </div>
      <span className={cn(textColor, s.text, "font-bold tracking-tight")}>
        EPOS <span className="text-primary">Admin</span>
      </span>
    </Link>
  );
};

export default Logo;
