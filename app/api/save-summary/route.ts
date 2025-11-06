import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { originalText, summary } = await request.json();

    if (!originalText || !summary) {
      return NextResponse.json(
        { error: "Orijinal metin ve özet gereklidir" },
        { status: 400 }
      );
    }

    const savedSummary = await prisma.summary.create({
      data: {
        originalText,
        summary,
      },
    });

    return NextResponse.json({
      success: true,
      data: savedSummary,
    });
  } catch (error: unknown) {
    console.error("Save summary error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Özet kaydedilirken bir hata oluştu" },
      { status: 500 }
    );
  }
}
