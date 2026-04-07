"use client";

import type { ReactNode } from "react";
import { Children } from "react";
import { cn } from "@/lib";

type FilterContainerProps = {
  children: ReactNode;
  className?: string;
  showDividers?: boolean;
};

const FilterContainer = ({
  children,
  className,
  showDividers = true,
}: FilterContainerProps) => {
  const childArray = Children.toArray(children);

  return (
    <div
      className={cn(
        "flex max-w-max items-center gap-1 rounded-[10px] bg-[#E2E5E8] p-[2px]",
        className,
      )}
    >
      {showDividers
        ? childArray.map((child, index) => (
            <span key={index} className="flex items-center gap-1">
              {child}
              {index < childArray.length - 1 ? (
                <div className="h-4 border-l border-[#A09CAB]" />
              ) : null}
            </span>
          ))
        : children}
    </div>
  );
};

export default FilterContainer;
