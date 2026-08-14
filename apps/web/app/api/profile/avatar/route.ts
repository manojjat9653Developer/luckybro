import { NextResponse } from "next/server";
import sharp from "sharp";
import { prisma } from "@/lib/prisma";

function getUserIdFromCookie(request: Request) {
  const cookieHeader = request.headers.get("cookie");

  const match = cookieHeader?.match(
    /(?:^|;\s*)luckybro_session=([^;]+)/
  );

  const userId = match ? Number(match[1]) : null;

  if (!userId || !Number.isInteger(userId)) {
    return null;
  }

  return userId;
}

export async function POST(request: Request) {
  try {
    const userId = getUserIdFromCookie(request);

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("avatar");

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please select an image.",
        },
        { status: 400 }
      );
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        {
          success: false,
          message: "Only image files are allowed.",
        },
        { status: 400 }
      );
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        {
          success: false,
          message: "Image must be smaller than 5MB.",
        },
        { status: 400 }
      );
    }

    const inputBuffer = Buffer.from(await file.arrayBuffer());

    const outputBuffer = await sharp(inputBuffer)
      .resize(400, 400, {
        fit: "cover",
        position: "centre",
      })
      .webp({
        quality: 85,
      })
      .toBuffer();

    const avatar = `data:image/webp;base64,${outputBuffer.toString("base64")}`;

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        avatar,
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Avatar updated successfully.",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Avatar upload error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to upload avatar.",
      },
      { status: 500 }
    );
  }
}