import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const formData = await req.formData();

        const backendResponse = await fetch("http://51.20.82.141:8000/upload-invoice/", {
            method: "POST",
            body: formData,
            headers: {
                "Content-Type": req.headers.get("Content-Type") || "multipart/form-data"
            }
        });

        if (!backendResponse.ok) {
            throw new Error(`Backend responded with status ${backendResponse.status}`);
        }

        const data = await backendResponse.json();
        return NextResponse.json(data, { status: backendResponse.status });

    } catch (error) {
        console.error("Proxy Error:", error);
        return NextResponse.json({ error: "Failed to connect to backend" }, { status: 500 });
    }
}
