import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { query } = await req.json();

    if (!query) {
      return NextResponse.json(
        { error: "Missing query" },
        { status: 400 }
      );
    }

    const response = await fetch(
      "https://overpass-api.de/api/interpreter",
      {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: query,
      }
    );

    const text = await response.text();

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "Overpass API failed",
          details: text,
        },
        { status: response.status }
      );
    }

    const data = JSON.parse(text);

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Server error",
        details: error?.message,
      },
      { status: 500 }
    );
  }
}