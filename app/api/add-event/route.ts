import { NextResponse } from "next/server";

const backendBaseUrl =
  process.env.BACKEND_API_URL?.replace(/\/$/, "") || "http://localhost:8000";

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    const response = await fetch(`${backendBaseUrl}/add_event`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
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
