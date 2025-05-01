import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const itemName = searchParams.keys().next().value;

    if (!itemName) {
      Sentry.captureMessage(`아이템 이름 누락: ${req.url}`, {
        level: "warning",
        tags: {
          endpoint: "/api/items",
          errorType: "missing_param",
        },
      });

      return new NextResponse("Bad Request: Missing item name", { status: 400 });
    }

    const normalizedName = itemName.normalize("NFD");
    const encodedName = encodeURIComponent(normalizedName);

    const extensions = ["png", "gif"]; // 시도할 확장자 순서
    const errors = [];

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

        // 서버에서 실패한 응답 코드 받았을 때
        errors.push(`${ext}: ${res.status} ${res.statusText}`);
      } catch (err) {
        // 네트워크 오류 등 예외 발생 시
        console.error(`❌ fetch failed for .${ext}`, err);
        errors.push(`${ext}: ${err instanceof Error ? err.message : String(err)}`);
        continue;
      }
    }

    // 모든 확장자에 대해 이미지를 찾지 못한 경우
    Sentry.captureMessage(`이미지를 찾을 수 없음: ${itemName}`, {
      level: "warning",
      tags: {
        endpoint: "/api/items",
        errorType: "not_found",
      },
      extra: {
        itemName,
        encodedName,
        attempts: errors,
      },
    });

    return new NextResponse("Image not found (all extensions)", { status: 404 });
  } catch (error) {
    // 예상치 못한 서버 에러 발생 시
    console.error("❌ 아이템 API 처리 중 예외 발생:", error);

    Sentry.captureException(error, {
      tags: {
        endpoint: "/api/items",
        errorType: "server_error",
      },
      extra: {
        url: req.url,
      },
    });

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
