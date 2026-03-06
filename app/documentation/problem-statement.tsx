'use client'

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

type Dataset = {
  key: "naive" | "usDistribution" | "mena"
  label: string
  sampleMethod: string
  indexSizeMb: number
  minMs: number
  maxMs: number
  avgMs: number
  p50Ms: number
  p95Ms: number
}

const DATASETS: Dataset[] = [
  {
    key: "naive",
    label: "semantic-white-first-middle-last",
    sampleMethod: "Naive first/middle/last, white-only names",
    indexSizeMb: 29.6,
    minMs: 4,
    maxMs: 56,
    avgMs: 30.309,
    p50Ms: 33,
    p95Ms: 38,
  },
  {
    key: "usDistribution",
    label: "semantic-normal",
    sampleMethod: "U.S. distribution with 1-4 given names",
    indexSizeMb: 36,
    minMs: 4,
    maxMs: 79,
    avgMs: 32.623,
    p50Ms: 33,
    p95Ms: 45,
  },
  {
    key: "mena",
    label: "semantic-mena",
    sampleMethod: "Middle Eastern / North African names",
    indexSizeMb: 51,
    minMs: 4,
    maxMs: 85,
    avgMs: 35.817,
    p50Ms: 35,
    p95Ms: 58,
  },
]

const naiveBaseline = DATASETS.find((dataset) => dataset.key === "naive")!
const usDistribution = DATASETS.find((dataset) => dataset.key === "usDistribution")!
const menaDataset = DATASETS.find((dataset) => dataset.key === "mena")!

const impactVsNaive = DATASETS.filter((dataset) => dataset.key !== "naive").map((dataset) => ({
  label: dataset.key === "usDistribution" ? "U.S. Distribution" : "MENA",
  indexDeltaPct: roundPct(((dataset.indexSizeMb - naiveBaseline.indexSizeMb) / naiveBaseline.indexSizeMb) * 100),
  avgDeltaPct: roundPct(((dataset.avgMs - naiveBaseline.avgMs) / naiveBaseline.avgMs) * 100),
  p95DeltaPct: roundPct(((dataset.p95Ms - naiveBaseline.p95Ms) / naiveBaseline.p95Ms) * 100),
}))

const menaVsUs = {
  indexDeltaPct: roundPct(((menaDataset.indexSizeMb - usDistribution.indexSizeMb) / usDistribution.indexSizeMb) * 100),
  avgDeltaPct: roundPct(((menaDataset.avgMs - usDistribution.avgMs) / usDistribution.avgMs) * 100),
  p95DeltaPct: roundPct(((menaDataset.p95Ms - usDistribution.p95Ms) / usDistribution.p95Ms) * 100),
}

