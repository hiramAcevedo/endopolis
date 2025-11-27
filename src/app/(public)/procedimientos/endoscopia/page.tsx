import { Header, Footer, WhatsAppButton } from "@/components/layout";
import { getSession } from "@/lib/auth";
import {
  Scan,
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
  title: "Endoscopia - Endopolis",
  description:
    "Procedimiento diagnóstico del tracto digestivo superior con tecnología de alta definición.",
};

export default async function EndoscopiaPage() {
  const session = await getSession();

  const indications = [
    "Dolor abdominal superior persistente",
    "Dificultad para tragar",
    "Acidez crónica o reflujo severo",
    "Náuseas y vómitos persistentes",
    "Sangrado digestivo (vómito con sangre)",
    "Anemia inexplicable",
    "Pérdida de peso sin causa aparente",
    "Detección temprana de cáncer gástrico",
  ];

  const preparation = [
    "Ayuno de 8 horas antes del procedimiento",
    "No fumar el día del estudio",
    "Informar sobre medicamentos que tomas",
    "Asistir con un acompañante adulto",
    "Usar ropa cómoda",
    "No manejar después del procedimiento",
  ];

  return (
    <>
      <Header user={session} />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative py-20 bg-gradient-to-br from-cyan-600 to-teal-700 overflow-hidden">
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
                  <Scan className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-cyan-200 text-sm font-medium">
                    Procedimiento Diagnóstico
                  </p>
                  <h1 className="text-3xl sm:text-4xl font-bold text-white">
                    Endoscopia
                  </h1>
                </div>
              </div>
              <p className="text-xl text-cyan-100 mb-8">
                Exploración visual del esófago, estómago y duodeno con tecnología
                de alta definición para diagnósticos precisos.
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
                    ¿Qué es una endoscopia?
                  </h2>
                  <p className="text-slate-600 mb-4">
                    La endoscopia digestiva alta (esofagogastroduodenoscopia) es
                    un procedimiento que permite al médico examinar el
                    revestimiento interno del esófago, estómago y la primera
                    parte del intestino delgado (duodeno).
                  </p>
                  <p className="text-slate-600 mb-4">
                    Se realiza utilizando un endoscopio: un tubo flexible y
                    delgado con una luz y una cámara en el extremo. Las imágenes
                    se transmiten a un monitor, permitiendo visualizar cualquier
                    anomalía y, de ser necesario, tomar biopsias.
                  </p>
                  <div className="bg-cyan-50 rounded-xl p-6 mt-6">
                    <h3 className="font-bold text-slate-800 mb-3">
                      El procedimiento incluye:
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-cyan-500 mt-0.5" />
                        <span className="text-slate-600">
                          Sedación para tu comodidad (no sentirás molestias)
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-cyan-500 mt-0.5" />
                        <span className="text-slate-600">
                          Exploración completa en HD del tracto digestivo superior
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-cyan-500 mt-0.5" />
                        <span className="text-slate-600">
                          Toma de biopsias si es necesario
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-cyan-500 mt-0.5" />
                        <span className="text-slate-600">
                          Resultados el mismo día
                        </span>
                      </li>
                    </ul>
                  </div>
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
                        <h3 className="font-bold text-slate-800">Importante</h3>
                        <p className="text-slate-600 text-sm">
                          Es fundamental seguir las indicaciones de preparación
                          para que el estudio sea exitoso.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {preparation.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-3 bg-cyan-50 rounded-lg"
                      >
                        <CheckCircle className="w-4 h-4 text-cyan-500" />
                        <span className="text-slate-700 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* CTA Card */}
                <Card className="bg-gradient-to-br from-cyan-500 to-teal-600 text-white border-0">
                  <h3 className="text-xl font-bold mb-4">
                    Agenda tu procedimiento
                  </h3>
                  <p className="text-cyan-100 mb-6">
                    Requiere valoración previa. Horarios de lunes a sábado.
                  </p>
                  <Link href="/agendar?service=ENDOSCOPIA">
                    <Button
                      className="w-full bg-white text-cyan-600 hover:bg-cyan-50"
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
                    <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                      AA
                    </div>
                    <h3 className="font-bold text-slate-800">
                      Dr. Agustín Acevedo
                    </h3>
                    <p className="text-cyan-600 text-sm mb-4">
                      Gastroenterólogo - Endoscopista
                    </p>
                    <div className="text-sm text-slate-500 space-y-1">
                      <p>+5,000 procedimientos realizados</p>
                      <p>Equipo de alta definición</p>
                    </div>
                  </div>
                </Card>

                {/* Safety */}
                <Card>
                  <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-cyan-500" />
                    Seguridad del procedimiento
                  </h3>
                  <p className="text-sm text-slate-600 mb-4">
                    La endoscopia es un procedimiento muy seguro cuando es
                    realizado por especialistas certificados. En Endopolis:
                  </p>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5" />
                      <span>Equipo de última generación</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5" />
                      <span>Protocolos de esterilización estrictos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5" />
                      <span>Monitoreo continuo durante el procedimiento</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5" />
                      <span>Área de recuperación supervisada</span>
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

