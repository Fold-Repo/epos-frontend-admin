import Link from "next/link";
import type React from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib";

export type DashboardBreadcrumbItem = {
  label: string;
  href?: string;
};

type DashboardBreadCrumbProps = {
  items?: DashboardBreadcrumbItem[];
  title?: string;
  description?: string;
  className?: string;
};

const DashboardBreadCrumb = ({
  items = [],
  title,
  description,
  className,
}: DashboardBreadCrumbProps) => {
  return (
    <div
      className={cn(
        "space-y-2 border-y border-neutral-200/60 bg-epos-light-gray px-5 py-3",
        className,
      )}
    >
      {items.length > 0 ? (
        <ol className="flex items-center gap-x-0.5 text-xs text-slate-400">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            const isFirst = index === 0;

            return (
              <li key={item.label} className="inline-flex items-center">
                {isFirst ? (
                  <ArrowLeftIcon className="mr-1 size-4" aria-hidden />
                ) : null}
                {item.href ? (
                  <Link
                    className="flex items-center transition-colors hover:text-epos-text-primary focus:text-epos-text-primary focus:outline-none"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="flex items-center">{item.label}</span>
                )}
                {!isLast ? (
                  <svg
                    className="mx-1 size-5 shrink-0"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden
                  >
                    <path
                      d="M6 13L10 3"
                      stroke="currentColor"
                      strokeLinecap="round"
                    />
                  </svg>
                ) : null}
              </li>
            );
          })}
        </ol>
      ) : null}

      {title ?? description ? (
        <div className="space-y-1">
          {title ? (
            <h2 className="text-base font-medium text-epos-text-primary">
              {title}
            </h2>
          ) : null}
          {description ? (
            <p className="text-xs text-slate-400">{description}</p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default DashboardBreadCrumb;
