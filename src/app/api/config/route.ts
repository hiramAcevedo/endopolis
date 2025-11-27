import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    const configs = await prisma.systemConfig.findMany();

    const configObject: Record<string, string> = {};
    configs.forEach((config) => {
      configObject[config.key] = config.value;
    });

    return NextResponse.json({
      success: true,
      data: configObject,
    });
  } catch (error) {
    console.error("Get config error:", error);
    return NextResponse.json(
      { error: "Error al obtener configuración" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getSession();
    
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Update each config
    for (const [key, value] of Object.entries(body)) {
      await prisma.systemConfig.upsert({
        where: { key },
        update: { value: String(value) },
        create: { key, value: String(value) },
      });
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Update config error:", error);
    return NextResponse.json(
      { error: "Error al actualizar configuración" },
      { status: 500 }
    );
  }
}

