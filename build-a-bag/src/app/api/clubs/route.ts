// app/api/clubs/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { bagId, club } = await request.json();

    // Verify bag ownership
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

    // Create club
    const newClub = await prisma.club.create({
      data: {
        type: club.type,
        brand: club.brand,
        model: club.model,
        loft: club.loft,
        specification: club.specification,
        imageUrl: club.imageUrl,
        bagId: bagId
      }
    });

    return NextResponse.json({ 
      success: true, 
      data: newClub 
    });

  } catch (error) {
    console.error("Error creating club:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create club" },
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
    const clubId = searchParams.get("clubId");
    const bagId = searchParams.get("bagId");

    if (!clubId || !bagId) {
      return NextResponse.json(
        { success: false, error: "Missing clubId or bagId" },
        { status: 400 }
      );
    }

    // Verify bag ownership
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

    // Delete club
    await prisma.club.delete({
      where: {
        id: clubId,
      }
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Error deleting club:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete club" },
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

    const { clubId, bagId, updates } = await request.json();

    // Verify bag ownership
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

    // Update club
    const updatedClub = await prisma.club.update({
      where: {
        id: clubId,
      },
      data: {
        ...updates,
        updatedAt: new Date()
      }
    });

    return NextResponse.json({ 
      success: true, 
      data: updatedClub 
    });

  } catch (error) {
    console.error("Error updating club:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update club" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}