import { NextRequest, NextResponse } from "next/server";
import { generateName, generateNameString, getRandomValueFromArray } from "@/lib/naming/generator";

type Gender = "male" | "female";

function isGender(value: string): value is Gender {
  return value === "male" || value === "female";
}


export async function GET(request: NextRequest) {
  const now = performance.now();
  const params = request.nextUrl.searchParams;


  //parse out the query parameters:
  const ethnicties = params.get("ethnicity")?.split(",") || []
  const rawGender = params.get("gender"); // string | null
  if (rawGender !== null && !isGender(rawGender)) {
    return NextResponse.json({ error: "Invalid gender parameter" }, { status: 400 });
  }
  const gender: Gender | undefined = rawGender ?? undefined;
  const numberOfGivenNames = params.get("givenNameCount") || undefined
  const count = params.get("count") || undefined


  const names = [];
  for (let i = 0; i < (count ? parseInt(count) : 1); i++) {
    if (ethnicties.length > 0) {
      const randomEthnicity = getRandomValueFromArray(ethnicties);
      names.push(generateNameString({
        givenGender: gender,
        givenEthnicity: randomEthnicity,
        givenNumberOfGivenNames: numberOfGivenNames ?
          parseInt(numberOfGivenNames)
          :
          undefined
      }));
    } else {
      names.push(generateNameString({
        givenGender: gender,
        givenNumberOfGivenNames: numberOfGivenNames ?
          parseInt(numberOfGivenNames)
          :
          undefined
      }));
    }
  }
  const end = performance.now();
  const took = end - now;
  return NextResponse.json({
    metadata:
    {
      took: `${took.toFixed(2)} milliseconds`,
      parameters: {
        ethnicity: ethnicties.length > 0 ? ethnicties : undefined,
        gender: gender,
        givenNameCount: numberOfGivenNames,
        count: count
      }
    },
    names,
  });
}