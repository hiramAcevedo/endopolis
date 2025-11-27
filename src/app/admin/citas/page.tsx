"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Search,
  Filter,
  Eye,
  Check,
  X,
  Loader2,
} from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { AppointmentStatusBadge } from "@/components/ui/Badge";
import { ConfirmModal } from "@/components/ui/Modal";
import { Appointment } from "@/types";

export default function AdminCitasPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState<"confirm" | "cancel">(
    "confirm"
  );
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

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

  const handleAction = (
    appointment: Appointment,
    action: "confirm" | "cancel"
  ) => {
    setSelectedAppointment(appointment);
    setModalAction(action);
    setModalOpen(true);
  };

  const handleConfirmAction = async () => {
    if (!selectedAppointment) return;

    setIsProcessing(true);
    try {
      const newStatus =
        modalAction === "confirm" ? "CONFIRMED" : "CANCELLED";
      const response = await fetch(
        `/api/appointments/${selectedAppointment.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (response.ok) {
        fetchAppointments();
      }
    } catch (error) {
      console.error("Error updating appointment:", error);
    } finally {
      setIsProcessing(false);
      setModalOpen(false);
      setSelectedAppointment(null);
    }
  };

  const filteredAppointments = appointments.filter((apt) => {
    // Filter by status
    if (filter !== "all" && apt.status !== filter) return false;

    // Filter by search
    if (search) {
      const searchLower = search.toLowerCase();
      const patientName =
        `${apt.patient?.firstName} ${apt.patient?.lastName}`.toLowerCase();
      const serviceName = apt.service?.name?.toLowerCase() || "";

      if (
        !patientName.includes(searchLower) &&
        !serviceName.includes(searchLower)
      ) {
        return false;
      }
    }

    return true;
  });

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("es-MX", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString("es-MX", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Citas</h1>
        <p className="text-slate-500 mt-1">Gestiona todas las citas médicas</p>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Buscar por nombre o servicio..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              leftIcon={<Search className="w-5 h-5" />}
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 rounded-xl border-2 border-slate-200 focus:border-emerald-500 focus:outline-none"
            >
              <option value="all">Todos los estados</option>
              <option value="PENDING">Pendientes</option>
              <option value="CONFIRMED">Confirmadas</option>
              <option value="COMPLETED">Completadas</option>
              <option value="CANCELLED">Canceladas</option>
              <option value="NO_SHOW">No asistió</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Appointments list */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
        </div>
      ) : filteredAppointments.length > 0 ? (
        <div className="space-y-4">
          {filteredAppointments.map((appointment) => (
            <Card
              key={appointment.id}
              className="flex flex-col sm:flex-row gap-4"
            >
              <div className="flex items-start gap-4 flex-1">
                <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-7 h-7 text-slate-500" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <p className="font-bold text-slate-800">
                      {appointment.patient?.firstName}{" "}
                      {appointment.patient?.lastName}
                    </p>
                    <AppointmentStatusBadge status={appointment.status} />
                  </div>
                  <p className="text-emerald-600 font-medium">
                    {appointment.service?.name}
                  </p>
                  <div className="flex items-center gap-4 mt-1 text-sm text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(new Date(appointment.date))}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {formatTime(new Date(appointment.date))}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 mt-2">
                    <strong>Motivo:</strong> {appointment.reason}
                  </p>
                </div>
              </div>
              <div className="flex sm:flex-col gap-2 sm:items-end justify-end">
                <Link href={`/admin/citas/${appointment.id}`}>
                  <Button
                    variant="ghost"
                    size="sm"
                    leftIcon={<Eye className="w-4 h-4" />}
                  >
                    Ver
                  </Button>
                </Link>
                {appointment.status === "PENDING" && (
                  <>
                    <Button
                      size="sm"
                      onClick={() => handleAction(appointment, "confirm")}
                      leftIcon={<Check className="w-4 h-4" />}
                    >
                      Confirmar
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleAction(appointment, "cancel")}
                      leftIcon={<X className="w-4 h-4" />}
                    >
                      Rechazar
                    </Button>
                  </>
                )}
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-center py-12">
          <Filter className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500">
            No hay citas que coincidan con los filtros
          </p>
        </Card>
      )}

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedAppointment(null);
        }}
        onConfirm={handleConfirmAction}
        title={
          modalAction === "confirm" ? "Confirmar cita" : "Rechazar cita"
        }
        message={
          modalAction === "confirm"
            ? "¿Confirmar esta cita? Se notificará al paciente."
            : "¿Rechazar esta cita? Se notificará al paciente."
        }
        confirmText={modalAction === "confirm" ? "Confirmar" : "Rechazar"}
        variant={modalAction === "confirm" ? "info" : "danger"}
        isLoading={isProcessing}
      />
    </div>
  );
}

