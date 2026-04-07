"use client";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from "@heroui/react";

const NavDropdown = () => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <User
          as="button"
          avatarProps={{
            isBordered: true,
            name: "A",
            className: "bg-primary text-white",
            radius: "full",
          }}
          className="transition-transform"
          description="admin@epos.local"
          name="Admin User"
          classNames={{
            name: "max-w-32 truncate pt-1 text-xs font-medium hidden sm:block",
            description: "max-w-30 truncate text-[12px] hidden sm:block",
            base: "gap-x-3",
          }}
        />
      </DropdownTrigger>
      <DropdownMenu
        itemClasses={{
          title: "text-xs",
          base: "py-1.5",
        }}
        aria-label="User actions"
        variant="flat"
      >
        <DropdownItem key="settings" href="/dashboard/settings">
          Settings
        </DropdownItem>
        <DropdownItem key="logout" color="danger">
          Log out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default NavDropdown;
