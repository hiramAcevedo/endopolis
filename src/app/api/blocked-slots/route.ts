import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const dateStr = searchParams.get("date");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {};

    if (dateStr) {
      const startDate = new Date(dateStr);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(dateStr);
      endDate.setHours(23, 59, 59, 999);
      
      where.date = {
        gte: startDate,
        lte: endDate,
      };
    }

    const blockedSlots = await prisma.blockedSlot.findMany({
      where,
      orderBy: {
        date: "asc",
      },
    });

    return NextResponse.json({
      success: true,
      data: blockedSlots,
    });
  } catch (error) {
    console.error("Get blocked slots error:", error);
    return NextResponse.json(
      { error: "Error al obtener bloqueos" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { date, startTime, endTime, reason, isFullDay, serviceType } = body;

    if (!date) {
      return NextResponse.json(
        { error: "Fecha es requerida" },
        { status: 400 }
      );
    }

    const blockedSlot = await prisma.blockedSlot.create({
      data: {
        date: new Date(date),
        startTime: isFullDay ? null : startTime,
        endTime: isFullDay ? null : endTime,
        reason,
        isFullDay: isFullDay || false,
        serviceType: serviceType || null,
      },
    });

    return NextResponse.json({
      success: true,
      data: blockedSlot,
    });
  } catch (error) {
    console.error("Create blocked slot error:", error);
    return NextResponse.json(
      { error: "Error al crear bloqueo" },
      { status: 500 }
    );
  }
}

