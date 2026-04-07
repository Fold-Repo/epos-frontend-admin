"use client";

import { NavBar, SideBar } from "@/components/dashboard";
import type React from "react";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <SideBar open={open} setOpen={setOpen} />

      <main className="relative h-full transition-all duration-200 ease-soft-in-out xl:ml-66">

        <NavBar setOpen={setOpen} />

        <div className="m-auto min-h-screen w-full overflow-x-hidden">
          {children}
        </div>

      </main>
    </>
  );
}
