import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    const { id } = await params;

    if (!session) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      );
    }

    const patient = await prisma.patient.findUnique({
      where: { id: parseInt(id) },
      include: {
        user: {
          select: {
            email: true,
          },
        },
        caregiver: true,
        appointments: {
          include: {
            service: {
              include: {
                professional: true,
              },
            },
          },
          orderBy: {
            date: "desc",
          },
        },
      },
    });

    if (!patient) {
      return NextResponse.json(
        { error: "Paciente no encontrado" },
        { status: 404 }
      );
    }

    // Check permissions
    if (session.role !== "ADMIN" && session.patientId !== patient.id) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      data: patient,
    });
  } catch (error) {
    console.error("Get patient error:", error);
    return NextResponse.json(
      { error: "Error al obtener paciente" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    const { id } = await params;
    const body = await request.json();

    if (!session) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      );
    }

    const patient = await prisma.patient.findUnique({
      where: { id: parseInt(id) },
    });

    if (!patient) {
      return NextResponse.json(
        { error: "Paciente no encontrado" },
        { status: 404 }
      );
    }

    // Check permissions
    if (session.role !== "ADMIN" && session.patientId !== patient.id) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 403 }
      );
    }

    const updatedPatient = await prisma.patient.update({
      where: { id: parseInt(id) },
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        phone: body.phone,
        address: body.address || null,
        weight: body.weight ? parseFloat(body.weight) : null,
        height: body.height ? parseFloat(body.height) : null,
        chronicDiseases: body.chronicDiseases || null,
      },
    });

    return NextResponse.json({
      success: true,
      data: updatedPatient,
    });
  } catch (error) {
    console.error("Update patient error:", error);
    return NextResponse.json(
      { error: "Error al actualizar paciente" },
      { status: 500 }
    );
  }
}

