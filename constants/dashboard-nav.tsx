import React from "react";
import {
  Cog6ToothIcon,
  ClipboardDocumentListIcon,
  IdentificationIcon,
} from "@heroicons/react/24/outline";
import {
  TbLayout2,
  TbBuildingCommunity,
  TbChartHistogram,
} from "react-icons/tb";

export const DASHBOARD_ROOT = "/dashboard";

export interface DashboardLink {
  href: string;
  icon: React.ReactNode;
  text: string;
  children?: DashboardLink[];
}

export interface DashboardSection {
  title: string;
  links: DashboardLink[];
}

/** Admin console: oversee companies / stores that use EPOS — not the full merchant menu. */
export const getDashboardSections = (root: string): DashboardSection[] => [
  {
    title: "Main",
    links: [
      {
        href: root,
        icon: <TbLayout2 className="size-5" />,
        text: "Dashboard",
      },
    ],
  },
  {
    title: "Platform",
    links: [
      {
        href: `${root}/businesses`,
        icon: <TbBuildingCommunity className="size-5" />,
        text: "Businesses",
      },
    ],
  },
  {
    title: "Insights",
    links: [
      {
        href: `${root}/revenue`,
        icon: <TbChartHistogram className="size-5" />,
        text: "Revenue",
      },
      {
        href: `${root}/operations`,
        icon: <ClipboardDocumentListIcon className="size-5" />,
        text: "Orders & activity",
      },
      {
        href: `${root}/verification`,
        icon: <IdentificationIcon className="size-5" />,
        text: "Verification",
      },
    ],
  },
  {
    title: "System",
    links: [
      {
        href: `${root}/settings`,
        icon: <Cog6ToothIcon className="size-5" />,
        text: "Settings",
      },
    ],
  },
];

export const DASHBOARD_SECTIONS: DashboardSection[] =
  getDashboardSections(DASHBOARD_ROOT);
