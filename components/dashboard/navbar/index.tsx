"use client";

import { Bars2Icon } from "@heroicons/react/24/solid";
import { Button } from "@heroui/react";
import type React from "react";
import { useEffect } from "react";
import SearchInput from "@/components/reusable/SearchInput";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProfile, selectProfile } from "@/store/slice";
import { getCookie } from "@/utils";
import { AUTH_TOKEN_KEY } from "@/types";
import NavDropdown from "./NavDropdown";

interface NavBarProps {
  setOpen: (open: boolean) => void;
}

const NavBar: React.FC<NavBarProps> = ({ setOpen }) => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectProfile);

  useEffect(() => {
    const token = getCookie(AUTH_TOKEN_KEY);
    if (token && !profile) {
      dispatch(fetchProfile());
    }
  }, [dispatch, profile]);

  return (
    <header className="z-50 flex w-full flex-wrap bg-white py-2.5 sm:flex-nowrap sm:justify-start">

      <nav className="mx-auto flex w-full basis-full items-center px-3 md:px-6">

        <div className="ml-auto flex w-full items-center justify-between sm:gap-x-3">

          <SearchInput className="hidden lg:block" inputClassName="w-full sm:w-60 md:w-72"
            placeholder="Search" />

            <Button onPress={() => setOpen(true)}
              isIconOnly radius="full"
              className="border-none bg-transparent text-black xl:hidden"
              aria-label="Open menu">
              <Bars2Icon className="size-5 text-black" />
            </Button>

          <div className="flex flex-row items-center justify-end gap-x-3 md:gap-x-5">
            <NavDropdown />
          </div>

        </div>

      </nav>

    </header>
  );
};

export default NavBar;
