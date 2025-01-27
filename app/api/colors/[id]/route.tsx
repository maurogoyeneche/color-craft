import { NextResponse } from "next/server";

const url = process.env.API_URL;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  console.log(id)
  try {
    const result = await fetch(`${url}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!result.ok) {
      return NextResponse.json({ error: "No encontrado" }, { status: 404 });
    }

    const color = await result.json();
    return NextResponse.json(color, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
  ) {
    const { id } = await params;
    console.log(id)
    try {
      const result = await fetch(`${url}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*"
        },
      });
      if (!result.ok) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }
  
      const color = await result.json();
      if (result.status === 404) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }

      if (result.status === 405) {
        return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
      }

      return NextResponse.json(color, { status: 200 });
      
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  }

  export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
  ) {
    const { id } = await params;
    
    try {
      const body = await request.json();
      const result = await fetch(`${url}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*"
        },
        body: JSON.stringify(body),
      });

      const data = result.ok ? await result.json() : null;

      if (!data) {
        return NextResponse.json({ error: "Empty response from API" }, { status: 204 });
      }
  
      if (result.status === 404) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }
      
      if (result.status === 405) {
        return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
      }

      return NextResponse.json(data, { status: 200 });
      
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  }
