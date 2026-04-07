import Link from "next/link";
import type React from "react";

interface SidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  text: string;
  isActive?: boolean;
  onClick?: () => void;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({
  href,
  icon,
  text,
  isActive,
  onClick,
}) => {
  const handleClick = () => {
    onClick?.();
  };

  return (
    <Link
      href={href}
      className={`text-xs my-0 mb-1 flex items-center gap-x-2 whitespace-nowrap rounded-xl px-4 py-2 text-epos-text-primary transition-all ${
        isActive
          ? "bg-white font-medium text-deep-purple shadow-[0_0_0_1px_var(--color-primary),0_0_0_3px_color-mix(in_srgb,var(--color-primary)_30%,transparent)]"
          : ""
      }`}
      onClick={handleClick}
    >
      {icon}
      <span className="pointer-events-none text-xs opacity-100 duration-300">
        {text}
      </span>
    </Link>
  );
};

export default SidebarLink;
