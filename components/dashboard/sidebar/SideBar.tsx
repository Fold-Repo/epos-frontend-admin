"use client";

import { Button } from "@heroui/react";
import {
  ArrowRightOnRectangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import type React from "react";
import Logo from "@/components/reusable/Logo";
import {
  DASHBOARD_ROOT,
  DASHBOARD_SECTIONS,
} from "@/constants/dashboard-nav";
import SidebarLink from "./SidebarLink";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SideBar: React.FC<SidebarProps> = ({ open, setOpen }) => {
  const pathname = usePathname();

  const handleLinkClick = () => {
    setTimeout(() => setOpen(false), 100);
  };

  const isLinkActive = (href: string) =>
    href === DASHBOARD_ROOT
      ? pathname === DASHBOARD_ROOT
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      {open ? (
        <div
          className="fixed inset-0 z-20 block bg-black/50 xl:hidden"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      ) : null}

      <aside
        className={`sidebar fixed inset-y-0 left-0 z-30 flex max-w-66 w-66 -translate-x-full flex-col overflow-x-hidden border-0 bg-[#F5F2F0] transition-all duration-200 xl:translate-x-0 ${
          open ? "translate-x-0" : ""
        }`}
      >
        <div className="flex items-center justify-between border-b border-neutral-200/50 px-5 py-3">
          <Logo
            href={DASHBOARD_ROOT}
            size="sm"
            className="min-w-0"
            textColor="text-epos-text-primary"
            iconBgColor="bg-primary"
            onNavigate={handleLinkClick}
          />
          <Button
            size="sm"
            onPress={() => setOpen(false)}
            isIconOnly
            className="rounded-full border-none bg-white xl:hidden"
            aria-label="Close menu">
            <XMarkIcon className="size-4 text-black" />
          </Button>
        </div>

        <div className="flex flex-1 flex-col overflow-y-auto">

          <div className="mb-4 px-5 py-4">

            <div className="space-y-2 pb-5">

              <h2 className="text-base font-semibold leading-5 text-epos-text-primary">
                Welcome back
                <br />
                <span className="line-clamp-1">EPOS Admin</span>
              </h2>
              <p className="text-xs text-epos-text-secondary">
                Oversee businesses, stores, and platform users.
              </p>

            </div>

            <div className="flex-1 pt-4">
              <ul className="mb-0 flex list-none flex-col space-y-1.5 pl-0">
                {DASHBOARD_SECTIONS.flatMap((section) =>
                  section.links.map((link) => (
                    <li key={link.href} className="w-full">
                      <SidebarLink
                        href={link.href}
                        icon={link.icon}
                        text={link.text}
                        isActive={isLinkActive(link.href)}
                        onClick={handleLinkClick}
                      />
                    </li>
                  )),
                )}
              </ul>
            </div>

          </div>

          <div className="mt-auto w-full border-t border-neutral-200/50 px-5 py-2.5">
            <Button fullWidth variant="light"
              className="flex items-center justify-start">
              <ArrowRightOnRectangleIcon className="size-[17px] shrink-0 text-epos-text-primary" />
              <span className="text-sm text-epos-text-primary">Logout</span>
            </Button>
          </div>

        </div>

      </aside>
    </>
  );
};

export default SideBar;
