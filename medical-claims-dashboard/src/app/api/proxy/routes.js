import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const formData = await req.formData();

        const backendResponse = await fetch("http://51.20.82.141:8000/upload-invoice/", {
            method: "POST",
            body: formData,
        });

        const data = await backendResponse.json();
        return NextResponse.json(data, { status: backendResponse.status });

    } catch (error) {
        return NextResponse.json({ error: "Failed to connect to backend" }, { status: 500 });
    }
}
