import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const summaries = await prisma.summary.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 50,
    });

    return NextResponse.json({
      success: true,
      data: summaries,
    });
  } catch (error: unknown) {
    console.error("Fetch summaries error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Özetler yüklenirken bir hata oluştu" },
      { status: 500 }
    );
  }
}
