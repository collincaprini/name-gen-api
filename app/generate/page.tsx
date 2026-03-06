'use client'

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import NameFrequencyChart from "@/components/NameFrequencyChart"
import EthnicityPieChart from "@/components/EthnicityPieChart"

type Gender = "male" | "female"
type Ethnicity =
  | "asian"
  | "black"
  | "latino"
  | "mena"
  | "nativeAmerican"
  | "pacificIslander"
  | "white"

type NameQueryState = {
  gender: Gender | ""
  ethnicity: Ethnicity[]
  numberOfGivenNames: number | ""
  count: number
}

const ETHNICITY_OPTIONS: { label: string; value: Ethnicity }[] = [
  { label: "Asian", value: "asian" },
  { label: "Black", value: "black" },
  { label: "Latino", value: "latino" },
  { label: "MENA (Middle East and North Africa)", value: "mena" },
  { label: "Native American", value: "nativeAmerican" },
  { label: "Pacific Islander", value: "pacificIslander" },
  { label: "White", value: "white" },
]

function buildNameQuery(state: NameQueryState) {
  const params = new URLSearchParams()

  if (state.gender !== "") params.set("gender", state.gender)
  if (state.ethnicity.length > 0) params.set("ethnicity", state.ethnicity.join(","))
  if (state.numberOfGivenNames !== "") params.set("givenNameCount", state.numberOfGivenNames.toString())
  if (state.count > 0) params.set("count", state.count.toString())

  return params
}

//example component that allows users to test the name generator api endpoint
export default function GeneratorPage() {
  const [gender, setGender] = useState<Gender | "">("")
  const [ethnicity, setEthnicity] = useState<Ethnicity[]>([])
  const [numberOfGivenNames, setNumberOfGivenNames] = useState<number | "">("")
  const [count, setCount] = useState<number>(100)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [responseBody, setResponseBody] = useState<object | null>(null)
  const [origin, setOrigin] = useState("")

  const queryState = useMemo<NameQueryState>(() => ({
    gender,
    ethnicity,
    numberOfGivenNames,
    count,
  }), [gender, ethnicity, numberOfGivenNames, count])

  const queryString = useMemo(() => buildNameQuery(queryState).toString(), [queryState])
  const requestUrl = queryString ? `/api/v1/names?${queryString}` : "/api/v1/names/advanced"
  const builtQueryUrl = origin ? `${origin}${requestUrl}` : requestUrl

  useEffect(() => {
    setOrigin(window.location.origin)
  }, [])

  function toggleEthnicity(value: Ethnicity, checked: boolean) {
    setEthnicity((prev) => {
      if (checked) return [...new Set([...prev, value])]
      return prev.filter((item) => item !== value)
    })
  }

  const handleGenerate: React.SubmitEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    try { 
      const response = await fetch(requestUrl)
      const data = await response.json() as object
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`)
      }
      setResponseBody(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate names")
      setResponseBody(null)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-4 max-w-screen flex flex-row m-auto">

      <Card className="w-1/2">
        <CardHeader>
          <CardTitle>Generate Names</CardTitle>
          <CardDescription>Use the form below to generate names with specific characteristics.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleGenerate}>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select
                value={gender || "any"}
                onValueChange={(value) => setGender(value === "any" ? "" : (value as Gender))}
              >
                <SelectTrigger id="gender" className="w-full">
                  <SelectValue placeholder="Any gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any gender</SelectItem>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Ethnicity</Label>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {ETHNICITY_OPTIONS.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center gap-2 text-sm"
                  >
                    <Checkbox
                      checked={ethnicity.includes(option.value)}
                      onCheckedChange={(checked) => toggleEthnicity(option.value, checked === true)}
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="givenNameCount">Given Name Count</Label>
                <Select
                  value={numberOfGivenNames === "" ? "any" : numberOfGivenNames.toString()}
                  onValueChange={(value) =>
                    setNumberOfGivenNames(value === "any" ? "" : Number(value))
                  }
                >
                  <SelectTrigger id="givenNameCount" className="w-full">
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    {Array.from({ length: 11 }, (_, i) => (
                      <SelectItem key={i} value={i.toString()}>
                        {i}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="count">Number of Names to Return</Label>
                <Input
                  id="count"
                  type="number"
                  min={1}
                  max={100000}
                  value={count}
                  onChange={(event) => setCount(Math.max(1, Number(event.target.value) || 1))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Built Query</Label>
              <pre className="overflow-x-auto rounded-none border p-2 text-xs">
                {builtQueryUrl}
              </pre>
            </div>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Generating..." : "Generate"}
            </Button>
          </form>
        </CardContent>
      </Card>
      <Card className="w-1/2">
        <ScrollArea className="h-[90vh]">
          <CardHeader>
            <div className="w-full flex flex-row justify-between">
              <CardTitle>Response</CardTitle>
              <DownloadJsonButton JSONData={responseBody} />
            </div>
            <CardDescription>
              {responseBody
                ? "Below is the response from the API. You can download it as a JSON file using the button above."
                : "The response from the API will be displayed here after you generate names."
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error ? <p className="text-sm text-red-500">{error}</p> : null}
            {responseBody ? (
              <>
                {/* <div className="flex flex-row h-90 justify-between">
                  <NameFrequencyChart number={10} names={responseBody && "names" in responseBody ? (responseBody as any).names : []} />
                  <EthnicityPieChart names={responseBody && "names" in responseBody ? (responseBody as any).names : {}} />
                </div> */}
                <pre className="overflow-x-auto rounded-none border p-2 text-xs">
                  {JSON.stringify(responseBody, null, 2)}
                </pre>
              </>
            ) : null}

          </CardContent>
        </ScrollArea>
      </Card>
    </div >
  )
}

function DownloadJsonButton({ JSONData }: { JSONData: object | null }) {

  async function handleDownload() {
    if (!JSONData) return
    const blob = new Blob([JSON.stringify(JSONData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "names.json"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <Button disabled={!JSONData} variant="outline" size="sm" onClick={handleDownload}>
      Download
    </Button>
  )
}
