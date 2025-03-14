import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        console.log("Received request at /api/proxy");

        const formData = await req.formData();
        console.log("FormData received:", formData);

        const backendResponse = await fetch("http://51.20.82.141:8000/upload-invoice/", {
            method: "POST",
            body: formData, 
        });

        const responseText = await backendResponse.text();
        console.log("Backend response:", responseText);

        if (!backendResponse.ok) {
            console.error("Backend Error:", responseText);
            return NextResponse.json({ error: "Backend error", details: responseText }, { status: backendResponse.status });
        }

        return NextResponse.json(JSON.parse(responseText), { status: backendResponse.status });

    } catch (error) {
        console.error("Proxy Error:", error);
        return NextResponse.json({ error: "Proxy failed", details: error.message }, { status: 500 });
    }
}

export function GET() {
    return NextResponse.json({ message: "Use POST" }, { status: 405 });
}
