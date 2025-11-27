"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  User,
  Phone,
  CheckCircle,
  Stethoscope,
  Apple,
  Scan,
  Activity,
  Loader2,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";
import { ServiceType } from "@/types";

const services = [
  {
    type: "CONSULTA_GASTRO" as ServiceType,
    name: "Gastroenterología",
    icon: Stethoscope,
    duration: "30 min",
    color: "emerald",
  },
  {
    type: "CONSULTA_NUTRICION" as ServiceType,
    name: "Nutrición",
    icon: Apple,
    duration: "30 min",
    color: "teal",
  },
  {
    type: "ENDOSCOPIA" as ServiceType,
    name: "Endoscopia",
    icon: Scan,
    duration: "60 min",
    color: "cyan",
  },
  {
    type: "COLONOSCOPIA" as ServiceType,
    name: "Colonoscopia",
    icon: Activity,
    duration: "60 min",
    color: "sky",
  },
];

function AgendarContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialService = searchParams.get("service") as ServiceType | null;

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [error, setError] = useState("");
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    serviceType: initialService || ("" as ServiceType | ""),
    date: "",
    time: "",
    isCaregiver: false,
    caregiverFirstName: "",
    caregiverLastName: "",
    caregiverPhone: "",
    caregiverRelationship: "",
    firstName: "",
    lastName: "",
    birthDate: "",
    phone: "",
    address: "",
    weight: "",
    height: "",
    chronicDiseases: "",
    reason: "",
  });

  // Fetch available slots when date or service changes
  useEffect(() => {
    if (formData.date && formData.serviceType) {
      setLoadingSlots(true);
      fetch(
        `/api/appointments/available-slots?date=${formData.date}&service=${formData.serviceType}`
      )
        .then((res) => res.json())
        .then((data) => {
          setAvailableSlots(data.data || []);
          setFormData((prev) => ({ ...prev, time: "" }));
        })
        .catch(() => {
          setAvailableSlots([]);
        })
        .finally(() => {
          setLoadingSlots(false);
        });
    }
  }, [formData.date, formData.serviceType]);

  // Get next 7 days excluding Sundays
  const getAvailableDates = () => {
    const dates: Date[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; dates.length < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      if (date.getDay() !== 0) {
        // Skip Sundays
        dates.push(date);
      }
    }
    return dates;
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  const formatDateDisplay = (date: Date) => {
    const days = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
    const months = [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ];
    return {
      day: days[date.getDay()],
      date: date.getDate(),
      month: months[date.getMonth()],
    };
  };

  const handleSubmit = async () => {
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceType: formData.serviceType,
          date: formData.date,
          time: formData.time,
          reason: formData.reason,
          isCaregiver: formData.isCaregiver,
          caregiverData: formData.isCaregiver
            ? {
                firstName: formData.caregiverFirstName,
                lastName: formData.caregiverLastName,
                phone: formData.caregiverPhone,
                relationship: formData.caregiverRelationship,
              }
            : null,
          patientData: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            birthDate: formData.birthDate,
            phone: formData.phone,
            address: formData.address,
            weight: formData.weight,
            height: formData.height,
            chronicDiseases: formData.chronicDiseases,
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al agendar cita");
      }

      // Redirect to confirmation
      setStep(4);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al agendar cita");
    } finally {
      setIsLoading(false);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return !!formData.serviceType;
      case 2:
        return !!formData.date && !!formData.time;
      case 3:
        return (
          !!formData.firstName &&
          !!formData.lastName &&
          !!formData.birthDate &&
          !!formData.phone &&
          !!formData.reason
        );
      default:
        return false;
    }
  };

  const selectedService = services.find((s) => s.type === formData.serviceType);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-emerald-600 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al inicio
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
            Agenda tu Cita
          </h1>
          <p className="text-slate-500">
            Selecciona el servicio, fecha y hora de tu preferencia
          </p>
        </div>

        {/* Progress bar */}
        {step < 4 && (
          <div className="max-w-3xl mx-auto mb-8">
            <div className="flex items-center justify-between mb-2">
              {["Servicio", "Fecha y Hora", "Tus Datos"].map((label, index) => (
                <div
                  key={label}
                  className={`flex items-center gap-2 ${
                    index + 1 <= step ? "text-emerald-600" : "text-slate-400"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      index + 1 <= step
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-200 text-slate-500"
                    }`}
                  >
                    {index + 1 < step ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span className="hidden sm:inline font-medium">{label}</span>
                </div>
              ))}
            </div>
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="max-w-3xl mx-auto">
          {step === 1 && (
            <Card className="p-8">
              <h2 className="text-xl font-bold text-slate-800 mb-6">
                ¿Qué servicio necesitas?
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {services.map((service) => {
                  const Icon = service.icon;
                  const isSelected = formData.serviceType === service.type;

                  return (
                    <button
                      key={service.type}
                      onClick={() =>
                        setFormData({ ...formData, serviceType: service.type })
                      }
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        isSelected
                          ? "border-emerald-500 bg-emerald-50"
                          : "border-slate-200 hover:border-emerald-300 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            isSelected
                              ? "bg-emerald-500 text-white"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800">
                            {service.name}
                          </p>
                          <p className="text-sm text-slate-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {service.duration}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </Card>
          )}

          {step === 2 && (
            <Card className="p-8">
              <h2 className="text-xl font-bold text-slate-800 mb-6">
                Selecciona fecha y hora
              </h2>

              {/* Date selection */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Fecha
                </label>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {getAvailableDates().map((date) => {
                    const formatted = formatDate(date);
                    const display = formatDateDisplay(date);
                    const isSelected = formData.date === formatted;

                    return (
                      <button
                        key={formatted}
                        onClick={() =>
                          setFormData({ ...formData, date: formatted, time: "" })
                        }
                        className={`flex-shrink-0 w-16 py-3 rounded-xl border-2 text-center transition-all ${
                          isSelected
                            ? "border-emerald-500 bg-emerald-50"
                            : "border-slate-200 hover:border-emerald-300"
                        }`}
                      >
                        <p className="text-xs text-slate-500 uppercase">
                          {display.day}
                        </p>
                        <p className="text-xl font-bold text-slate-800">
                          {display.date}
                        </p>
                        <p className="text-xs text-slate-500">{display.month}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time selection */}
              {formData.date && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">
                    Hora disponible
                  </label>
                  {loadingSlots ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="w-6 h-6 text-emerald-500 animate-spin" />
                    </div>
                  ) : availableSlots.length > 0 ? (
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                      {availableSlots.map((slot) => (
                        <button
                          key={slot}
                          onClick={() =>
                            setFormData({ ...formData, time: slot })
                          }
                          className={`py-2 px-3 rounded-lg border-2 text-sm font-medium transition-all ${
                            formData.time === slot
                              ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                              : "border-slate-200 text-slate-600 hover:border-emerald-300"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-slate-500 py-8">
                      No hay horarios disponibles para esta fecha
                    </p>
                  )}
                </div>
              )}
            </Card>
          )}

          {step === 3 && (
            <Card className="p-8">
              <h2 className="text-xl font-bold text-slate-800 mb-6">
                Datos del paciente
              </h2>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                  {error}
                </div>
              )}

              {/* Caregiver checkbox */}
              <div className="mb-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isCaregiver}
                    onChange={(e) =>
                      setFormData({ ...formData, isCaregiver: e.target.checked })
                    }
                    className="w-5 h-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="text-slate-700">
                    Esta cita es para otra persona (soy cuidador/familiar)
                  </span>
                </label>
              </div>

              {/* Caregiver data */}
              {formData.isCaregiver && (
                <div className="mb-8 p-4 bg-slate-50 rounded-xl">
                  <h3 className="font-semibold text-slate-800 mb-4">
                    Datos del responsable
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      label="Nombre"
                      placeholder="Tu nombre"
                      value={formData.caregiverFirstName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          caregiverFirstName: e.target.value,
                        })
                      }
                      leftIcon={<User className="w-5 h-5" />}
                    />
                    <Input
                      label="Apellidos"
                      placeholder="Tus apellidos"
                      value={formData.caregiverLastName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          caregiverLastName: e.target.value,
                        })
                      }
                    />
                    <Input
                      label="Teléfono"
                      type="tel"
                      placeholder="33 1234 5678"
                      value={formData.caregiverPhone}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          caregiverPhone: e.target.value,
                        })
                      }
                      leftIcon={<Phone className="w-5 h-5" />}
                    />
                    <Input
                      label="Parentesco"
                      placeholder="Hijo/a, esposo/a, etc."
                      value={formData.caregiverRelationship}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          caregiverRelationship: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              )}

              {/* Patient data */}
              <div className="space-y-4">
                <h3 className="font-semibold text-slate-800">
                  {formData.isCaregiver
                    ? "Datos del paciente"
                    : "Tus datos personales"}
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    label="Nombre"
                    placeholder="Nombre del paciente"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    leftIcon={<User className="w-5 h-5" />}
                    required
                  />
                  <Input
                    label="Apellidos"
                    placeholder="Apellidos del paciente"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    required
                  />
                  <Input
                    label="Fecha de nacimiento"
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) =>
                      setFormData({ ...formData, birthDate: e.target.value })
                    }
                    leftIcon={<Calendar className="w-5 h-5" />}
                    required
                  />
                  <Input
                    label="Teléfono"
                    type="tel"
                    placeholder="33 1234 5678"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    leftIcon={<Phone className="w-5 h-5" />}
                    required
                  />
                </div>
                <Input
                  label="Dirección (opcional)"
                  placeholder="Calle, número, colonia"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                />
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    label="Peso en kg (opcional)"
                    type="number"
                    placeholder="70"
                    value={formData.weight}
                    onChange={(e) =>
                      setFormData({ ...formData, weight: e.target.value })
                    }
                  />
                  <Input
                    label="Altura en cm (opcional)"
                    type="number"
                    placeholder="170"
                    value={formData.height}
                    onChange={(e) =>
                      setFormData({ ...formData, height: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Motivo de la consulta <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-200 focus:border-emerald-500 focus:outline-none transition-colors resize-none"
                    rows={3}
                    placeholder="Describe brevemente tus síntomas o motivo de la consulta"
                    value={formData.reason}
                    onChange={(e) =>
                      setFormData({ ...formData, reason: e.target.value })
                    }
                    required
                  />
                </div>
                <Input
                  label="Enfermedades crónicas (opcional)"
                  placeholder="Diabetes, hipertensión, etc."
                  value={formData.chronicDiseases}
                  onChange={(e) =>
                    setFormData({ ...formData, chronicDiseases: e.target.value })
                  }
                />
              </div>
            </Card>
          )}

          {step === 4 && (
            <Card className="p-8 text-center">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">
                ¡Cita agendada!
              </h2>
              <p className="text-slate-500 mb-8">
                Tu cita ha sido registrada y está pendiente de confirmación.
                <br />
                Te notificaremos cuando sea confirmada.
              </p>

              <div className="bg-slate-50 rounded-xl p-6 mb-8 text-left">
                <h3 className="font-semibold text-slate-800 mb-4">
                  Resumen de tu cita
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Servicio:</span>
                    <span className="font-medium text-slate-800">
                      {selectedService?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Fecha:</span>
                    <span className="font-medium text-slate-800">
                      {new Date(formData.date).toLocaleDateString("es-MX", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Hora:</span>
                    <span className="font-medium text-slate-800">
                      {formData.time}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Paciente:</span>
                    <span className="font-medium text-slate-800">
                      {formData.firstName} {formData.lastName}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/">
                  <Button variant="outline">Volver al inicio</Button>
                </Link>
                <Link href="/registro">
                  <Button>Crear cuenta para seguimiento</Button>
                </Link>
              </div>
            </Card>
          )}

          {/* Navigation */}
          {step < 4 && (
            <div className="flex justify-between mt-6">
              {step > 1 ? (
                <Button variant="ghost" onClick={() => setStep(step - 1)}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Anterior
                </Button>
              ) : (
                <div />
              )}
              {step < 3 ? (
                <Button
                  onClick={() => setStep(step + 1)}
                  disabled={!canProceed()}
                >
                  Siguiente
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!canProceed()}
                  isLoading={isLoading}
                >
                  Confirmar Cita
                  <CheckCircle className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AgendarPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
        </div>
      }
    >
      <AgendarContent />
    </Suspense>
  );
}

