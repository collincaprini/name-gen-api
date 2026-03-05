"use client"

import { Pie, PieChart, LabelList } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"

type Metrics = {
  numberOfWhites: number
  numberOfLatinos: number
  numberOfBlacks: number
  numberOfAsians: number
  numberOfNativeAmericans: number
  numberOfMenas: number
  numberOfPacificIslanders: number
}

const chartConfig = {
  total: {
    label: "People",
  },
  white: {
    label: "White",
    color: "var(--chart-1)",
  },
  latino: {
    label: "Latino",
    color: "var(--chart-2)",
  },
  black: {
    label: "Black",
    color: "var(--chart-3)",
  },
  asian: {
    label: "Asian",
    color: "var(--chart-4)",
  },
  nativeAmerican: {
    label: "Native American",
    color: "var(--chart-5)",
  },
  mena: {
    label: "MENA",
    color: "oklch(0.73 0.13 242)",
  },
  pacificIslander: {
    label: "Pacific Islander",
    color: "oklch(0.67 0.16 278)",
  },
} satisfies ChartConfig

export default function EthnicityPieChart({ metrics }: { metrics: Metrics }) {
  const data = [
    { ethnicity: "white", total: metrics.numberOfWhites, fill: "var(--color-white)" },
    { ethnicity: "latino", total: metrics.numberOfLatinos, fill: "var(--color-latino)" },
    { ethnicity: "black", total: metrics.numberOfBlacks, fill: "var(--color-black)" },
    { ethnicity: "asian", total: metrics.numberOfAsians, fill: "var(--color-asian)" },
    { ethnicity: "nativeAmerican", total: metrics.numberOfNativeAmericans, fill: "var(--color-nativeAmerican)" },
    { ethnicity: "mena", total: metrics.numberOfMenas, fill: "var(--color-mena)" },
    { ethnicity: "pacificIslander", total: metrics.numberOfPacificIslanders, fill: "var(--color-pacificIslander)" },
  ]

  return (
    <Card className="w-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Ethnicity Distribution</CardTitle>
        <CardDescription>Generated Names</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-125 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={data} dataKey="total" nameKey="ethnicity" >
              <LabelList
                dataKey="ethnicity"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: keyof typeof chartConfig) =>
                  chartConfig[value]?.label
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
