"use client";

import { useEffect, useState } from "react";
import { Calendar, DateRange, type RangeKeyDict } from "react-date-range";
import { format } from "date-fns";
import { CalendarDaysIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

type Props = {
  value?: Date;
  startDate?: Date;
  endDate?: Date;
  onChange: (value: Date | { startDate: Date; endDate: Date }) => void;
  className?: string;
  triggerClassName?: string;
  range?: boolean;
};

const formatOnlyDate = (date: Date) => format(date, "dd MMM");
const formatFullDate = (date: Date) => format(date, "dd MMM yyyy");

const DatePicker = ({
  value,
  startDate,
  endDate,
  onChange,
  className,
  triggerClassName,
  range = false,
}: Props) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [date, setDate] = useState<Date>(value ?? new Date());
  const [dateRange, setDateRange] = useState([
    {
      startDate: startDate ?? new Date(),
      endDate: endDate ?? new Date(),
      key: "selection",
    },
  ]);

  useEffect(() => {
    if (range && startDate && endDate) {
      setDateRange([
        {
          startDate,
          endDate,
          key: "selection",
        },
      ]);
    }
  }, [range, startDate, endDate]);

  const handleSingleDateChange = (selectedDate: Date) => {
    setDate(selectedDate);
    onChange(selectedDate);
    setIsCalendarOpen(false);
  };

  const handleRangeChange = (ranges: RangeKeyDict) => {
    const selection = ranges.selection;
    const start = selection.startDate ?? new Date();
    const end = selection.endDate ?? new Date();

    setDateRange([
      {
        startDate: start,
        endDate: end,
        key: "selection",
      },
    ]);

    onChange({ startDate: start, endDate: end });
  };

  return (
    <div className={cn("relative inline-block text-left", className)}>
      <button
        type="button"
        aria-label={range ? "Select date range" : "Select date"}
        className={cn(
          "flex cursor-pointer items-center gap-x-1.5 rounded-lg bg-white p-2 text-[12px] text-epos-text-primary",
          triggerClassName,
        )}
        onClick={() => setIsCalendarOpen((prev) => !prev)}
      >
        <CalendarDaysIcon className="size-3.5 shrink-0 text-slate-400" aria-hidden />

        <span className="whitespace-nowrap">
          {range
            ? `${formatOnlyDate(dateRange[0].startDate!)} – ${formatOnlyDate(dateRange[0].endDate!)}`
            : formatFullDate(date)}
        </span>

        <ChevronDownIcon
          className={cn(
            "size-3.5 shrink-0 transition-transform duration-300",
            isCalendarOpen && "rotate-180",
          )}
        />
      </button>

      {isCalendarOpen ? (
        <>
          <div
            className="fixed inset-0 z-40"
            aria-hidden
            onClick={() => setIsCalendarOpen(false)}
          />
          <div className="absolute right-0 z-50 mt-2 overflow-hidden rounded-lg bg-white shadow-lg">
            {range ? (
              <DateRange
                editableDateInputs
                onChange={handleRangeChange}
                moveRangeOnFirstSelection={false}
                ranges={dateRange}
                showDateDisplay={false}
                rangeColors={["#8b5cf6"]}
              />
            ) : (
              <Calendar
                date={date}
                onChange={handleSingleDateChange}
                showDateDisplay={false}
                color="#8b5cf6"
              />
            )}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default DatePicker;
