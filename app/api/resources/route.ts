import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

export async function GET() {
  const METADATA_PATH = path.join(process.cwd(), "resources_metadata.json");

  try {
    const data = await readFile(METADATA_PATH, 'utf-8');
    const resources = JSON.parse(data);
    return NextResponse.json(resources, { status: 200 });
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      // File doesn't exist yet, return empty array
      return NextResponse.json([], { status: 200 });
    }
    console.error("Error fetching resources:", error);
    return NextResponse.json({ message: "Failed to fetch resources" }, { status: 500 });
  }
}