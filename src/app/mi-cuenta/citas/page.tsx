"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft, X, Loader2 } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { AppointmentStatusBadge } from "@/components/ui/Badge";
import { ConfirmModal } from "@/components/ui/Modal";
import { Appointment } from "@/types";

export default function MisCitasPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [isCancelling, setIsCancelling] = useState(false);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch("/api/appointments");
      const data = await response.json();
      if (data.success) {
        setAppointments(data.data);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setCancelModalOpen(true);
  };

  const handleConfirmCancel = async () => {
    if (!selectedAppointment) return;

    setIsCancelling(true);
    try {
      const response = await fetch(
        `/api/appointments/${selectedAppointment.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "CANCELLED" }),
        }
      );

      if (response.ok) {
        fetchAppointments();
      }
    } catch (error) {
      console.error("Error cancelling appointment:", error);
    } finally {
      setIsCancelling(false);
      setCancelModalOpen(false);
      setSelectedAppointment(null);
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("es-MX", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString("es-MX", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const upcomingAppointments = appointments.filter(
    (a) =>
      new Date(a.date) >= new Date() &&
      (a.status === "PENDING" || a.status === "CONFIRMED")
  );

  const pastAppointments = appointments.filter(
    (a) =>
      new Date(a.date) < new Date() ||
      a.status === "COMPLETED" ||
      a.status === "CANCELLED" ||
      a.status === "NO_SHOW"
  );

  return (
    <div className="container mx-auto px-4">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/mi-cuenta"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-emerald-600 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a mi cuenta
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
              Mis Citas
            </h1>
            <p className="text-slate-500 mt-1">
              Historial de todas tus citas médicas
            </p>
          </div>
          <Link href="/agendar">
            <Button>Nueva Cita</Button>
          </Link>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
        </div>
      ) : (
        <div className="space-y-8">
          {/* Upcoming */}
          <div>
            <h2 className="text-lg font-bold text-slate-800 mb-4">
              Próximas citas ({upcomingAppointments.length})
            </h2>
            {upcomingAppointments.length > 0 ? (
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <Card key={appointment.id} className="flex flex-col sm:flex-row gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-7 h-7 text-emerald-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-slate-800 capitalize">
                          {formatDate(new Date(appointment.date))}
                        </p>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="flex items-center gap-1 text-slate-600">
                            <Clock className="w-4 h-4" />
                            {formatTime(new Date(appointment.date))}
                          </span>
                          <AppointmentStatusBadge status={appointment.status} />
                        </div>
                        <p className="text-emerald-600 font-medium mt-2">
                          {appointment.service?.name}
                        </p>
                        <p className="text-sm text-slate-500 mt-1">
                          <strong>Motivo:</strong> {appointment.reason}
                        </p>
                      </div>
                    </div>
                    {(appointment.status === "PENDING" ||
                      appointment.status === "CONFIRMED") && (
                      <div className="flex sm:flex-col gap-2 sm:items-end">
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleCancelClick(appointment)}
                          leftIcon={<X className="w-4 h-4" />}
                        >
                          Cancelar
                        </Button>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="text-center py-8">
                <p className="text-slate-500">No tienes citas programadas</p>
                <Link href="/agendar" className="mt-4 inline-block">
                  <Button size="sm">Agendar cita</Button>
                </Link>
              </Card>
            )}
          </div>

          {/* Past */}
          {pastAppointments.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-slate-800 mb-4">
                Historial ({pastAppointments.length})
              </h2>
              <div className="space-y-4">
                {pastAppointments.map((appointment) => (
                  <Card
                    key={appointment.id}
                    className="flex items-start gap-4 opacity-75"
                  >
                    <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-7 h-7 text-slate-400" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-slate-800 capitalize">
                        {formatDate(new Date(appointment.date))}
                      </p>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="flex items-center gap-1 text-slate-600">
                          <Clock className="w-4 h-4" />
                          {formatTime(new Date(appointment.date))}
                        </span>
                        <AppointmentStatusBadge status={appointment.status} />
                      </div>
                      <p className="text-slate-600 font-medium mt-2">
                        {appointment.service?.name}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Cancel Modal */}
      <ConfirmModal
        isOpen={cancelModalOpen}
        onClose={() => {
          setCancelModalOpen(false);
          setSelectedAppointment(null);
        }}
        onConfirm={handleConfirmCancel}
        title="Cancelar cita"
        message="¿Estás seguro de que deseas cancelar esta cita? Esta acción no se puede deshacer."
        confirmText="Sí, cancelar"
        cancelText="No, mantener"
        variant="danger"
        isLoading={isCancelling}
      />
    </div>
  );
}

