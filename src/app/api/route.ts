import { NextResponse } from "next/server";

// Example API route with GET, POST, PUT, DELETE methods
// GET: http://localhost:3000/api/
export async function GET() {
    return NextResponse.json({ message: "API Running with GET" });
}

// POST: http://localhost:3000/api/
export async function POST() {
    return NextResponse.json({ message: "API Running with POST" });
}

export async function PUT() {
    return NextResponse.json({ message: "API Running with PUT" });
}

export async function DELETE() {
    return NextResponse.json({ message: "Delete request received" });
}