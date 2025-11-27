import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      );
    }

    const { id } = await params;

    await prisma.blockedSlot.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Delete blocked slot error:", error);
    return NextResponse.json(
      { error: "Error al eliminar bloqueo" },
      { status: 500 }
    );
  }
}

