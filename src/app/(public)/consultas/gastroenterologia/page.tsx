import { Header, Footer, WhatsAppButton } from "@/components/layout";
import { getSession } from "@/lib/auth";
import {
  Stethoscope,
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Image from "next/image";

export const metadata = {
  title: "Consulta de Gastroenterología - Endopolis",
  description:
    "Evaluación y diagnóstico de enfermedades del sistema digestivo con el Dr. Agustín Acevedo.",
};

export default async function GastroenterologiaPage() {
  const session = await getSession();

  const symptoms = [
    "Dolor abdominal frecuente",
    "Acidez o reflujo gastroesofágico",
    "Náuseas o vómitos recurrentes",
    "Dificultad para tragar",
    "Cambios en el patrón intestinal",
    "Sangrado digestivo",
    "Pérdida de peso inexplicable",
    "Distensión abdominal",
  ];

  const conditions = [
    "Gastritis y úlceras",
    "Enfermedad por reflujo (ERGE)",
    "Síndrome de intestino irritable",
    "Enfermedad inflamatoria intestinal",
    "Hepatitis y enfermedades hepáticas",
    "Pancreatitis",
    "Cálculos biliares",
    "Cáncer digestivo",
  ];

  return (
    <>
      <Header user={session} />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative py-20 bg-gradient-to-br from-emerald-600 to-teal-700 overflow-hidden">
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
                  <Stethoscope className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-emerald-200 text-sm font-medium">
                    Consulta Médica
                  </p>
                  <h1 className="text-3xl sm:text-4xl font-bold text-white">
                    Gastroenterología
                  </h1>
                </div>
              </div>
              <p className="text-xl text-emerald-100 mb-8">
                Evaluación integral de tu sistema digestivo con tecnología de
                punta y atención personalizada.
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
                    Dr. Agustín Acevedo
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
                    La consulta de gastroenterología es una evaluación completa
                    de tu sistema digestivo. Durante la cita, el Dr. Acevedo
                    realizará:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5" />
                      <span className="text-slate-600">
                        Revisión detallada de tu historial médico y síntomas
                        actuales
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5" />
                      <span className="text-slate-600">
                        Exploración física del abdomen
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5" />
                      <span className="text-slate-600">
                        Interpretación de estudios previos (si los tienes)
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5" />
                      <span className="text-slate-600">
                        Diagnóstico y plan de tratamiento personalizado
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5" />
                      <span className="text-slate-600">
                        Solicitud de estudios adicionales si es necesario
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Image section */}
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src="/doctor_consulta.jpeg"
                    alt="Dr. Agustín Acevedo en consulta"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                  />
                </div>

                {/* Symptoms */}
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-4">
                    ¿Cuándo debes consultar?
                  </h2>
                  <p className="text-slate-600 mb-4">
                    Te recomendamos agendar una cita si presentas alguno de los
                    siguientes síntomas:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {symptoms.map((symptom) => (
                      <div
                        key={symptom}
                        className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg"
                      >
                        <AlertCircle className="w-4 h-4 text-amber-500" />
                        <span className="text-slate-700 text-sm">{symptom}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Conditions */}
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-4">
                    Padecimientos que tratamos
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {conditions.map((condition) => (
                      <div
                        key={condition}
                        className="flex items-center gap-2 p-3 bg-emerald-50 rounded-lg"
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
                <Card className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-0">
                  <h3 className="text-xl font-bold mb-4">
                    Agenda tu consulta hoy
                  </h3>
                  <p className="text-emerald-100 mb-6">
                    Horarios disponibles de lunes a sábado. Citas con
                    confirmación en menos de 24 horas.
                  </p>
                  <Link href="/agendar?service=CONSULTA_GASTRO">
                    <Button
                      className="w-full bg-white text-emerald-600 hover:bg-emerald-50"
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
                    <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden relative">
                      <Image
                        src="/doctor.jpeg"
                        alt="Dr. Agustín Acevedo"
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </div>
                    <h3 className="font-bold text-slate-800">
                      Dr. Agustín Acevedo
                    </h3>
                    <p className="text-emerald-600 text-sm mb-4">
                      Gastroenterólogo
                    </p>
                    <div className="text-sm text-slate-500 space-y-1">
                      <p>Cédula Profesional: 12345678</p>
                      <p>Certificado por CMGE</p>
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
                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5" />
                      <span>Trae estudios de laboratorio recientes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5" />
                      <span>Lista de medicamentos que tomas actualmente</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5" />
                      <span>
                        Anota tus síntomas y cuándo comenzaron
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5" />
                      <span>Llega 10 minutos antes de tu cita</span>
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
