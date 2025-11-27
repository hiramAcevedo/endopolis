"use client";

import { useState, useEffect } from "react";
import { CalendarOff, Plus, Trash2, Loader2 } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import { ConfirmModal } from "@/components/ui/Modal";

interface BlockedSlot {
  id: number;
  date: string;
  startTime: string | null;
  endTime: string | null;
  reason: string | null;
  isFullDay: boolean;
  serviceType: string | null;
}

export default function AdminBloqueosPage() {
  const [blockedSlots, setBlockedSlots] = useState<BlockedSlot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<BlockedSlot | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    startTime: "",
    endTime: "",
    reason: "",
    isFullDay: false,
  });

  useEffect(() => {
    fetchBlockedSlots();
  }, []);

  const fetchBlockedSlots = async () => {
    try {
      const response = await fetch("/api/blocked-slots");
      const data = await response.json();
      if (data.success) {
        setBlockedSlots(data.data);
      }
    } catch (error) {
      console.error("Error fetching blocked slots:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/blocked-slots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchBlockedSlots();
        setModalOpen(false);
        setFormData({
          date: "",
          startTime: "",
          endTime: "",
          reason: "",
          isFullDay: false,
        });
      }
    } catch (error) {
      console.error("Error creating blocked slot:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedSlot) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/blocked-slots/${selectedSlot.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchBlockedSlots();
      }
    } catch (error) {
      console.error("Error deleting blocked slot:", error);
    } finally {
      setIsSubmitting(false);
      setDeleteModalOpen(false);
      setSelectedSlot(null);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("es-MX", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
            Bloqueos de Horario
          </h1>
          <p className="text-slate-500 mt-1">
            Gestiona los días y horas bloqueados para citas
          </p>
        </div>
        <Button
          onClick={() => setModalOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Nuevo bloqueo
        </Button>
      </div>

      {/* List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
        </div>
      ) : blockedSlots.length > 0 ? (
        <div className="space-y-4">
          {blockedSlots.map((slot) => (
            <Card key={slot.id} className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <CalendarOff className="w-6 h-6 text-red-600" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-slate-800 capitalize">
                  {formatDate(slot.date)}
                </p>
                <p className="text-slate-500">
                  {slot.isFullDay
                    ? "Todo el día"
                    : `${slot.startTime} - ${slot.endTime}`}
                </p>
                {slot.reason && (
                  <p className="text-sm text-slate-400 mt-1">{slot.reason}</p>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedSlot(slot);
                  setDeleteModalOpen(true);
                }}
                leftIcon={<Trash2 className="w-4 h-4 text-red-500" />}
              >
                Eliminar
              </Button>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-center py-12">
          <CalendarOff className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500">No hay bloqueos configurados</p>
        </Card>
      )}

      {/* Create Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Nuevo bloqueo de horario"
      >
        <div className="space-y-4">
          <Input
            label="Fecha"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isFullDay}
              onChange={(e) =>
                setFormData({ ...formData, isFullDay: e.target.checked })
              }
              className="w-5 h-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
            />
            <span className="text-slate-700">Bloquear todo el día</span>
          </label>

          {!formData.isFullDay && (
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Hora inicio"
                type="time"
                value={formData.startTime}
                onChange={(e) =>
                  setFormData({ ...formData, startTime: e.target.value })
                }
              />
              <Input
                label="Hora fin"
                type="time"
                value={formData.endTime}
                onChange={(e) =>
                  setFormData({ ...formData, endTime: e.target.value })
                }
              />
            </div>
          )}

          <Input
            label="Motivo (opcional)"
            placeholder="Ej: Vacaciones, mantenimiento..."
            value={formData.reason}
            onChange={(e) =>
              setFormData({ ...formData, reason: e.target.value })
            }
          />

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="ghost" onClick={() => setModalOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={handleCreate}
              isLoading={isSubmitting}
              disabled={!formData.date}
            >
              Crear bloqueo
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete confirmation */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setSelectedSlot(null);
        }}
        onConfirm={handleDelete}
        title="Eliminar bloqueo"
        message="¿Eliminar este bloqueo de horario?"
        confirmText="Eliminar"
        variant="danger"
        isLoading={isSubmitting}
      />
    </div>
  );
}

