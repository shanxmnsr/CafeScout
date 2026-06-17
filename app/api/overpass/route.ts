import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Get query from frontend
    const { query } = await req.json();

    if (!query) {
      return NextResponse.json(
        { error: "Missing Overpass query" },
        { status: 400 }
      );
    }

    // Call Overpass API from SERVER (no CORS issue here)
    const response = await fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: query,
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Overpass API failed", status: response.status },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Server error while fetching Overpass data",
        details: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}