import { Header, Footer, WhatsAppButton } from "@/components/layout";
import { getSession } from "@/lib/auth";
import {
  Apple,
  Clock,
  CheckCircle,
  Target,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export const metadata = {
  title: "Consulta de Nutrición - Endopolis",
  description:
    "Plan nutricional personalizado con la Lic. María Cecilia López.",
};

export default async function NutricionPage() {
  const session = await getSession();

  const benefits = [
    "Plan de alimentación personalizado",
    "Evaluación de composición corporal",
    "Control de peso saludable",
    "Mejora de hábitos alimenticios",
    "Manejo de enfermedades crónicas",
    "Nutrición deportiva",
    "Nutrición en el embarazo",
    "Educación nutricional",
  ];

  const conditions = [
    "Sobrepeso y obesidad",
    "Diabetes tipo 2",
    "Hipertensión arterial",
    "Colesterol y triglicéridos altos",
    "Enfermedades gastrointestinales",
    "Alergias e intolerancias alimentarias",
    "Anemia y deficiencias nutricionales",
    "Trastornos de la conducta alimentaria",
  ];

  return (
    <>
      <Header user={session} />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative py-20 bg-gradient-to-br from-teal-600 to-emerald-700 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Apple className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-teal-200 text-sm font-medium">
                    Consulta Médica
                  </p>
                  <h1 className="text-3xl sm:text-4xl font-bold text-white">
                    Nutrición
                  </h1>
                </div>
              </div>
              <p className="text-xl text-teal-100 mb-8">
                Alcanza tus objetivos de salud con un plan nutricional diseñado
                especialmente para ti.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <Clock className="w-5 h-5 text-white" />
                  <span className="text-white font-medium">
                    Duración: 30 min
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <span className="text-white font-medium">
                    Lic. María Cecilia López
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main content */}
              <div className="lg:col-span-2 space-y-12">
                {/* Description */}
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-4">
                    ¿En qué consiste la consulta?
                  </h2>
                  <p className="text-slate-600 mb-4">
                    La consulta de nutrición es una evaluación integral de tu
                    estado nutricional y hábitos alimenticios. Durante la cita,
                    la Lic. López realizará:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-teal-500 mt-0.5" />
                      <span className="text-slate-600">
                        Evaluación de tu historial de salud y alimentación
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-teal-500 mt-0.5" />
                      <span className="text-slate-600">
                        Medición de peso, talla e índice de masa corporal
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-teal-500 mt-0.5" />
                      <span className="text-slate-600">
                        Análisis de composición corporal (% de grasa, músculo,
                        agua)
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-teal-500 mt-0.5" />
                      <span className="text-slate-600">
                        Diseño de plan alimenticio personalizado
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-teal-500 mt-0.5" />
                      <span className="text-slate-600">
                        Educación nutricional y recomendaciones de estilo de vida
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Benefits */}
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-4">
                    Beneficios de la consulta
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {benefits.map((benefit) => (
                      <div
                        key={benefit}
                        className="flex items-center gap-2 p-3 bg-teal-50 rounded-lg"
                      >
                        <Target className="w-4 h-4 text-teal-500" />
                        <span className="text-slate-700 text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Conditions */}
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-4">
                    Condiciones que manejamos
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {conditions.map((condition) => (
                      <div
                        key={condition}
                        className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg"
                      >
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                        <span className="text-slate-700 text-sm">
                          {condition}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* CTA Card */}
                <Card className="bg-gradient-to-br from-teal-500 to-emerald-600 text-white border-0">
                  <h3 className="text-xl font-bold mb-4">
                    Comienza tu cambio hoy
                  </h3>
                  <p className="text-teal-100 mb-6">
                    El primer paso hacia una vida más saludable. Agenda tu
                    consulta y recibe tu plan personalizado.
                  </p>
                  <Link href="/agendar?service=CONSULTA_NUTRICION">
                    <Button
                      className="w-full bg-white text-teal-600 hover:bg-teal-50"
                      size="lg"
                      leftIcon={<Calendar className="w-5 h-5" />}
                    >
                      Agendar Cita
                    </Button>
                  </Link>
                </Card>

                {/* Doctor Card */}
                <Card>
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                      ML
                    </div>
                    <h3 className="font-bold text-slate-800">
                      Lic. María Cecilia López
                    </h3>
                    <p className="text-teal-600 text-sm mb-4">Nutrióloga</p>
                    <div className="text-sm text-slate-500 space-y-1">
                      <p>Cédula Profesional: 87654321</p>
                      <p>Certificada por CONMEXICO</p>
                    </div>
                  </div>
                </Card>

                {/* Preparation */}
                <Card>
                  <h3 className="font-bold text-slate-800 mb-4">
                    Preparación para tu cita
                  </h3>
                  <ul className="space-y-3 text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-teal-500 mt-0.5" />
                      <span>Trae estudios de laboratorio recientes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-teal-500 mt-0.5" />
                      <span>No es necesario estar en ayunas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-teal-500 mt-0.5" />
                      <span>Usa ropa cómoda para las mediciones</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-teal-500 mt-0.5" />
                      <span>
                        Piensa en tus objetivos de salud
                      </span>
                    </li>
                  </ul>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

