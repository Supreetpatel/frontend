import { NextResponse } from "next/server";

const backendBaseUrl =
  process.env.BACKEND_API_URL?.replace(/\/$/, "") || "http://localhost:8000";

export async function GET() {
  try {
    const response = await fetch(`${backendBaseUrl}/events`, {
      method: "GET",
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          message: "Backend request failed",
          detail: data,
        },
        { status: response.status },
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Unable to reach backend service",
        detail: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 502 },
    );
  }
}
