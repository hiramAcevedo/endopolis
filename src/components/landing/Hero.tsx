import Link from "next/link";
import { Calendar, Play, ArrowRight } from "lucide-react";
import Button from "../ui/Button";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background with gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/50" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative circles */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-teal-200/40 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              Citas disponibles esta semana
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
              Tu salud digestiva en{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                las mejores manos
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 mb-8 leading-relaxed">
              Clínica especializada en Gastroenterología y Nutrición. Agenda tu
              consulta con los mejores especialistas y recibe atención
              personalizada.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/agendar">
                <Button
                  size="lg"
                  rightIcon={<Calendar className="w-5 h-5" />}
                  className="w-full sm:w-auto"
                >
                  Agendar Cita
                </Button>
              </Link>
              <Link href="/nosotros">
                <Button
                  variant="outline"
                  size="lg"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                  className="w-full sm:w-auto"
                >
                  Conocer más
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-slate-200">
              <div>
                <div className="text-3xl font-bold text-emerald-600">+1000</div>
                <p className="text-slate-500 text-sm mt-1">
                  Pacientes atendidos
                </p>
              </div>
              <div>
                <div className="text-3xl font-bold text-emerald-600">15+</div>
                <p className="text-slate-500 text-sm mt-1">
                  Años de experiencia
                </p>
              </div>
              <div>
                <div className="text-3xl font-bold text-emerald-600">98%</div>
                <p className="text-slate-500 text-sm mt-1">
                  Satisfacción
                </p>
              </div>
            </div>
          </div>

          {/* Video */}
          <div className="relative">
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-emerald-500/20 border-4 border-white">
              {/* YouTube embed placeholder - replace VIDEO_ID with actual video */}
              <iframe
                src="https://www.youtube.com/watch?v=1_FlrvVQ6Tc?rel=0&modestbranding=1"
                title="Presentación Endopolis"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
              
              {/* Fallback overlay if video doesn't load */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center opacity-0 hover:opacity-0 transition-opacity pointer-events-none">
                <div className="text-center text-white">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                    <Play className="w-8 h-8 fill-current" />
                  </div>
                  <p className="font-medium">Ver presentación</p>
                </div>
              </div>
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 hidden lg:block">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-emerald-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-slate-800">
                    Citas en línea
                  </p>
                  <p className="text-sm text-slate-500">Fácil y rápido</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

