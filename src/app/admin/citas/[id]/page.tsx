"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Phone,
  MapPin,
  FileText,
  Check,
  X,
  Loader2,
  Save,
} from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { AppointmentStatusBadge } from "@/components/ui/Badge";
import { ConfirmModal } from "@/components/ui/Modal";
import { Appointment } from "@/types";

export default function AdminCitaDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notes, setNotes] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState<
    "confirm" | "cancel" | "complete" | "noshow"
  >("confirm");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    fetchAppointment();
  }, [id]);

  const fetchAppointment = async () => {
    try {
      const response = await fetch(`/api/appointments/${id}`);
      const data = await response.json();
      if (data.success) {
        setAppointment(data.data);
        setNotes(data.data.notes || "");
      }
    } catch (error) {
      console.error("Error fetching appointment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveNotes = async () => {
    setIsSaving(true);
    try {
      await fetch(`/api/appointments/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes }),
      });
      fetchAppointment();
    } catch (error) {
      console.error("Error saving notes:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAction = (
    action: "confirm" | "cancel" | "complete" | "noshow"
  ) => {
    setModalAction(action);
    setModalOpen(true);
  };

  const handleConfirmAction = async () => {
    setIsProcessing(true);
    try {
      const statusMap = {
        confirm: "CONFIRMED",
        cancel: "CANCELLED",
        complete: "COMPLETED",
        noshow: "NO_SHOW",
      };

      await fetch(`/api/appointments/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: statusMap[modalAction] }),
      });

      fetchAppointment();
    } catch (error) {
      console.error("Error updating appointment:", error);
    } finally {
      setIsProcessing(false);
      setModalOpen(false);
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

  const calculateAge = (birthDate: Date) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }
    return age;
  };

  const getModalConfig = () => {
    switch (modalAction) {
      case "confirm":
        return {
          title: "Confirmar cita",
          message: "¿Confirmar esta cita?",
          confirmText: "Confirmar",
          variant: "info" as const,
        };
      case "cancel":
        return {
          title: "Cancelar cita",
          message: "¿Cancelar esta cita?",
          confirmText: "Cancelar cita",
          variant: "danger" as const,
        };
      case "complete":
        return {
          title: "Marcar como completada",
          message: "¿Marcar esta cita como completada?",
          confirmText: "Completar",
          variant: "info" as const,
        };
      case "noshow":
        return {
          title: "No se presentó",
          message: "¿El paciente no se presentó a la cita?",
          confirmText: "Confirmar",
          variant: "warning" as const,
        };
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
      </div>
    );
  }

  if (!appointment) {
    return (
      <Card className="text-center py-12">
        <p className="text-slate-500">Cita no encontrada</p>
        <Link href="/admin/citas" className="mt-4 inline-block">
          <Button variant="outline">Volver a citas</Button>
        </Link>
      </Card>
    );
  }

  const modalConfig = getModalConfig();

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/citas"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-emerald-600 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a citas
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
              Detalle de Cita
            </h1>
            <div className="flex items-center gap-3 mt-2">
              <AppointmentStatusBadge status={appointment.status} />
              <span className="text-slate-500">ID: {appointment.id}</span>
            </div>
          </div>
          <div className="flex gap-2">
            {appointment.status === "PENDING" && (
              <>
                <Button
                  onClick={() => handleAction("confirm")}
                  leftIcon={<Check className="w-4 h-4" />}
                >
                  Confirmar
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleAction("cancel")}
                  leftIcon={<X className="w-4 h-4" />}
                >
                  Rechazar
                </Button>
              </>
            )}
            {appointment.status === "CONFIRMED" && (
              <>
                <Button onClick={() => handleAction("complete")}>
                  Marcar completada
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleAction("noshow")}
                >
                  No se presentó
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Appointment info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Date and service */}
          <Card>
            <h2 className="text-lg font-bold text-slate-800 mb-4">
              Información de la cita
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Fecha</p>
                  <p className="font-medium text-slate-800 capitalize">
                    {formatDate(new Date(appointment.date))}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Hora</p>
                  <p className="font-medium text-slate-800">
                    {formatTime(new Date(appointment.date))}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-slate-100">
              <p className="text-sm text-slate-500 mb-1">Servicio</p>
              <p className="font-bold text-lg text-emerald-600">
                {appointment.service?.name}
              </p>
              <p className="text-slate-500">
                {appointment.service?.professional?.title}{" "}
                {appointment.service?.professional?.firstName}{" "}
                {appointment.service?.professional?.lastName}
              </p>
            </div>
          </Card>

          {/* Reason */}
          <Card>
            <h2 className="text-lg font-bold text-slate-800 mb-4">
              Motivo de consulta
            </h2>
            <p className="text-slate-600">{appointment.reason}</p>
          </Card>

          {/* Notes */}
          <Card>
            <h2 className="text-lg font-bold text-slate-800 mb-4">
              Notas del médico
            </h2>
            <textarea
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-emerald-500 focus:outline-none resize-none"
              rows={4}
              placeholder="Agregar notas sobre la consulta..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
            <div className="flex justify-end mt-4">
              <Button
                size="sm"
                onClick={handleSaveNotes}
                isLoading={isSaving}
                leftIcon={<Save className="w-4 h-4" />}
              >
                Guardar notas
              </Button>
            </div>
          </Card>
        </div>

        {/* Patient info */}
        <div>
          <Card>
            <h2 className="text-lg font-bold text-slate-800 mb-4">
              Datos del paciente
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                  {appointment.patient?.firstName[0]}
                  {appointment.patient?.lastName[0]}
                </div>
                <div>
                  <p className="font-bold text-slate-800">
                    {appointment.patient?.firstName}{" "}
                    {appointment.patient?.lastName}
                  </p>
                  <p className="text-sm text-slate-500">
                    {calculateAge(new Date(appointment.patient?.birthDate || ""))}{" "}
                    años
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-600">
                    {appointment.patient?.phone}
                  </span>
                </div>
                {appointment.patient?.address && (
                  <div className="flex items-start gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-slate-400 mt-0.5" />
                    <span className="text-slate-600">
                      {appointment.patient.address}
                    </span>
                  </div>
                )}
              </div>

              {(appointment.patient?.weight ||
                appointment.patient?.height) && (
                <div className="pt-4 border-t border-slate-100">
                  <div className="grid grid-cols-2 gap-4">
                    {appointment.patient?.weight && (
                      <div>
                        <p className="text-sm text-slate-500">Peso</p>
                        <p className="font-medium text-slate-800">
                          {appointment.patient.weight} kg
                        </p>
                      </div>
                    )}
                    {appointment.patient?.height && (
                      <div>
                        <p className="text-sm text-slate-500">Altura</p>
                        <p className="font-medium text-slate-800">
                          {appointment.patient.height} cm
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {appointment.patient?.chronicDiseases && (
                <div className="pt-4 border-t border-slate-100">
                  <p className="text-sm text-slate-500 mb-1">
                    Enfermedades crónicas
                  </p>
                  <p className="text-slate-600">
                    {appointment.patient.chronicDiseases}
                  </p>
                </div>
              )}

              <div className="pt-4">
                <Link href={`/admin/pacientes/${appointment.patient?.id}`}>
                  <Button variant="outline" size="sm" className="w-full">
                    Ver ficha completa
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmAction}
        title={modalConfig.title}
        message={modalConfig.message}
        confirmText={modalConfig.confirmText}
        variant={modalConfig.variant}
        isLoading={isProcessing}
      />
    </div>
  );
}

