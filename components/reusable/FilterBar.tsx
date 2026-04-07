"use client";

import type { ReactNode } from "react";
import { Button } from "@heroui/react";
import SearchInput from "./SearchInput";
import FilterContainer from "./FilterContainer";
import MenuDropdown from "@/components/ui/MenuDropdown";
import DatePicker from "@/components/ui/DatePicker";

type DropdownFilterItem = { label: string; key: string };

type DropdownFilter = {
  type: "dropdown";
  label?: string;
  value?: string;
  items: DropdownFilterItem[];
  onChange?: (key: string) => void;
  startContent?: ReactNode;
  showChevron?: boolean;
  buttonLabel?: string;
  buttonIcon?: ReactNode;
};

type CustomFilter = {
  type: "custom";
  content: ReactNode;
};

type DateRangeFilter = {
  type: "dateRange";
  startDate?: Date;
  endDate?: Date;
  onChange?: (value: Date | { startDate: Date; endDate: Date }) => void;
  buttonLabel?: string;
  buttonIcon?: ReactNode;
};

type FilterConfig = DropdownFilter | CustomFilter | DateRangeFilter;

type FilterBarProps = {
  items?: FilterConfig[];
  children?: ReactNode;
  startContent?: ReactNode;
  endContent?: ReactNode;
  searchInput?: {
    placeholder?: string;
    className?: string;
    onSearch?: (value: string) => void;
  };
  className?: string;
};

const FilterBar = ({
  items = [],
  children,
  startContent,
  endContent,
  searchInput,
  className = "",
}: FilterBarProps) => {
  const renderFilter = (filter: FilterConfig, index: number) => {
    switch (filter.type) {
      case "dropdown":
        return (
          <FilterContainer key={index}>
            {filter.buttonLabel ? (
              <Button
                disableRipple
                disableAnimation
                className="flex h-auto items-center gap-2 rounded-lg border-0 bg-white py-2 px-3 text-[12px] text-epos-text-primary"
              >
                {filter.buttonIcon ?? null}
                <span>{filter.buttonLabel}</span>
              </Button>
            ) : null}
            <MenuDropdown
              startContent={filter.startContent}
              label={filter.label}
              showChevron={filter.showChevron ?? false}
              items={filter.items}
              value={filter.value}
              onChange={filter.onChange}
            />
          </FilterContainer>
        );
      case "custom":
        return (
          <FilterContainer key={index} showDividers={false}>
            {filter.content}
          </FilterContainer>
        );
      case "dateRange":
        return (
          <FilterContainer
            key={index}
            showDividers={Boolean(filter.buttonLabel)}
          >
            {filter.buttonLabel ? (
              <Button
                disableRipple
                disableAnimation
                className="flex h-auto items-center gap-2 rounded-lg border-0 bg-white py-2 px-3 text-[12px] text-epos-text-primary"
              >
                {filter.buttonIcon ?? null}
                <span>{filter.buttonLabel}</span>
              </Button>
            ) : null}
            <DatePicker
              range
              startDate={filter.startDate}
              endDate={filter.endDate}
              onChange={filter.onChange ?? (() => {})}
            />
          </FilterContainer>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`flex flex-wrap items-center gap-3 ${searchInput ? "justify-between" : "justify-end"} ${className}`}
    >
      {searchInput ? (
        <SearchInput
          className={searchInput.className ?? "w-full md:w-72"}
          placeholder={searchInput.placeholder ?? "Search..."}
          onSearch={searchInput.onSearch}
        />
      ) : null}

      <div className="flex flex-wrap items-center justify-end gap-2">
        {startContent ? <FilterContainer>{startContent}</FilterContainer> : null}
        {items.map((filter, index) => renderFilter(filter, index))}
        {children}
        {endContent ? <FilterContainer>{endContent}</FilterContainer> : null}
      </div>
    </div>
  );
};

export default FilterBar;
