import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  console.log(params);

  return (NextResponse.json({
    name: "John Doe",
  }));
}