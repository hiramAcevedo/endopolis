import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?:
    | "default"
    | "success"
    | "warning"
    | "danger"
    | "info"
    | "pending"
    | "neutral";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function Badge({
  children,
  variant = "default",
  size = "md",
  className = "",
}: BadgeProps) {
  const variants = {
    default: "bg-emerald-100 text-emerald-700 border-emerald-200",
    success: "bg-green-100 text-green-700 border-green-200",
    warning: "bg-amber-100 text-amber-700 border-amber-200",
    danger: "bg-red-100 text-red-700 border-red-200",
    info: "bg-blue-100 text-blue-700 border-blue-200",
    pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
    neutral: "bg-slate-100 text-slate-700 border-slate-200",
  };

  const sizes = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-2.5 py-1",
    lg: "text-base px-3 py-1.5",
  };

  return (
    <span
      className={`
        inline-flex items-center font-medium rounded-full border
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}

// Helper para estados de citas
export function AppointmentStatusBadge({
  status,
}: {
  status: string;
}) {
  const statusConfig: Record<
    string,
    { label: string; variant: BadgeProps["variant"] }
  > = {
    PENDING: { label: "Pendiente", variant: "pending" },
    CONFIRMED: { label: "Confirmada", variant: "success" },
    CANCELLED: { label: "Cancelada", variant: "danger" },
    COMPLETED: { label: "Completada", variant: "info" },
    NO_SHOW: { label: "No asistió", variant: "neutral" },
  };

  const config = statusConfig[status] || {
    label: status,
    variant: "default" as const,
  };

  return <Badge variant={config.variant}>{config.label}</Badge>;
}

