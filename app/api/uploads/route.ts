import fs from "fs";
import path from "path";

import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

import { requireAuth } from "@/server/auth";

export const runtime = "nodejs";

const MAX_SIZE = 5 * 1024 * 1024;

function safeFilename(name: string): string {
  const ext = path.extname(name).toLowerCase().replace(/[^a-z0-9.]/g, "");
  const base = path
    .basename(name, ext)
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
  return `${Date.now()}-${base || "photo"}${ext || ".jpg"}`;
}

export async function POST(request: Request) {
  const auth = await requireAuth();
  if (!auth.ok) return auth.response;

  let file: File | null = null;
  try {
    const form = await request.formData();
    const candidate = form.get("file");
    if (candidate instanceof File) file = candidate;
  } catch {
    return NextResponse.json({ error: "Expected multipart/form-data with a file field" }, { status: 400 });
  }

  if (!file) {
    return NextResponse.json({ error: "Missing file (field name: file)" }, { status: 400 });
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { error: "File too large (max 5 MB)" },
      { status: 413 },
    );
  }

  const isImage = file.type.startsWith("image/");

  try {
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      if (!isImage) {
        return NextResponse.json(
          { error: "Non-image uploads only supported with local storage (no Blob token)" },
          { status: 415 },
        );
      }
      const blob = await put(`issues/${safeFilename(file.name)}`, file, {
        access: "public",
        addRandomSuffix: true,
        contentType: file.type,
      });
      return NextResponse.json({ url: blob.url, storage: "vercel-blob" }, { status: 201 });
    }

    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    let filename: string;
    try {
      fs.mkdirSync(uploadsDir, { recursive: true });
      filename = safeFilename(file.name);
      const buffer = Buffer.from(await file.arrayBuffer());
      fs.writeFileSync(path.join(uploadsDir, filename), buffer);
    } catch {
      return NextResponse.json(
        { error: "Storage not configured — set BLOB_READ_WRITE_TOKEN for production uploads" },
        { status: 503 },
      );
    }

    return NextResponse.json(
      { url: `/uploads/${filename}`, storage: "local" },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /api/uploads failed", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}