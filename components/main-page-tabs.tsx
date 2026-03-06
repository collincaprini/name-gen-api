'use client'


import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import GeneratorPage from "@/app/generate/page"
import ProblemStatement from "@/app/documentation/problem-statement"

export default function MainPageTabs() {
  return (
    <Tabs defaultValue="problem-statement" className="w-full p-8 m-auto">
      <TabsList className="justify-start border-b">
        <TabsTrigger value="problem-statement">
          Problem Statement
        </TabsTrigger>
        <TabsTrigger value="generator">
          Generator
        </TabsTrigger>
      </TabsList>
      <TabsContent value="problem-statement" className="mt-4">
        <ProblemStatement />
      </TabsContent>
      <TabsContent value="generator" className="mt-4">
        <GeneratorPage />
      </TabsContent>
    </Tabs>
  )
}