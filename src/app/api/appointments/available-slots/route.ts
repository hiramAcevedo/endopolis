import { NextResponse } from "next/server";
import { getAvailableSlots, isValidAppointmentDate } from "@/lib/appointments";
import { ServiceType } from "@/types";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const dateStr = searchParams.get("date");
    const serviceType = searchParams.get("service") as ServiceType;

    if (!dateStr || !serviceType) {
      return NextResponse.json(
        { error: "Fecha y servicio son requeridos" },
        { status: 400 }
      );
    }

    const date = new Date(dateStr);
    
    // Validate date
    const validation = isValidAppointmentDate(date);
    if (!validation.valid) {
      return NextResponse.json({
        success: true,
        data: [],
        message: validation.reason,
      });
    }

    // Get available slots
    const slots = await getAvailableSlots(date, serviceType);

    return NextResponse.json({
      success: true,
      data: slots,
    });
  } catch (error) {
    console.error("Get available slots error:", error);
    return NextResponse.json(
      { error: "Error al obtener horarios disponibles" },
      { status: 500 }
    );
  }
}