const chartConfig = {
  indexSizeMb: {
    label: "Index Size (MB)",
    color: "var(--chart-2)",
  },
  avgMs: {
    label: "Average Latency (ms)",
    color: "var(--chart-3)",
  },
  p95Ms: {
    label: "P95 Latency (ms)",
    color: "var(--chart-4)",
  },
  minMs: {
    label: "Min (ms)",
    color: "var(--chart-1)",
  },
  maxMs: {
    label: "Max (ms)",
    color: "var(--chart-5)",
  },
  indexDeltaPct: {
    label: "Index Delta %",
    color: "var(--chart-2)",
  },
  avgDeltaPct: {
    label: "Avg Delta %",
    color: "var(--chart-3)",
  },
  p95DeltaPct: {
    label: "P95 Delta %",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig

function roundPct(value: number) {
  return Number(value.toFixed(1))
}

export default function ProblemStatement() {
  return (
    <div className="bg-background text-foreground">
      <article className="mx-auto max-w-4xl space-y-10 px-4 py-8 md:px-8 md:py-12">
        <header className="space-y-4 rounded-none border bg-card p-6 md:p-8">
          <Badge variant="outline">Problem Statement</Badge>
          <h1 className="font-['Iowan_Old_Style','Palatino_Linotype','Book_Antiqua','Times_New_Roman',serif] text-3xl leading-tight md:text-5xl md:leading-[1.1]">
            Name Generation is Deceptively Complex
          </h1>
          <p className="text-sm leading-7 text-muted-foreground md:text-base">
            This document explains why synthetic name quality directly impacts infrastructure estimates
            for search systems, especially in modern systems which implement advanced search and ranking algorithms.  And why I have gone to the trouble of building this name generator API in the first place.
          </p>
        </header>

        <section className="space-y-5">
          <h2 className="font-['Iowan_Old_Style','Palatino_Linotype','Book_Antiqua','Times_New_Roman',serif] text-2xl md:text-3xl">
            Why This Problem Exists
          </h2>
          <p className="text-sm leading-8 text-muted-foreground md:text-base">
            In many projects, name generation starts as a utility task: pick common given names and surnames,
            combine them into a fixed pattern like first-middle-last, and move on. That approach is quick and
            often good enough for demos. The trouble starts when the same generated data is later reused for
            planning production infrastructure.
          </p>
          <p className="text-sm leading-8 text-muted-foreground md:text-base">
            If the target system includes search and ranking, name shape affects token count, document size,
            indexing behavior, and query latency. When test data does not resemble the real user population,
            storage and performance forecasts become optimistic. Those forecasting errors do not stay in analytics;
            they become purchasing decisions, shard layouts, and latency SLOs.
          </p>
        </section>

        <section className="space-y-5">
          <h2 className="font-['Iowan_Old_Style','Palatino_Linotype','Book_Antiqua','Times_New_Roman',serif] text-2xl md:text-3xl">
            The Common Naive Pattern
          </h2>
          <p className="text-sm leading-8 text-muted-foreground md:text-base">
            A naive generator usually assumes three things: everyone has exactly three name slots, all slots are
            drawn from one narrow distribution, and those names represent the target population well enough.
            That tends to produce data like this:
          </p>
          <pre className="overflow-x-auto border bg-muted/30 p-4 text-xs leading-7 md:text-sm">
{`[
  "Elizabeth Amanda Cole",
  "James Kevin Cook",
  "Stephanie Cynthia Cox",
  "Mary Mary Phillips",
  "James Edward Young"
]`}
          </pre>
          <p className="text-sm leading-8 text-muted-foreground md:text-base">
            Real systems do not often look like that.  If the specific system you are targeting looks like that, it might be a fine approximation. A dataset with broader cultural patterns contains different given-name
            counts, longer compounds, and varied surname structures, for example:
          </p>
          <pre className="overflow-x-auto border bg-muted/30 p-4 text-xs leading-7 md:text-sm">
{`[
  "Mary Patricia Turner",
  "Daniela Beatriz Sanchez",
  "Latisha Kayla Barbara Mary Baker",
  "Juana Alvarez",
  "Joshua Wesley Morgan"
]`}
          </pre>
          <p className="text-sm leading-8 text-muted-foreground md:text-base">
            Those differences are not cosmetic. They change the number of tokens per document, the average byte size
            of indexed content, and the tail of query latency distributions.
          </p>
        </section>

        <section className="space-y-5">
          <h2 className="font-['Iowan_Old_Style','Palatino_Linotype','Book_Antiqua','Times_New_Roman',serif] text-2xl md:text-3xl">
            Experiment Setup
          </h2>
          <p className="text-sm leading-8 text-muted-foreground md:text-base">
            To measure the impact, three Elasticsearch datasets were generated at the same scale:
            100,000 documents each. The first dataset is a strict white-first-middle-last baseline.
            The second approximates U.S. diversity with one to four given names. The third is a MENA-focused
            dataset to model a different regional scenario.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {DATASETS.map((dataset) => (
              <Card key={dataset.key} size="sm">
                <CardHeader>
                  <CardTitle className="text-sm">{dataset.label}</CardTitle>
                  <CardDescription>{dataset.sampleMethod}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-1 text-xs md:text-sm">
                  <p><strong>Index:</strong> {dataset.indexSizeMb} MB</p>
                  <p><strong>Avg:</strong> {dataset.avgMs.toFixed(3)} ms</p>
                  <p><strong>P95:</strong> {dataset.p95Ms} ms</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-5">
          <h2 className="font-['Iowan_Old_Style','Palatino_Linotype','Book_Antiqua','Times_New_Roman',serif] text-2xl md:text-3xl">
            U.S.-Distribution Data vs Naive Data
          </h2>
          <p className="text-sm leading-8 text-muted-foreground md:text-base">
            At 100k documents, the median query latency still looks similar, which makes the naive approach feel
            acceptable at first glance. The differences show up in index footprint and tail behavior. The U.S.
            distribution dataset is {impactVsNaive[0].indexDeltaPct}% larger than the naive baseline and has
            {` ${impactVsNaive[0].p95DeltaPct}%`} worse P95 latency.
          </p>
          <Card>
            <CardHeader>
              <CardTitle className="font-['Iowan_Old_Style','Palatino_Linotype','Book_Antiqua','Times_New_Roman',serif] text-xl">
                Index Footprint by Dataset
              </CardTitle>
              <CardDescription>
                Larger and more variable naming structures increase document size and index storage.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-72 w-full">
                <BarChart data={DATASETS}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="label" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} width={40} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="indexSizeMb" fill="var(--color-indexSizeMb)" radius={0} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
          <p className="text-sm leading-8 text-muted-foreground md:text-base">
            This is the critical pattern: average behavior is only moderately worse, but slower queries become
            meaningfully slower. For user-facing search, tail latency is often what users feel.
          </p>
          <Card>
            <CardHeader>
              <CardTitle className="font-['Iowan_Old_Style','Palatino_Linotype','Book_Antiqua','Times_New_Roman',serif] text-xl">
                Latency Profile (Min, Avg, P95, Max)
              </CardTitle>
              <CardDescription>
                Typical latency is close, but tail latency grows quickly with richer naming models.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-72 w-full">
                <LineChart data={DATASETS}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="label" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} width={40} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="minMs"
                    stroke="var(--color-minMs)"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="avgMs"
                    stroke="var(--color-avgMs)"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="p95Ms"
                    stroke="var(--color-p95Ms)"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="maxMs"
                    stroke="var(--color-maxMs)"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-5">
          <h2 className="font-['Iowan_Old_Style','Palatino_Linotype','Book_Antiqua','Times_New_Roman',serif] text-2xl md:text-3xl">
            Second Scenario: MENA Citizen Data
          </h2>
          <p className="text-sm leading-8 text-muted-foreground md:text-base">
            Now change the use case. Suppose you are planning a national citizen database where naming patterns
            differ from your earlier U.S.-oriented assumptions. If you still benchmark with naive first-middle-last
            mock data, your estimates can be substantially off.
          </p>
          <pre className="overflow-x-auto border bg-muted/30 p-4 text-xs leading-7 md:text-sm">
{`[
  "Hassan Muhammad Ahmad Youssef",
  "Muhammad Abdullah",
  "Rivka Fatma Amira Ali",
  "Sibel Sahar Haddad",
  "Ahmad Muhammad Ahmed Muhammad Ahmed"
]`}
          </pre>
          <p className="text-sm leading-8 text-muted-foreground md:text-base">
            In this experiment, the MENA dataset is {menaVsUs.indexDeltaPct}% larger than the U.S.-distribution dataset
            and {impactVsNaive[1].indexDeltaPct}% larger than the naive baseline. P95 latency is also
            {` ${menaVsUs.p95DeltaPct}%`} worse than U.S. distribution and {` ${impactVsNaive[1].p95DeltaPct}%`} worse
            than naive.
          </p>
        </section>

        <section className="grid gap-4 lg:grid-cols-[1.25fr_1fr]">
          <Card>
            <CardHeader>
              <CardTitle className="font-['Iowan_Old_Style','Palatino_Linotype','Book_Antiqua','Times_New_Roman',serif] text-xl">
                Impact vs Naive Baseline
              </CardTitle>
              <CardDescription>
                Percentage increase compared to semantic-white-first-middle-last.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-72 w-full">
                <BarChart data={impactVsNaive}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="label" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} width={40} />
                  <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
                  <Bar dataKey="indexDeltaPct" fill="var(--color-indexDeltaPct)" radius={0} />
                  <Bar dataKey="avgDeltaPct" fill="var(--color-avgDeltaPct)" radius={0} />
                  <Bar dataKey="p95DeltaPct" fill="var(--color-p95DeltaPct)" radius={0} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-['Iowan_Old_Style','Palatino_Linotype','Book_Antiqua','Times_New_Roman',serif] text-xl">
                Operational Consequences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-7 text-muted-foreground">
              <p>
                If synthetic data underrepresents real naming structures, storage estimates undercount, shard strategy
                becomes misaligned, and latency expectations are too optimistic.
              </p>
              <p>
                In this run, moving from naive to MENA naming assumptions increased index size by
                {` ${impactVsNaive[1].indexDeltaPct}%`} and worsened P95 latency by {` ${impactVsNaive[1].p95DeltaPct}%`}.
                Those are planning-level differences, not tuning noise.
              </p>
              <p className="text-foreground">
                Better synthetic names do not just improve test realism. They improve infrastructure decisions.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-4 border-t pt-8">
          <h2 className="font-['Iowan_Old_Style','Palatino_Linotype','Book_Antiqua','Times_New_Roman',serif] text-xl md:text-2xl">
            Note on Ethnicity Buckets
          </h2>
          <p className="text-sm leading-8 text-muted-foreground md:text-base">
            The category labels used in these experiments come from available large-scale name datasets and can feel
            dated. They are included here as technical grouping labels only. The objective is not demographic analysis;
            the objective is measuring how naming conventions affect search infrastructure behavior.
          </p>
        </section>
      </article>
    </div>
  )
}
