import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, createSession } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, patientData } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email y contraseña son requeridos" },
        { status: 400 }
      );
    }

    if (!patientData?.firstName || !patientData?.lastName || !patientData?.birthDate || !patientData?.phone) {
      return NextResponse.json(
        { error: "Datos del paciente incompletos" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Este correo ya está registrado" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user and patient in a transaction
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: "PATIENT",
        patient: {
          create: {
            firstName: patientData.firstName,
            lastName: patientData.lastName,
            birthDate: new Date(patientData.birthDate),
            phone: patientData.phone,
            address: patientData.address || null,
            weight: patientData.weight || null,
            height: patientData.height || null,
            chronicDiseases: patientData.chronicDiseases || null,
          },
        },
      },
      include: {
        patient: true,
      },
    });

    // Create session
    await createSession(user.id);

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        patientId: user.patient?.id,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

