import { Header, Footer, WhatsAppButton } from "@/components/layout";
import { getSession } from "@/lib/auth";
import {
  Activity,
  Clock,
  CheckCircle,
  AlertTriangle,
  Calendar,
  Shield,
} from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export const metadata = {
  title: "Colonoscopia - Endopolis",
  description:
    "Examen del colon y recto para detección temprana de cáncer colorrectal y otras condiciones.",
};

export default async function ColonoscopiaPage() {
  const session = await getSession();

  const indications = [
    "Screening de cáncer colorrectal (mayores de 45 años)",
    "Sangrado rectal o heces con sangre",
    "Cambios en el patrón intestinal",
    "Dolor abdominal crónico",
    "Anemia inexplicable",
    "Pérdida de peso sin causa",
    "Antecedentes familiares de cáncer de colon",
    "Seguimiento de pólipos previos",
  ];

  const preparation = [
    "Dieta baja en residuos 3 días antes",
    "Dieta líquida clara el día anterior",
    "Tomar el preparado intestinal indicado",
    "No consumir alimentos rojos o morados",
    "Asistir con acompañante adulto",
    "No manejar después del procedimiento",
  ];

  return (
    <>
      <Header user={session} />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative py-20 bg-gradient-to-br from-sky-600 to-cyan-700 overflow-hidden">
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
                  <Activity className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-sky-200 text-sm font-medium">
                    Procedimiento Diagnóstico
                  </p>
                  <h1 className="text-3xl sm:text-4xl font-bold text-white">
                    Colonoscopia
                  </h1>
                </div>
              </div>
              <p className="text-xl text-sky-100 mb-8">
                El estudio más efectivo para la detección temprana de cáncer
                colorrectal y otras enfermedades del colon.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <Clock className="w-5 h-5 text-white" />
                  <span className="text-white font-medium">
                    Duración: 60 min
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <Shield className="w-5 h-5 text-white" />
                  <span className="text-white font-medium">
                    Con sedación
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
                    ¿Qué es una colonoscopia?
                  </h2>
                  <p className="text-slate-600 mb-4">
                    La colonoscopia es un procedimiento que permite examinar el
                    revestimiento interno del colon (intestino grueso) y recto.
                    Se utiliza un colonoscopio: un tubo flexible con una cámara
                    que transmite imágenes en alta definición.
                  </p>
                  <p className="text-slate-600 mb-4">
                    Es el método más efectivo para detectar y prevenir el cáncer
                    colorrectal, ya que permite visualizar y remover pólipos
                    antes de que se conviertan en cáncer.
                  </p>
                  <div className="bg-sky-50 rounded-xl p-6 mt-6">
                    <h3 className="font-bold text-slate-800 mb-3">
                      El procedimiento permite:
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-sky-500 mt-0.5" />
                        <span className="text-slate-600">
                          Visualizar todo el colon en alta definición
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-sky-500 mt-0.5" />
                        <span className="text-slate-600">
                          Detectar y remover pólipos durante el mismo estudio
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-sky-500 mt-0.5" />
                        <span className="text-slate-600">
                          Tomar biopsias de lesiones sospechosas
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-sky-500 mt-0.5" />
                        <span className="text-slate-600">
                          Diagnosticar enfermedades inflamatorias intestinales
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Importance */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6">
                  <h2 className="text-xl font-bold text-slate-800 mb-4">
                    ¿Por qué es importante?
                  </h2>
                  <p className="text-slate-600 mb-4">
                    El cáncer colorrectal es el tercer cáncer más común en
                    México. Sin embargo, cuando se detecta tempranamente
                    mediante colonoscopia, tiene una tasa de curación superior
                    al 90%.
                  </p>
                  <p className="text-slate-600">
                    La Sociedad Americana del Cáncer recomienda comenzar el
                    screening a los 45 años para personas de riesgo promedio, y
                    antes si hay antecedentes familiares.
                  </p>
                </div>

                {/* Indications */}
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-4">
                    ¿Cuándo se recomienda?
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {indications.map((indication) => (
                      <div
                        key={indication}
                        className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg"
                      >
                        <AlertTriangle className="w-4 h-4 text-amber-500" />
                        <span className="text-slate-700 text-sm">
                          {indication}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Preparation */}
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-4">
                    Preparación para el estudio
                  </h2>
                  <div className="bg-amber-50 rounded-xl p-6 mb-6">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0" />
                      <div>
                        <h3 className="font-bold text-slate-800">
                          La preparación es clave
                        </h3>
                        <p className="text-slate-600 text-sm">
                          Una buena preparación intestinal es esencial para un
                          examen exitoso. Sigue todas las indicaciones al pie de
                          la letra.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {preparation.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-3 bg-sky-50 rounded-lg"
                      >
                        <CheckCircle className="w-4 h-4 text-sky-500" />
                        <span className="text-slate-700 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* CTA Card */}
                <Card className="bg-gradient-to-br from-sky-500 to-cyan-600 text-white border-0">
                  <h3 className="text-xl font-bold mb-4">
                    Agenda tu colonoscopia
                  </h3>
                  <p className="text-sky-100 mb-6">
                    Requiere valoración previa. Te entregaremos las indicaciones
                    de preparación.
                  </p>
                  <Link href="/agendar?service=COLONOSCOPIA">
                    <Button
                      className="w-full bg-white text-sky-600 hover:bg-sky-50"
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
                    <div className="w-20 h-20 bg-gradient-to-br from-sky-500 to-cyan-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                      AA
                    </div>
                    <h3 className="font-bold text-slate-800">
                      Dr. Agustín Acevedo
                    </h3>
                    <p className="text-sky-600 text-sm mb-4">
                      Gastroenterólogo - Endoscopista
                    </p>
                    <div className="text-sm text-slate-500 space-y-1">
                      <p>+3,000 colonoscopias realizadas</p>
                      <p>Equipo de alta definición</p>
                    </div>
                  </div>
                </Card>

                {/* FAQ */}
                <Card>
                  <h3 className="font-bold text-slate-800 mb-4">
                    Preguntas frecuentes
                  </h3>
                  <div className="space-y-4 text-sm">
                    <div>
                      <p className="font-medium text-slate-700">
                        ¿Es doloroso?
                      </p>
                      <p className="text-slate-500">
                        No. Se realiza con sedación, estarás dormido durante
                        todo el procedimiento.
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-slate-700">
                        ¿Cuánto dura la recuperación?
                      </p>
                      <p className="text-slate-500">
                        30-60 minutos en la clínica. Puedes retomar actividades
                        normales al día siguiente.
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-slate-700">
                        ¿Cada cuánto debo repetirla?
                      </p>
                      <p className="text-slate-500">
                        Si es normal, cada 10 años. Si hay hallazgos, el médico
                        indicará la frecuencia.
                      </p>
                    </div>
                  </div>
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

