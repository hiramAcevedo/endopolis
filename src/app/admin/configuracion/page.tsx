"use client";

import { useState, useEffect } from "react";
import { Settings, Save, Loader2 } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function AdminConfiguracionPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [config, setConfig] = useState({
    appointmentMode: "MANUAL_CONFIRM",
    maxAdvanceDays: "7",
    clinicPhone: "",
    clinicEmail: "",
    clinicAddress: "",
    clinicName: "",
  });

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const response = await fetch("/api/config");
      const data = await response.json();
      if (data.success) {
        setConfig((prev) => ({ ...prev, ...data.data }));
      }
    } catch (error) {
      console.error("Error fetching config:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await fetch("/api/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });

      if (response.ok) {
        setMessage({
          type: "success",
          text: "Configuración guardada correctamente",
        });
      } else {
        throw new Error("Error al guardar");
      }
    } catch (error) {
      setMessage({ type: "error", text: "Error al guardar la configuración" });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
          Configuración
        </h1>
        <p className="text-slate-500 mt-1">
          Ajustes generales del sistema de citas
        </p>
      </div>

      <div className="max-w-2xl space-y-6">
        {message.text && (
          <div
            className={`p-4 rounded-xl ${
              message.type === "success"
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Appointment settings */}
        <Card>
          <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Configuración de Citas
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Modo de aceptación de citas
              </label>
              <select
                value={config.appointmentMode}
                onChange={(e) =>
                  setConfig({ ...config, appointmentMode: e.target.value })
                }
                className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-200 focus:border-emerald-500 focus:outline-none"
              >
                <option value="MANUAL_CONFIRM">
                  Confirmación manual (recomendado)
                </option>
                <option value="AUTO_ACCEPT">Aceptar automáticamente</option>
                <option value="DISABLED">Deshabilitado</option>
              </select>
              <p className="text-sm text-slate-500 mt-1">
                Determina si las citas requieren confirmación manual del
                administrador.
              </p>
            </div>

            <div>
              <Input
                label="Días de anticipación máximos"
                type="number"
                value={config.maxAdvanceDays}
                onChange={(e) =>
                  setConfig({ ...config, maxAdvanceDays: e.target.value })
                }
                helperText="Número máximo de días que los pacientes pueden agendar por adelantado"
              />
            </div>
          </div>
        </Card>

        {/* Clinic info */}
        <Card>
          <h2 className="text-lg font-bold text-slate-800 mb-6">
            Información de la Clínica
          </h2>

          <div className="space-y-4">
            <Input
              label="Nombre de la clínica"
              value={config.clinicName}
              onChange={(e) =>
                setConfig({ ...config, clinicName: e.target.value })
              }
              placeholder="Endopolis - Clínica de Gastroenterología"
            />

            <Input
              label="Teléfono"
              value={config.clinicPhone}
              onChange={(e) =>
                setConfig({ ...config, clinicPhone: e.target.value })
              }
              placeholder="33 1234 5678"
            />

            <Input
              label="Email de contacto"
              type="email"
              value={config.clinicEmail}
              onChange={(e) =>
                setConfig({ ...config, clinicEmail: e.target.value })
              }
              placeholder="contacto@endopolis.com"
            />

            <Input
              label="Dirección"
              value={config.clinicAddress}
              onChange={(e) =>
                setConfig({ ...config, clinicAddress: e.target.value })
              }
              placeholder="Av. Vallarta 1234, Col. Americana, Guadalajara"
            />
          </div>
        </Card>

        {/* Save button */}
        <div className="flex justify-end">
          <Button
            onClick={handleSave}
            isLoading={isSaving}
            leftIcon={<Save className="w-4 h-4" />}
          >
            Guardar configuración
          </Button>
        </div>
      </div>
    </div>
  );
}

