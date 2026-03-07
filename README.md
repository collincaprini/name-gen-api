# Name Generator API

A Next.js 16 application that generates weighted random names using profile-specific given-name and surname datasets.

This project includes:

* A versioned HTTP API (`/api/v1/names`) for generating one or many names

* A local UI (`/generate`) for building and testing API queries

* A dashboard (`/`) showing sampled output and distribution charts

## Why This Exists

This app is designed to create more realistic mock-name data than a simple "first middle last" generator. It models:

* Weighted ethnicity selection

* Weighted gender selection

* Weighted number-of-given-name patterns by profile

This is useful for testing search behavior, tokenization, indexing, and storage assumptions in systems like Elasticsearch.

## Tech Stack

* Next.js 16 (App Router)

* React 19

* TypeScript

* Tailwind CSS 4

* Shadcn/UI + Recharts

## Getting Started

### Prerequisites

* Node.js 20+

* npm

### Install and run

```bash
npm install
npm run dev
```

App will be available at:

* `http://localhost:3000` (dashboard)

* `http://localhost:3000/generate` (query builder / API tester)

## API

### Base endpoint

`GET /api/v1/names`

Returns one generated name by default when no query params are provided.

### Query parameters

* `gender`: `male` or `female`

* `ethnicity`: comma-separated list of values:

  * `asian`

  * `black`

  * `latino`

  * `mena`

  * `nativeAmerican`

  * `pacificIslander`

  * `white`

* `givenNameCount`: integer number of given names to force

* `count`: integer number of names to return

Notes:

* If multiple ethnicities are passed, each generated name picks one randomly from that list.

* If `gender` is omitted, gender is selected by the internal weighted distribution.

* If `givenNameCount` is omitted, count of given names is selected by profile-specific weighted distributions.

### Example requests

```bash
# One fully random name
curl "http://localhost:3000/api/v1/names"

# 10 female names from black and latino profiles
curl "http://localhost:3000/api/v1/names?gender=female&ethnicity=black,latino&count=10"

# 50 male names with exactly 2 given names
curl "http://localhost:3000/api/v1/names?gender=male&givenNameCount=2&count=50"
```

### Example response

```json
{
  "metadata": {
    "took": "0.83 milliseconds",
    "parameters": {
      "ethnicity": ["black", "latino"],
      "gender": "female",
      "givenNameCount": "2",
      "count": "10"
    }
  },
  "names": [
    "Maria Fernanda Gonzalez",
    "Jasmine Nicole Jackson"
  ]
}
```

## Data Model

Name generation is built from JSON profile files in `lib/profile-definitions/`.

Each profile file stores weighted entries in quadruple form:

```txt
[value, probability, cdfStart, cdfEnd]
```

The generator samples a `Math.random()` value and picks the entry whose CDF range contains that value.

## Project Structure

* `app/api/v1/names/route.ts`: public API endpoint

* `app/generate/page.tsx`: interactive request builder

* `components/MainDashboardView.tsx`: dashboard sample + charts

* `lib/naming/generator.tsx`: core weighted-name generation logic

* `lib/profile-definitions/*.json`: weighted name datasets

* `app/documentation/`: project notes and design rationale

## Current Limitations

* `app/api/v1/names/advanced/route.ts` is currently a placeholder and not implemented.

* API query params are only minimally validated (for example, `gender` is validated; other numeric bounds are not fully constrained server-side yet).

# License

MIT. See [LICENSE](./LICENSE).
