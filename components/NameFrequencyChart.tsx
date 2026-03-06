"use client"

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

const chartConfig = {
  frequency: {
    label: "Frequency",
    color: "var(--chart-2)",
  },
  label: {
    color: "var(--background)",
  },
} satisfies ChartConfig

export default function NameFrequencyChart({ names, number }: { names: Name[]; number: number }) {
  const data = Object.entries(
    names.reduce<Record<string, number>>((acc, entry) => {
      const parts = entry.name.trim().split(/\s+/).filter(Boolean)

      for (const part of parts) {
        acc[part] = (acc[part] ?? 0) + 1
      }

      return acc
    }, {})
  )
    .map(([name, frequency]) => ({ name, frequency }))
    .sort((a, b) => b.frequency - a.frequency || a.name.localeCompare(b.name))
    .slice(0, number)

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Top {number} Most Frequent Names</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-70 w-full">
          <BarChart
            accessibilityLayer
            data={data}
            layout="vertical"
            margin={{ left: 16, right: 48 }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="name"
              type="category"
              tickLine={false}
              axisLine={false}
              width={0}
              hide
            />
            <XAxis dataKey="frequency" type="number" hide />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
            <Bar dataKey="frequency" layout="vertical" fill="var(--color-frequency)" radius={4}>
              <LabelList
                dataKey="name"
                position="insideLeft"
                offset={8}
                className="fill-(--color-label)"
                fontSize={12}
              />
              <LabelList
                dataKey="frequency"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
