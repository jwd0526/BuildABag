import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const bag = await prisma.bag.findUnique({
      where: {
        id: params.id,
        userId: session.user.id,
      },
      include: {
        clubs: true,
      },
    });

    if (!bag) {
      return NextResponse.json(
        { success: false, error: "Bag not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: bag });
  } catch (error) {
    console.error("Error fetching bag:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch bag" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}