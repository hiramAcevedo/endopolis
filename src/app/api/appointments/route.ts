import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const session = await getSession();
    const { searchParams } = new URL(request.url);
    
    const status = searchParams.get("status");
    const date = searchParams.get("date");
    const patientId = searchParams.get("patientId");

    // Build where clause
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {};

    if (status) {
      where.status = status;
    }

    if (date) {
      const startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);
      
      where.date = {
        gte: startDate,
        lte: endDate,
      };
    }

    // If patient, only show their appointments
    if (session?.role === "PATIENT" && session.patientId) {
      where.patientId = session.patientId;
    } else if (patientId) {
      where.patientId = parseInt(patientId);
    }

    const appointments = await prisma.appointment.findMany({
      where,
      include: {
        patient: true,
        service: {
          include: {
            professional: true,
          },
        },
      },
      orderBy: {
        date: "asc",
      },
    });

    return NextResponse.json({
      success: true,
      data: appointments,
    });
  } catch (error) {
    console.error("Get appointments error:", error);
    return NextResponse.json(
      { error: "Error al obtener citas" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { serviceType, date, time, reason, patientData, isCaregiver, caregiverData } = body;

    if (!serviceType || !date || !time || !reason || !patientData) {
      return NextResponse.json(
        { error: "Faltan datos requeridos" },
        { status: 400 }
      );
    }

    // Get service
    const service = await prisma.service.findUnique({
      where: { type: serviceType },
    });

    if (!service) {
      return NextResponse.json(
        { error: "Servicio no encontrado" },
        { status: 404 }
      );
    }

    // Create or find patient
    let patient;
    const session = await getSession();

    if (session?.patientId) {
      // User is logged in and has a patient profile
      patient = await prisma.patient.findUnique({
        where: { id: session.patientId },
      });
    }

    if (!patient) {
      // Create new patient
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const patientCreateData: any = {
        firstName: patientData.firstName,
        lastName: patientData.lastName,
        birthDate: new Date(patientData.birthDate),
        phone: patientData.phone,
        address: patientData.address || null,
        weight: patientData.weight ? parseFloat(patientData.weight) : null,
        height: patientData.height ? parseFloat(patientData.height) : null,
        chronicDiseases: patientData.chronicDiseases || null,
      };

      // If caregiver, create caregiver first
      if (isCaregiver && caregiverData && session) {
        const caregiver = await prisma.caregiver.create({
          data: {
            firstName: caregiverData.firstName,
            lastName: caregiverData.lastName,
            phone: caregiverData.phone,
            relationship: caregiverData.relationship,
            userId: session.id,
          },
        });
        patientCreateData.caregiverId = caregiver.id;
      }

      patient = await prisma.patient.create({
        data: patientCreateData,
      });
    }

    // Create appointment datetime
    const [hours, minutes] = time.split(":").map(Number);
    const appointmentDate = new Date(date);
    appointmentDate.setHours(hours, minutes, 0, 0);

    // Check appointment mode
    const modeConfig = await prisma.systemConfig.findUnique({
      where: { key: "appointmentMode" },
    });
    const mode = modeConfig?.value || "MANUAL_CONFIRM";

    // Create appointment
    const appointment = await prisma.appointment.create({
      data: {
        date: appointmentDate,
        reason,
        status: mode === "AUTO_ACCEPT" ? "CONFIRMED" : "PENDING",
        confirmedAt: mode === "AUTO_ACCEPT" ? new Date() : null,
        patientId: patient.id,
        serviceId: service.id,
      },
      include: {
        patient: true,
        service: {
          include: {
            professional: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: appointment,
    });
  } catch (error) {
    console.error("Create appointment error:", error);
    return NextResponse.json(
      { error: "Error al crear la cita" },
      { status: 500 }
    );
  }
}

