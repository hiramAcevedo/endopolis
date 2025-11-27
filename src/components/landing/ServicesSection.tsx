import Link from "next/link";
import {
  Stethoscope,
  Apple,
  Scan,
  Activity,
  ArrowRight,
  Clock,
} from "lucide-react";
import Card from "../ui/Card";

const services = [
  {
    icon: Stethoscope,
    title: "Gastroenterología",
    description:
      "Evaluación y tratamiento de enfermedades del sistema digestivo. Atención integral para padecimientos del estómago, intestinos, hígado y más.",
    duration: "30 min",
    href: "/consultas/gastroenterologia",
    color: "emerald",
  },
  {
    icon: Apple,
    title: "Nutrición",
    description:
      "Plan nutricional personalizado basado en tus objetivos de salud. Mejora tu alimentación con asesoría profesional especializada.",
    duration: "30 min",
    href: "/consultas/nutricion",
    color: "teal",
  },
  {
    icon: Scan,
    title: "Endoscopia",
    description:
      "Procedimiento diagnóstico para visualizar el interior del tracto digestivo superior. Tecnología de punta para diagnósticos precisos.",
    duration: "60 min",
    href: "/procedimientos/endoscopia",
    color: "cyan",
  },
  {
    icon: Activity,
    title: "Colonoscopia",
    description:
      "Examen del colon y recto. Esencial para la detección temprana de cáncer colorrectal y otras condiciones intestinales.",
    duration: "60 min",
    href: "/procedimientos/colonoscopia",
    color: "sky",
  },
];

const colorVariants: Record<string, { bg: string; icon: string; hover: string }> = {
  emerald: {
    bg: "bg-emerald-50",
    icon: "text-emerald-600",
    hover: "group-hover:bg-emerald-100",
  },
  teal: {
    bg: "bg-teal-50",
    icon: "text-teal-600",
    hover: "group-hover:bg-teal-100",
  },
  cyan: {
    bg: "bg-cyan-50",
    icon: "text-cyan-600",
    hover: "group-hover:bg-cyan-100",
  },
  sky: {
    bg: "bg-sky-50",
    icon: "text-sky-600",
    hover: "group-hover:bg-sky-100",
  },
};

export default function ServicesSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            Nuestros Servicios
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Atención especializada para tu{" "}
            <span className="text-emerald-600">sistema digestivo</span>
          </h2>
          <p className="text-lg text-slate-600">
            Ofrecemos una amplia gama de servicios médicos con tecnología de
            punta y profesionales altamente capacitados.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            const colors = colorVariants[service.color];

            return (
              <Link key={service.title} href={service.href}>
                <Card hover className="h-full group cursor-pointer">
                  <div
                    className={`w-14 h-14 ${colors.bg} ${colors.hover} rounded-xl flex items-center justify-center mb-4 transition-colors`}
                  >
                    <Icon className={`w-7 h-7 ${colors.icon}`} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-emerald-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-500 mb-4 line-clamp-3">
                    {service.description}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-1 text-sm text-slate-400">
                      <Clock className="w-4 h-4" />
                      <span>{service.duration}</span>
                    </div>
                    <div className="flex items-center gap-1 text-emerald-600 font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      Ver más
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/agendar"
            className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
          >
            Ver todos los servicios y agendar cita
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

