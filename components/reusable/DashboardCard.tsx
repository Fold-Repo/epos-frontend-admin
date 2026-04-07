import type { ReactNode } from "react";
import { cn } from "@/lib/classname";

type DashboardCardProps = {
  title?: string;
  icon?: ReactNode;
  children?: ReactNode;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  titleClassName?: string;
  headerActions?: ReactNode;
};

const DashboardCard = ({
  title,
  icon,
  children,
  className,
  headerClassName,
  bodyClassName,
  titleClassName,
  headerActions,
}: DashboardCardProps) => {
  return (
    <div
      className={cn(
        "rounded-2xl border border-[#E2E4E9] bg-white shadow-[0px_1px_2px_0px_#E4E5E73D]",
        className,
      )}
    >
      {(title ?? icon ?? headerActions) ? (
        <div
          className={cn(
            "flex flex-wrap items-center gap-x-5 gap-y-4 p-4 text-epos-text-primary",
            headerClassName,
          )}
        >
          <div className="flex items-center gap-x-1.5">
            {icon ? <span className="shrink-0">{icon}</span> : null}
            {title ? (
              <h2
                className={cn("text-[15px] font-medium", titleClassName)}
              >
                {title}
              </h2>
            ) : null}
          </div>
          {headerActions ? (
            <div className="ml-auto">{headerActions}</div>
          ) : null}
        </div>
      ) : null}

      <div className={cn("p-4", bodyClassName)}>{children}</div>
    </div>
  );
};

export default DashboardCard;
