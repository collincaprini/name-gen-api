'use client'

import { useState } from "react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

//example component that allows users to test the name generator api endpoint
export default function GeneratorPage(){
  const [gender, setGender] = useState<'male' | 'female' | ''>('');
  const [ethnicity, setEthnicity] = useState<string[]>([]);
  const [numberOfGivenNames, setNumberOfGivenNames] = useState<number | ''>('');
  const [count, setCount] = useState<number>(1);

  async function handleGenerate(){
    const params = new URLSearchParams();
    if(gender !== '') params.append('gender', gender);
    if(ethnicity.length > 0) params.append('ethnicity', ethnicity.join(','));
    if(numberOfGivenNames !== '') params.append('givenNameCount', numberOfGivenNames.toString());
    if(count) params.append('count', count.toString());

    const response = await fetch(`/api/v1/names/advanced?${params.toString()}`);
    const data = await response.json();
    console.log(data);
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl">Name Generator</h1>
      <form>
        <Card>
          <CardHeader>
            <CardTitle>Generate Names</CardTitle>
            <CardDescription>Use the form below to generate names with specific characteristics.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            Aint this some shit?
          </CardContent>
        </Card>
      </form>
    </div>
  )
}

