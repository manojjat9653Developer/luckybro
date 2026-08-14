import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const cookieHeader = request.headers.get("cookie");

    const match = cookieHeader?.match(
      /(?:^|;\s*)luckybro_session=([^;]+)/
    );

    const userId = match ? Number(match[1]) : null;

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          user: null,
        },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          user: null,
        },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Auth check error:", error);

    return NextResponse.json(
      {
        success: false,
        user: null,
      },
      { status: 500 }
    );
  }
}
