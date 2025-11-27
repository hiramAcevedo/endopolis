"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { AppointmentStatusBadge } from "@/components/ui/Badge";
import { Appointment } from "@/types";

export default function AdminCalendarioPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    fetchAppointments();
  }, [currentDate]);

  const fetchAppointments = async () => {
    setIsLoading(true);
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

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days: (Date | null)[] = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }

    // Add the days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const getAppointmentsForDate = (date: Date) => {
    return appointments.filter((apt) => {
      const aptDate = new Date(apt.date);
      return (
        aptDate.getFullYear() === date.getFullYear() &&
        aptDate.getMonth() === date.getMonth() &&
        aptDate.getDate() === date.getDate()
      );
    });
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString("es-MX", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const previousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
    setSelectedDate(null);
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
    setSelectedDate(null);
  };

  const days = getDaysInMonth(currentDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const selectedDateAppointments = selectedDate
    ? getAppointmentsForDate(selectedDate)
    : [];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
          Calendario
        </h1>
        <p className="text-slate-500 mt-1">Vista mensual de citas</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <Card>
            {/* Month navigation */}
            <div className="flex items-center justify-between mb-6">
              <Button variant="ghost" size="sm" onClick={previousMonth}>
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <h2 className="text-lg font-bold text-slate-800 capitalize">
                {currentDate.toLocaleDateString("es-MX", {
                  month: "long",
                  year: "numeric",
                })}
              </h2>
              <Button variant="ghost" size="sm" onClick={nextMonth}>
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>

            {/* Days header */}
            <div className="grid grid-cols-7 mb-2">
              {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day) => (
                <div
                  key={day}
                  className="text-center text-sm font-medium text-slate-500 py-2"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
              </div>
            ) : (
              <div className="grid grid-cols-7 gap-1">
                {days.map((day, index) => {
                  if (!day) {
                    return <div key={`empty-${index}`} className="p-2" />;
                  }

                  const dayAppointments = getAppointmentsForDate(day);
                  const isToday = day.getTime() === today.getTime();
                  const isSelected =
                    selectedDate?.getTime() === day.getTime();
                  const isPast = day < today;
                  const isSunday = day.getDay() === 0;

                  return (
                    <button
                      key={day.toISOString()}
                      onClick={() => setSelectedDate(day)}
                      className={`
                        p-2 min-h-[80px] rounded-lg text-left transition-colors
                        ${isSelected ? "bg-emerald-100 ring-2 ring-emerald-500" : "hover:bg-slate-50"}
                        ${isToday ? "bg-emerald-50" : ""}
                        ${isPast || isSunday ? "opacity-50" : ""}
                      `}
                    >
                      <span
                        className={`
                          inline-flex items-center justify-center w-7 h-7 rounded-full text-sm font-medium
                          ${isToday ? "bg-emerald-500 text-white" : "text-slate-700"}
                        `}
                      >
                        {day.getDate()}
                      </span>
                      {dayAppointments.length > 0 && (
                        <div className="mt-1 space-y-0.5">
                          {dayAppointments.slice(0, 2).map((apt) => (
                            <div
                              key={apt.id}
                              className={`
                                text-xs px-1 py-0.5 rounded truncate
                                ${apt.status === "CONFIRMED" ? "bg-emerald-100 text-emerald-700" : ""}
                                ${apt.status === "PENDING" ? "bg-yellow-100 text-yellow-700" : ""}
                                ${apt.status === "CANCELLED" ? "bg-red-100 text-red-700" : ""}
                              `}
                            >
                              {formatTime(new Date(apt.date))}
                            </div>
                          ))}
                          {dayAppointments.length > 2 && (
                            <div className="text-xs text-slate-400 px-1">
                              +{dayAppointments.length - 2} más
                            </div>
                          )}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </Card>
        </div>

        {/* Selected day appointments */}
        <div>
          <Card>
            <h2 className="text-lg font-bold text-slate-800 mb-4">
              {selectedDate
                ? selectedDate.toLocaleDateString("es-MX", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })
                : "Selecciona un día"}
            </h2>

            {selectedDate ? (
              selectedDateAppointments.length > 0 ? (
                <div className="space-y-3">
                  {selectedDateAppointments.map((apt) => (
                    <Link
                      key={apt.id}
                      href={`/admin/citas/${apt.id}`}
                      className="block p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-slate-800">
                          {formatTime(new Date(apt.date))}
                        </span>
                        <AppointmentStatusBadge status={apt.status} />
                      </div>
                      <p className="text-sm text-slate-600">
                        {apt.patient?.firstName} {apt.patient?.lastName}
                      </p>
                      <p className="text-xs text-emerald-600">
                        {apt.service?.name}
                      </p>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 text-center py-8">
                  No hay citas para este día
                </p>
              )
            ) : (
              <p className="text-slate-500 text-center py-8">
                Selecciona un día para ver las citas
              </p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

