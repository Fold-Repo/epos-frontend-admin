"use client";

import type { FC, ReactNode } from "react";
import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { TooltipContentProps } from "recharts";
import { cn } from "@/lib";

export interface AreaSeries {
  dataKey: string;
  strokeColor?: string;
  fillColor?: string;
  gradientId?: string;
  gradientColorStart?: string;
  gradientColorEnd?: string;
  gradientOpacityStart?: number;
  gradientOpacityEnd?: number;
  strokeWidth?: number;
  showDots?: boolean;
  dotSize?: number;
  activeDotSize?: number;
  chartType?: "monotone" | "linear" | "natural" | "step";
  stackId?: string;
  hide?: boolean;
}

export interface AreaChartProps {
  data: Record<string, unknown>[];
  /** Single-series (backward compatible). Ignored when `series` is set. */
  dataKey?: string;
  xAxisKey: string;
  series?: AreaSeries[];
  strokeColor?: string;
  fillColor?: string;
  gradientId?: string;
  gradientColorStart?: string;
  gradientColorEnd?: string;
  gradientOpacityStart?: number;
  gradientOpacityEnd?: number;
  strokeWidth?: number;
  showDots?: boolean;
  dotSize?: number;
  activeDotSize?: number;
  showXAxis?: boolean;
  showYAxis?: boolean;
  xAxisFormatter?: (value: string | number) => string;
  yAxisFormatter?: (value: number) => string;
  xAxisProps?: Record<string, unknown>;
  yAxisProps?: Record<string, unknown>;
  showGrid?: boolean;
  gridProps?: Record<string, unknown>;
  customTooltip?: (props: TooltipContentProps) => ReactNode;
  showTooltip?: boolean;
  tooltipCursor?: Record<string, unknown>;
  chartType?: "monotone" | "linear" | "natural" | "step";
  height?: number | string;
  className?: string;
  containerClassName?: string;
  margin?: { top?: number; right?: number; left?: number; bottom?: number };
}

const AreaChart: FC<AreaChartProps> = ({
  data,
  dataKey,
  xAxisKey,
  series,
  strokeColor = "#D97706",
  gradientId = "colorGradient",
  gradientColorStart,
  gradientColorEnd,
  gradientOpacityStart = 0.2,
  gradientOpacityEnd = 0,
  strokeWidth = 2.5,
  showDots = true,
  dotSize = 4,
  activeDotSize = 6,
  showXAxis = true,
  showYAxis = true,
  xAxisFormatter,
  yAxisFormatter,
  xAxisProps = {},
  yAxisProps = {},
  showGrid = true,
  gridProps = {},
  customTooltip,
  showTooltip = true,
  tooltipCursor,
  chartType = "monotone",
  height = 300,
  className,
  containerClassName,
  margin,
}) => {
  const isMultiSeries = Boolean(series && series.length > 0);

  const chartSeries: AreaSeries[] = isMultiSeries
    ? series!
    : [
        {
          dataKey: dataKey ?? "value",
          strokeColor,
          fillColor: gradientColorStart || strokeColor,
          gradientId,
          gradientColorStart,
          gradientColorEnd,
          gradientOpacityStart,
          gradientOpacityEnd,
          strokeWidth,
          showDots,
          dotSize,
          activeDotSize,
          chartType,
        },
      ];

  const primaryStroke =
    chartSeries.find((s) => !s.hide)?.strokeColor ?? strokeColor;
  const resolvedCursor =
    tooltipCursor ?? {
      stroke: primaryStroke,
      strokeWidth: 1,
      strokeDasharray: "5 5",
    };

  const chartMargin = margin || {
    top: 10,
    right: 10,
    left: showYAxis ? -20 : 0,
    bottom: 0,
  };

  const containerHeight = typeof height === "number" ? height : 300;

  return (
    <div
      className={cn("w-full", containerClassName)}
      style={{
        height: typeof height === "number" ? `${height}px` : height,
        minHeight: typeof height === "number" ? `${height}px` : height,
      }}
    >
      <ResponsiveContainer width="100%" height={containerHeight}>
        <RechartsAreaChart data={data} margin={chartMargin} className={className}>
          <defs>
            {chartSeries.map((seriesItem, index) => {
              const seriesGradientId = seriesItem.gradientId || `${gradientId}-${index}`;
              const fillCol =
                seriesItem.gradientColorStart || seriesItem.strokeColor || strokeColor;
              const gradientEndCol =
                seriesItem.gradientColorEnd || seriesItem.strokeColor || strokeColor;
              const opacityStart = seriesItem.gradientOpacityStart ?? gradientOpacityStart;
              const opacityEnd = seriesItem.gradientOpacityEnd ?? gradientOpacityEnd;

              return (
                <linearGradient key={seriesGradientId} id={seriesGradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={fillCol} stopOpacity={opacityStart} />
                  <stop offset="95%" stopColor={gradientEndCol} stopOpacity={opacityEnd} />
                </linearGradient>
              );
            })}
          </defs>

          {showGrid && (
            <CartesianGrid
              strokeDasharray="0"
              stroke="#F5F5F5"
              vertical={false}
              {...gridProps}
            />
          )}

          {showXAxis && (
            <XAxis
              dataKey={xAxisKey}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "rgb(139, 149, 166)", fontSize: 12 }}
              dy={10}
              tickFormatter={xAxisFormatter}
              {...xAxisProps}
            />
          )}

          {showYAxis && (
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "rgb(139, 149, 166)", fontSize: 12 }}
              tickFormatter={yAxisFormatter}
              {...yAxisProps}
            />
          )}

          {showTooltip && (
            <Tooltip content={customTooltip} cursor={resolvedCursor} />
          )}

          {chartSeries.map((seriesItem, index) => {
            if (seriesItem.hide) return null;

            const seriesGradientId = seriesItem.gradientId || `${gradientId}-${index}`;
            const seriesStrokeColor = seriesItem.strokeColor || strokeColor;
            const seriesStrokeWidth = seriesItem.strokeWidth ?? strokeWidth;
            const seriesShowDots = seriesItem.showDots ?? showDots;
            const seriesDotSize = seriesItem.dotSize ?? dotSize;
            const seriesActiveDotSize = seriesItem.activeDotSize ?? activeDotSize;
            const seriesChartType = seriesItem.chartType ?? chartType;

            return (
              <Area
                key={seriesItem.dataKey}
                type={seriesChartType}
                dataKey={seriesItem.dataKey}
                stroke={seriesStrokeColor}
                strokeWidth={seriesStrokeWidth}
                fill={`url(#${seriesGradientId})`}
                dot={
                  seriesShowDots
                    ? { fill: seriesStrokeColor, strokeWidth: 0, r: seriesDotSize }
                    : false
                }
                activeDot={
                  seriesShowDots
                    ? {
                        r: seriesActiveDotSize,
                        fill: seriesStrokeColor,
                        stroke: "#fff",
                        strokeWidth: 2,
                      }
                    : false
                }
                stackId={seriesItem.stackId}
              />
            );
          })}
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaChart;
