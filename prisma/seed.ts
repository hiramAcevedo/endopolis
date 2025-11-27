// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed de la base de datos...");

  // Crear profesionales
  const drAgustin = await prisma.professional.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: "Dr.",
      firstName: "Agustín",
      lastName: "Acevedo",
      specialty: "Gastroenterología",
      photoUrl: "/images/dr-agustin.jpg",
    },
  });
  console.log("✅ Profesional creado:", drAgustin.firstName, drAgustin.lastName);

  const licCecilia = await prisma.professional.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: "Lic.",
      firstName: "María Cecilia",
      lastName: "López",
      specialty: "Nutrición",
      photoUrl: "/images/lic-cecilia.jpg",
    },
  });
  console.log("✅ Profesional creado:", licCecilia.firstName, licCecilia.lastName);

  // Crear servicios
  const servicios = [
    {
      name: "Consulta de Gastroenterología",
      type: "CONSULTA_GASTRO" as const,
      category: "CONSULTA" as const,
      duration: 30,
      description:
        "Evaluación y diagnóstico de enfermedades del sistema digestivo. Incluye revisión de historial médico y exploración física.",
      price: 800,
      professionalId: drAgustin.id,
    },
    {
      name: "Consulta de Nutrición",
      type: "CONSULTA_NUTRICION" as const,
      category: "CONSULTA" as const,
      duration: 30,
      description:
        "Plan nutricional personalizado basado en tus objetivos de salud. Incluye evaluación de composición corporal.",
      price: 600,
      professionalId: licCecilia.id,
    },
    {
      name: "Endoscopia",
      type: "ENDOSCOPIA" as const,
      category: "PROCEDIMIENTO" as const,
      duration: 60,
      description:
        "Procedimiento diagnóstico que permite visualizar el interior del tracto digestivo superior mediante un endoscopio.",
      price: 3500,
      professionalId: drAgustin.id,
    },
    {
      name: "Colonoscopia",
      type: "COLONOSCOPIA" as const,
      category: "PROCEDIMIENTO" as const,
      duration: 60,
      description:
        "Examen del colon y recto mediante un colonoscopio. Esencial para la detección temprana de cáncer colorrectal.",
      price: 4500,
      professionalId: drAgustin.id,
    },
  ];

  for (const servicio of servicios) {
    await prisma.service.upsert({
      where: { type: servicio.type },
      update: {},
      create: servicio,
    });
    console.log("✅ Servicio creado:", servicio.name);
  }

  // Crear admin por defecto
  const hashedPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@endopolis.com" },
    update: {},
    create: {
      email: "admin@endopolis.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });
  console.log("✅ Admin creado:", admin.email);

  // Configuración inicial
  const configs = [
    { key: "appointmentMode", value: "MANUAL_CONFIRM" },
    { key: "maxAdvanceDays", value: "7" },
    { key: "clinicPhone", value: "3312345678" },
    { key: "clinicEmail", value: "contacto@endopolis.com" },
    { key: "clinicAddress", value: "Av. Vallarta 1234, Col. Americana, Guadalajara, Jalisco" },
    { key: "clinicName", value: "Endopolis - Clínica de Gastroenterología y Nutrición" },
  ];

  for (const config of configs) {
    await prisma.systemConfig.upsert({
      where: { key: config.key },
      update: { value: config.value },
      create: config,
    });
    console.log("✅ Configuración:", config.key);
  }

  console.log("🎉 Seed completado exitosamente!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

