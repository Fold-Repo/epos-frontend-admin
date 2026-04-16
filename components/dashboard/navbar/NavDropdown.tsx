"use client";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { selectProfile } from "@/store/slice";
import { logout } from "@/utils";

const NavDropdown = () => {

  const router = useRouter();
  const profile = useAppSelector(selectProfile);
  const user = profile?.user;
  const role = profile?.role;
  const displayName = [user?.firstname, user?.lastname].filter(Boolean).join(" ");
  const email = user?.email;
  const roleLabel = role?.name ? role.name.charAt(0).toUpperCase() + role.name.slice(1) : "";
  const positionLabel = user?.position || "";
  const profileMeta = [positionLabel, roleLabel].filter(Boolean).join(" • ");
  const initials =
    [user?.firstname?.[0], user?.lastname?.[0]].filter(Boolean).join("").toUpperCase() ||
    user?.email?.[0]?.toUpperCase();

  const handleLogout = async () => {
    await logout();
    router.push("/");
    router.refresh();
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <User
          as="button"
          avatarProps={{
            isBordered: true,
            name: initials,
            className: "bg-primary text-white",
            radius: "full",
          }}
          className="transition-transform"
          description={profileMeta || email}
          name={displayName}
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
        <DropdownItem
          key="profile-summary"
          isReadOnly
          className="cursor-default opacity-100 data-[hover=true]:bg-transparent"
          textValue="Profile summary"
        >
          <div className="flex flex-col">
            <span className="text-xs font-medium text-epos-text-primary">{displayName || "Admin user"}</span>
            <span className="text-[11px] text-epos-text-secondary">{email || "No email"}</span>
          </div>
        </DropdownItem>
        <DropdownItem key="settings" href="/dashboard/settings">
          Settings
        </DropdownItem>
        <DropdownItem key="logout" color="danger" onPress={handleLogout}>
          Log out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default NavDropdown;
