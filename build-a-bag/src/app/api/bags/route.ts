import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (userId !== session.user.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const bags = await prisma.bag.findMany({
      where: {
        userId: userId,
      },
      include: {
        clubs: true,
      },
      orderBy: {
        lastModified: 'desc'
      }
    });

    return NextResponse.json({ success: true, data: bags });
  } catch (error) {
    console.error("Error fetching bags:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch bags" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}


export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    
    if (!body.bagId) {
      return NextResponse.json(
        { success: false, error: "Bag ID is required" },
        { status: 400 }
      );
    }

    // Verify bag ownership
    const existingBag = await prisma.bag.findUnique({
      where: {
        id: body.bagId,
        userId: session.user.id,
      },
    });

    if (!existingBag) {
      return NextResponse.json(
        { success: false, error: "Bag not found or unauthorized" },
        { status: 404 }
      );
    }

    // Update the bag
    const updatedBag = await prisma.bag.update({
      where: {
        id: body.bagId,
      },
      data: {
        name: body.name,
        description: body.description,
        lastModified: new Date(),
      },
      include: {
        clubs: true,
      },
    });

    return NextResponse.json({ success: true, data: updatedBag });
  } catch (error) {
    console.error("Error updating bag:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update bag" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    
    const newBag = await prisma.bag.create({
      data: {
        name: body.name,
        description: body.description || "",
        userId: session.user.id,
      },
      include: {
        clubs: true,
      },
    });

    return NextResponse.json({ success: true, data: newBag });
  } catch (error) {
    console.error("Error creating bag:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create bag" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const bagId = searchParams.get("bagId");

    if (!bagId) {
      return NextResponse.json(
        { success: false, error: "Bag ID is required" },
        { status: 400 }
      );
    }

    // First verify the user owns the bag
    const bag = await prisma.bag.findFirst({
      where: {
        id: bagId,
        userId: session.user.id
      }
    });

    if (!bag) {
      return NextResponse.json(
        { success: false, error: "Bag not found or unauthorized" },
        { status: 404 }
      );
    }

    // Delete the bag and all related clubs (cascade delete should handle this)
    await prisma.bag.delete({
      where: {
        id: bagId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting bag:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete bag" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}