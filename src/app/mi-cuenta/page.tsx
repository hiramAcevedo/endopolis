import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import {
  Calendar,
  Clock,
  User,
  FileText,
  ArrowRight,
  CalendarPlus,
} from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { AppointmentStatusBadge } from "@/components/ui/Badge";

export default async function MiCuentaPage() {
  const session = await getSession();

  const patient = session?.patientId
    ? await prisma.patient.findUnique({
        where: { id: session.patientId },
        include: {
          appointments: {
            where: {
              date: { gte: new Date() },
              status: { in: ["PENDING", "CONFIRMED"] },
            },
            include: {
              service: {
                include: {
                  professional: true,
                },
              },
            },
            orderBy: { date: "asc" },
            take: 1,
          },
        },
      })
    : null;

  const nextAppointment = patient?.appointments[0];

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("es-MX", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString("es-MX", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="container mx-auto px-4">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
          Bienvenido, {patient?.firstName || "Paciente"}
        </h1>
        <p className="text-slate-500 mt-1">
          Gestiona tus citas y perfil desde aquí
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Next appointment */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-800">
                Tu próxima cita
              </h2>
              <Link href="/agendar">
                <Button size="sm" leftIcon={<CalendarPlus className="w-4 h-4" />}>
                  Nueva cita
                </Button>
              </Link>
            </div>

            {nextAppointment ? (
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="w-16 h-16 bg-emerald-500 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                    <Calendar className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <p className="text-lg font-bold text-slate-800 capitalize">
                      {formatDate(nextAppointment.date)}
                    </p>
                    <div className="flex items-center gap-4 mt-1 text-slate-600">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {formatTime(nextAppointment.date)}
                      </span>
                      <AppointmentStatusBadge status={nextAppointment.status} />
                    </div>
                    <p className="text-emerald-600 font-medium mt-2">
                      {nextAppointment.service.name}
                    </p>
                    <p className="text-sm text-slate-500">
                      {nextAppointment.service.professional.title}{" "}
                      {nextAppointment.service.professional.firstName}{" "}
                      {nextAppointment.service.professional.lastName}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-emerald-200">
                  <p className="text-sm text-slate-600">
                    <strong>Motivo:</strong> {nextAppointment.reason}
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                  <Link href="/mi-cuenta/citas">
                    <Button variant="outline" size="sm">
                      Ver todas mis citas
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-slate-400" />
                </div>
                <p className="text-slate-500 mb-4">
                  No tienes citas programadas
                </p>
                <Link href="/agendar">
                  <Button>Agendar tu primera cita</Button>
                </Link>
              </div>
            )}
          </Card>
        </div>

        {/* Quick actions */}
        <div className="space-y-4">
          <Link href="/mi-cuenta/citas">
            <Card
              hover
              className="flex items-center gap-4 cursor-pointer group"
            >
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                <Calendar className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-slate-800">Mis Citas</p>
                <p className="text-sm text-slate-500">
                  Ver historial de citas
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-500 transition-colors" />
            </Card>
          </Link>

          <Link href="/mi-cuenta/perfil">
            <Card
              hover
              className="flex items-center gap-4 cursor-pointer group"
            >
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center group-hover:bg-teal-200 transition-colors">
                <User className="w-6 h-6 text-teal-600" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-slate-800">Mi Perfil</p>
                <p className="text-sm text-slate-500">Editar mis datos</p>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-teal-500 transition-colors" />
            </Card>
          </Link>

          <Card className="flex items-center gap-4 opacity-60">
            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-slate-400" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-slate-800">Mis Estudios</p>
              <p className="text-sm text-slate-500">Próximamente</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

