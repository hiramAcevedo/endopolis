"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, User, Loader2, Save } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

interface PatientData {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: string;
  phone: string;
  address: string | null;
  weight: number | null;
  height: number | null;
  chronicDiseases: string | null;
  user?: {
    email: string;
  };
}

export default function PerfilPage() {
  const [patient, setPatient] = useState<PatientData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    weight: "",
    height: "",
    chronicDiseases: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const authResponse = await fetch("/api/auth/me");
      const authData = await authResponse.json();

      if (authData.user?.patientId) {
        const response = await fetch(
          `/api/patients/${authData.user.patientId}`
        );
        const data = await response.json();

        if (data.success) {
          setPatient(data.data);
          setFormData({
            firstName: data.data.firstName || "",
            lastName: data.data.lastName || "",
            phone: data.data.phone || "",
            address: data.data.address || "",
            weight: data.data.weight?.toString() || "",
            height: data.data.height?.toString() || "",
            chronicDiseases: data.data.chronicDiseases || "",
          });
        }
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patient) return;

    setIsSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await fetch(`/api/patients/${patient.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: "Perfil actualizado correctamente" });
        setPatient(data.data);
      } else {
        throw new Error(data.error || "Error al actualizar");
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Error al actualizar",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
        </div>
      </div>
    );
  }

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
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
          Mi Perfil
        </h1>
        <p className="text-slate-500 mt-1">Actualiza tus datos personales</p>
      </div>

      <div className="max-w-2xl">
        <Card>
          {/* Avatar */}
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {formData.firstName[0]}
              {formData.lastName[0]}
            </div>
            <div>
              <p className="font-bold text-lg text-slate-800">
                {formData.firstName} {formData.lastName}
              </p>
              <p className="text-slate-500">{patient?.user?.email}</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
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

            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="Nombre"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                leftIcon={<User className="w-5 h-5" />}
                required
              />
              <Input
                label="Apellidos"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                required
              />
            </div>

            <Input
              label="Teléfono"
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              required
            />

            <Input
              label="Dirección"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              placeholder="Calle, número, colonia, ciudad"
            />

            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="Peso (kg)"
                type="number"
                value={formData.weight}
                onChange={(e) =>
                  setFormData({ ...formData, weight: e.target.value })
                }
                placeholder="70"
              />
              <Input
                label="Altura (cm)"
                type="number"
                value={formData.height}
                onChange={(e) =>
                  setFormData({ ...formData, height: e.target.value })
                }
                placeholder="170"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Enfermedades crónicas
              </label>
              <textarea
                className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-200 focus:border-emerald-500 focus:outline-none transition-colors resize-none"
                rows={3}
                value={formData.chronicDiseases}
                onChange={(e) =>
                  setFormData({ ...formData, chronicDiseases: e.target.value })
                }
                placeholder="Diabetes, hipertensión, etc."
              />
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                isLoading={isSaving}
                leftIcon={<Save className="w-4 h-4" />}
              >
                Guardar cambios
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}

