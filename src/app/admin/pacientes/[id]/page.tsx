"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Phone,
  Mail,
  MapPin,
  Loader2,
} from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { AppointmentStatusBadge } from "@/components/ui/Badge";

interface PatientDetail {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  birthDate: string;
  address: string | null;
  weight: number | null;
  height: number | null;
  chronicDiseases: string | null;
  user?: { email: string };
  appointments: Array<{
    id: number;
    date: string;
    status: string;
    reason: string;
    service: {
      name: string;
      professional: {
        title: string;
        firstName: string;
        lastName: string;
      };
    };
  }>;
}

export default function AdminPacienteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [patient, setPatient] = useState<PatientDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPatient();
  }, [id]);

  const fetchPatient = async () => {
    try {
      const response = await fetch(`/api/patients/${id}`);
      const data = await response.json();
      if (data.success) {
        setPatient(data.data);
      }
    } catch (error) {
      console.error("Error fetching patient:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateAge = (birthDate: string) => {
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

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("es-MX", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (date: string) => {
    return new Date(date).toLocaleTimeString("es-MX", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
      </div>
    );
  }

  if (!patient) {
    return (
      <Card className="text-center py-12">
        <p className="text-slate-500">Paciente no encontrado</p>
        <Link href="/admin/pacientes" className="mt-4 inline-block">
          <Button variant="outline">Volver a pacientes</Button>
        </Link>
      </Card>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/pacientes"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-emerald-600 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a pacientes
        </Link>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {patient.firstName[0]}
            {patient.lastName[0]}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
              {patient.firstName} {patient.lastName}
            </h1>
            <p className="text-slate-500">
              {calculateAge(patient.birthDate)} años • ID: {patient.id}
            </p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Personal info */}
        <div className="space-y-6">
          <Card>
            <h2 className="text-lg font-bold text-slate-800 mb-4">
              Información personal
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-slate-400" />
                <span className="text-slate-600">{patient.phone}</span>
              </div>
              {patient.user?.email && (
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-slate-400" />
                  <span className="text-slate-600">{patient.user.email}</span>
                </div>
              )}
              {patient.address && (
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-slate-400 mt-0.5" />
                  <span className="text-slate-600">{patient.address}</span>
                </div>
              )}
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-slate-400" />
                <span className="text-slate-600">
                  {formatDate(patient.birthDate)}
                </span>
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="text-lg font-bold text-slate-800 mb-4">
              Datos médicos
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-500">Peso</p>
                  <p className="font-medium text-slate-800">
                    {patient.weight ? `${patient.weight} kg` : "—"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Altura</p>
                  <p className="font-medium text-slate-800">
                    {patient.height ? `${patient.height} cm` : "—"}
                  </p>
                </div>
              </div>
              {patient.weight && patient.height && (
                <div>
                  <p className="text-sm text-slate-500">IMC</p>
                  <p className="font-medium text-slate-800">
                    {(
                      patient.weight / Math.pow(patient.height / 100, 2)
                    ).toFixed(1)}
                  </p>
                </div>
              )}
              <div>
                <p className="text-sm text-slate-500 mb-1">
                  Enfermedades crónicas
                </p>
                <p className="text-slate-600">
                  {patient.chronicDiseases || "Ninguna registrada"}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Appointments history */}
        <div className="lg:col-span-2">
          <Card>
            <h2 className="text-lg font-bold text-slate-800 mb-4">
              Historial de citas ({patient.appointments.length})
            </h2>
            {patient.appointments.length > 0 ? (
              <div className="space-y-4">
                {patient.appointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl"
                  >
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm flex-shrink-0">
                      <Calendar className="w-6 h-6 text-slate-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <p className="font-medium text-slate-800">
                          {apt.service.name}
                        </p>
                        <AppointmentStatusBadge status={apt.status} />
                      </div>
                      <div className="flex items-center gap-4 text-sm text-slate-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(apt.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {formatTime(apt.date)}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 mt-2">
                        {apt.reason}
                      </p>
                    </div>
                    <Link href={`/admin/citas/${apt.id}`}>
                      <Button variant="ghost" size="sm">
                        Ver
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500">
                  Este paciente no tiene citas registradas
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

