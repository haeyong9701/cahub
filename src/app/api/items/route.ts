import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const itemName = searchParams.keys().next().value;

  if (!itemName) {
    return new NextResponse("Bad Request: Missing item name", { status: 400 });
  }

  const normalizedName = itemName.normalize("NFD");
  const encodedName = encodeURIComponent(normalizedName);

  const extensions = ["png", "gif"]; // 시도할 확장자 순서

  for (const ext of extensions) {
    const imageUrl = `${process.env.STORAGE_BUCKET_URL}/${encodedName}.${ext}`;

    try {
      const res = await fetch(imageUrl);

      if (res.ok) {
        const buffer = await res.arrayBuffer();

        return new NextResponse(buffer, {
          status: 200,
          headers: {
            "Content-Type": res.headers.get("Content-Type") ?? `image/${ext}`,
            "Cache-Control": "public, max-age=31536000",
          },
        });
      }
    } catch (err) {
      console.error(`❌ fetch failed for .${ext}`, err);
      continue;
    }
  }

  return new NextResponse("Image not found (all extensions)", { status: 404 });
}
