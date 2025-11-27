import { prisma } from "@/lib/prisma";
import {
  Calendar,
  Clock,
  Users,
  CheckCircle,
  AlertCircle,
  TrendingUp,
} from "lucide-react";
import Card from "@/components/ui/Card";
import { AppointmentStatusBadge } from "@/components/ui/Badge";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default async function AdminDashboardPage() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Get today's appointments
  const todayAppointments = await prisma.appointment.findMany({
    where: {
      date: {
        gte: today,
        lt: tomorrow,
      },
    },
    include: {
      patient: true,
      service: {
        include: {
          professional: true,
        },
      },
    },
    orderBy: { date: "asc" },
  });

  // Get pending appointments
  const pendingAppointments = await prisma.appointment.findMany({
    where: {
      status: "PENDING",
    },
    include: {
      patient: true,
      service: true,
    },
    orderBy: { date: "asc" },
    take: 5,
  });

  // Stats
  const totalPatients = await prisma.patient.count();
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const appointmentsThisMonth = await prisma.appointment.count({
    where: {
      createdAt: { gte: monthStart },
    },
  });
  const confirmedToday = todayAppointments.filter(
    (a) => a.status === "CONFIRMED"
  ).length;
  const pendingCount = await prisma.appointment.count({
    where: { status: "PENDING" },
  });

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString("es-MX", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("es-MX", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
          Dashboard
        </h1>
        <p className="text-slate-500 mt-1">
          {new Date().toLocaleDateString("es-MX", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
            <Calendar className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-800">
              {todayAppointments.length}
            </p>
            <p className="text-sm text-slate-500">Citas hoy</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
            <AlertCircle className="w-6 h-6 text-yellow-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-800">{pendingCount}</p>
            <p className="text-sm text-slate-500">Pendientes</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-800">{totalPatients}</p>
            <p className="text-sm text-slate-500">Pacientes</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-teal-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-800">
              {appointmentsThisMonth}
            </p>
            <p className="text-sm text-slate-500">Este mes</p>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Today's appointments */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-800">
              Citas de Hoy ({todayAppointments.length})
            </h2>
            <Link href="/admin/citas">
              <Button variant="ghost" size="sm">
                Ver todas
              </Button>
            </Link>
          </div>

          {todayAppointments.length > 0 ? (
            <div className="space-y-3">
              {todayAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl"
                >
                  <div className="w-12 text-center">
                    <p className="text-lg font-bold text-slate-800">
                      {formatTime(appointment.date)}
                    </p>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-800">
                      {appointment.patient.firstName}{" "}
                      {appointment.patient.lastName}
                    </p>
                    <p className="text-sm text-slate-500">
                      {appointment.service.name}
                    </p>
                  </div>
                  <AppointmentStatusBadge status={appointment.status} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500">No hay citas para hoy</p>
            </div>
          )}
        </Card>

        {/* Pending appointments */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-800">
              Pendientes de Confirmar ({pendingCount})
            </h2>
          </div>

          {pendingAppointments.length > 0 ? (
            <div className="space-y-3">
              {pendingAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center gap-4 p-3 bg-yellow-50 rounded-xl border border-yellow-100"
                >
                  <div className="flex-1">
                    <p className="font-medium text-slate-800">
                      {appointment.patient.firstName}{" "}
                      {appointment.patient.lastName}
                    </p>
                    <p className="text-sm text-slate-500">
                      {formatDate(appointment.date)} -{" "}
                      {formatTime(appointment.date)}
                    </p>
                    <p className="text-sm text-slate-500">
                      {appointment.service.name}
                    </p>
                  </div>
                  <Link href={`/admin/citas/${appointment.id}`}>
                    <Button size="sm">Revisar</Button>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 text-emerald-300 mx-auto mb-3" />
              <p className="text-slate-500">
                No hay citas pendientes de confirmar
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

