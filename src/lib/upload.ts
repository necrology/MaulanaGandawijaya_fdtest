import { mkdir, unlink, writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { execute, queryOne } from "@/lib/db";
import type { Asset, AssetCategory } from "@/types/portfolio";

const uploadRoot = path.join(process.cwd(), "public", "uploads");

function sanitizeFileName(name: string) {
  const parsed = path.parse(name);
  const base = parsed.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
    .slice(0, 80);
  const ext = parsed.ext.toLowerCase();

  return `${base || "file"}${ext}`;
}

export async function saveUploadedFile(
  file: File | null,
  category: AssetCategory,
  related?: { type: string; id: number },
) {
  if (!file || file.size === 0) {
    return null;
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const safeName = sanitizeFileName(file.name);
  const fileName = `${Date.now()}-${randomUUID()}-${safeName}`;
  const categoryDir = path.join(uploadRoot, category);
  await mkdir(categoryDir, { recursive: true });

  const diskPath = path.join(categoryDir, fileName);
  await writeFile(diskPath, bytes);

  const publicPath = `/uploads/${category}/${fileName}`;
  const result = await execute(
    `INSERT INTO assets
      (original_name, file_name, path, mime_type, size, category, related_type, related_id)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      file.name,
      fileName,
      publicPath,
      file.type || "application/octet-stream",
      file.size,
      category,
      related?.type ?? null,
      related?.id ?? null,
    ],
  );

  return queryOne<Asset>("SELECT * FROM assets WHERE id = ? LIMIT 1", [
    result.insertId,
  ]);
}

export async function deleteUploadedFile(assetPath: string) {
  if (!assetPath.startsWith("/uploads/")) {
    return;
  }

  const relative = assetPath.replace(/^\/uploads\//, "");
  const resolved = path.resolve(uploadRoot, relative);
  const root = path.resolve(uploadRoot);

  if (!resolved.startsWith(root)) {
    return;
  }

  try {
    await unlink(resolved);
  } catch {
    // File may already be gone; the database cleanup should still continue.
  }
}
