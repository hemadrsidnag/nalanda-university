import { getServerSession } from "next-auth/next";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = Date.now() + "_" + file.name;

  try {
    await writeFile(
      path.join(process.cwd(), "public/resources/" + filename),
      buffer
    );
    
    // --- Metadata Logging (Todo 8, 9, 10) ---
    const METADATA_PATH = path.join(process.cwd(), "resources_metadata.json");
    let metadata: any[] = [];
    
    try {
        const data = await readFile(METADATA_PATH, 'utf-8');
        metadata = JSON.parse(data);
    } catch (e: any) {
        if (e.code !== 'ENOENT') {
            console.error("Error reading metadata file:", e);
        }
    }

    const newResource = {
        id: filename,
        originalFilename: file.name,
        path: `/resources/${filename}`,
        uploadedBy: session?.user?.email || session?.user?.name || 'Unknown',
        uploadDate: new Date().toISOString(),
    };

    metadata.push(newResource);

    await writeFile(METADATA_PATH, JSON.stringify(metadata, null, 2));
    // --- End Metadata Logging ---
    
    return NextResponse.json({ message: "File uploaded successfully", filename }, { status: 200 });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ message: "File upload failed" }, { status: 500 });
  }
}
