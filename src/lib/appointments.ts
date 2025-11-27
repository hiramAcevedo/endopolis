// src/lib/appointments.ts
import { prisma } from "./prisma";
import { ServiceType } from "@/types";

export const SCHEDULE_CONFIG = {
  CONSULTA: {
    duration: 30, // minutos
    weekdays: {
      start: "08:00",
      end: "12:30",
    },
    saturday: {
      start: "09:00",
      end: "14:00",
    },
    sunday: null, // No disponible
  },
  PROCEDIMIENTO: {
    duration: 60, // minutos
    weekdays: {
      start: "10:00",
      end: "12:00",
    },
    saturday: {
      start: "10:00",
      end: "14:00",
    },
    sunday: null,
  },
};

export const BOOKING_RULES = {
  maxAdvanceDays: 7, // Máximo 1 semana de anticipación
  minTimeBetweenSamePatient: 60, // 60 min entre citas del mismo paciente
  minAdvanceHours: 2, // Mínimo 2 horas de anticipación
};

function parseTime(timeStr: string): number {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours * 60 + minutes;
}

function formatTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`;
}

function generateTimeSlots(
  startTime: string,
  endTime: string,
  duration: number
): string[] {
  const slots: string[] = [];
  const start = parseTime(startTime);
  const end = parseTime(endTime);

  for (let time = start; time + duration <= end; time += duration) {
    slots.push(formatTime(time));
  }

  return slots;
}

function startOfDay(date: Date): Date {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}

function endOfDay(date: Date): Date {
  const result = new Date(date);
  result.setHours(23, 59, 59, 999);
  return result;
}

function isTimeInRange(
  time: string,
  startTime: string | null,
  endTime: string | null
): boolean {
  if (!startTime || !endTime) return false;
  const t = parseTime(time);
  const start = parseTime(startTime);
  const end = parseTime(endTime);
  return t >= start && t < end;
}

function formatDateToTime(date: Date): string {
  return `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
}

export function getServiceCategory(
  serviceType: ServiceType
): "CONSULTA" | "PROCEDIMIENTO" {
  if (
    serviceType === "CONSULTA_GASTRO" ||
    serviceType === "CONSULTA_NUTRICION"
  ) {
    return "CONSULTA";
  }
  return "PROCEDIMIENTO";
}

export async function getAvailableSlots(
  date: Date,
  serviceType: ServiceType
): Promise<string[]> {
  // 1. Determinar configuración según tipo de servicio
  const category = getServiceCategory(serviceType);
  const config = SCHEDULE_CONFIG[category];

  // 2. Determinar horario del día
  const dayOfWeek = date.getDay(); // 0=Dom, 6=Sab
  if (dayOfWeek === 0) return []; // Domingo cerrado

  const schedule = dayOfWeek === 6 ? config.saturday : config.weekdays;

  if (!schedule) return [];

  // 3. Generar todos los slots posibles
  const allSlots = generateTimeSlots(schedule.start, schedule.end, config.duration);

  // 4. Obtener citas existentes del día
  const existingAppointments = await prisma.appointment.findMany({
    where: {
      date: {
        gte: startOfDay(date),
        lt: endOfDay(date),
      },
      status: { in: ["PENDING", "CONFIRMED"] },
    },
  });

  // 5. Obtener bloqueos del día
  const blockedSlots = await prisma.blockedSlot.findMany({
    where: {
      date: {
        gte: startOfDay(date),
        lt: endOfDay(date),
      },
      OR: [{ serviceType: null }, { serviceType: serviceType }],
    },
  });

  // 6. Filtrar slots ocupados o bloqueados
  const now = new Date();
  const minAdvanceTime = new Date(now.getTime() + BOOKING_RULES.minAdvanceHours * 60 * 60 * 1000);

  const availableSlots = allSlots.filter((slot) => {
    // Verificar si ya pasó (si es hoy)
    const slotDate = new Date(date);
    const [hours, minutes] = slot.split(":").map(Number);
    slotDate.setHours(hours, minutes, 0, 0);
    
    if (slotDate < minAdvanceTime) return false;

    // Verificar si está bloqueado
    const isBlocked = blockedSlots.some(
      (block) =>
        block.isFullDay ||
        isTimeInRange(slot, block.startTime, block.endTime)
    );
    if (isBlocked) return false;

    // Verificar si hay cita
    const hasAppointment = existingAppointments.some(
      (apt) => formatDateToTime(new Date(apt.date)) === slot
    );
    if (hasAppointment) return false;

    return true;
  });

  return availableSlots;
}

export function isValidAppointmentDate(date: Date): {
  valid: boolean;
  reason?: string;
} {
  const now = new Date();
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + BOOKING_RULES.maxAdvanceDays);

  // No puede ser en el pasado
  if (date < now) {
    return { valid: false, reason: "La fecha no puede ser en el pasado" };
  }

  // No puede ser más de X días en el futuro
  if (date > maxDate) {
    return {
      valid: false,
      reason: `Solo puedes agendar citas con máximo ${BOOKING_RULES.maxAdvanceDays} días de anticipación`,
    };
  }

  // No puede ser domingo
  if (date.getDay() === 0) {
    return { valid: false, reason: "No hay servicio los domingos" };
  }

  return { valid: true };
}

export function getNextAvailableDates(days: number = 7): Date[] {
  const dates: Date[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < days + 7 && dates.length < days; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    // Skip Sundays
    if (date.getDay() !== 0) {
      dates.push(date);
    }
  }

  return dates;
}

