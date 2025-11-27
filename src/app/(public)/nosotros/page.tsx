import { Header, Footer, WhatsAppButton } from "@/components/layout";
import { TeamSection } from "@/components/landing";
import { getSession } from "@/lib/auth";
import {
  Target,
  Eye,
  Heart,
  Shield,
  Clock,
  Users,
  Award,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Image from "next/image";

export const metadata = {
  title: "Quiénes Somos - Endopolis",
  description:
    "Conoce a nuestro equipo de especialistas en Gastroenterología y Nutrición.",
};

export default async function NosotrosPage() {
  const session = await getSession();

  return (
    <>
      <Header user={session} />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative py-24 bg-gradient-to-br from-emerald-600 to-teal-700 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                Quiénes Somos
              </h1>
              <p className="text-xl text-emerald-100">
                Más de 15 años cuidando la salud digestiva de Guadalajara y sus
                alrededores con profesionalismo, calidez y tecnología de
                vanguardia.
              </p>
            </div>
          </div>
        </section>

        {/* Historia */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                  Nuestra Historia
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
                  Una clínica fundada con{" "}
                  <span className="text-emerald-600">pasión</span> por la salud
                </h2>
                <p className="text-lg text-slate-600 mb-6">
                  Endopolis nació en 2009 con la visión de ofrecer atención
                  gastroenterológica de alta calidad en un ambiente cálido y
                  profesional. Desde entonces, hemos atendido a más de 10,000
                  pacientes y realizado miles de procedimientos endoscópicos.
                </p>
                <p className="text-lg text-slate-600 mb-8">
                  Nuestro compromiso con la excelencia médica nos ha llevado a
                  invertir constantemente en tecnología de punta y en la
                  capacitación continua de nuestro equipo, siempre con el
                  paciente como centro de todo lo que hacemos.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-4 bg-slate-50 rounded-xl">
                    <div className="text-3xl font-bold text-emerald-600">
                      2009
                    </div>
                    <p className="text-slate-500 text-sm">Año de fundación</p>
                  </div>
                  <div className="text-center p-4 bg-slate-50 rounded-xl">
                    <div className="text-3xl font-bold text-emerald-600">
                      10K+
                    </div>
                    <p className="text-slate-500 text-sm">Pacientes atendidos</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/endos3.jpeg"
                    alt="Procedimiento endoscópico en Endopolis"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                      <Award className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">Certificados</p>
                      <p className="text-sm text-slate-500">
                        Por el Consejo de Gastro
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Misión, Visión, Valores */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Misión */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">
                  Misión
                </h3>
                <p className="text-slate-600">
                  Brindar atención médica integral y de calidad en
                  gastroenterología y nutrición, utilizando tecnología de
                  vanguardia y un enfoque humanizado para mejorar la calidad de
                  vida de nuestros pacientes.
                </p>
              </div>

              {/* Visión */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="w-14 h-14 bg-teal-100 rounded-xl flex items-center justify-center mb-6">
                  <Eye className="w-7 h-7 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Visión</h3>
                <p className="text-slate-600">
                  Ser la clínica de referencia en gastroenterología del
                  occidente del país, reconocida por nuestra excelencia médica,
                  innovación tecnológica y atención centrada en el paciente.
                </p>
              </div>

              {/* Valores */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="w-14 h-14 bg-cyan-100 rounded-xl flex items-center justify-center mb-6">
                  <Heart className="w-7 h-7 text-cyan-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">
                  Valores
                </h3>
                <ul className="text-slate-600 space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    Ética profesional
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    Calidez humana
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    Excelencia médica
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    Innovación constante
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Por qué elegirnos */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                ¿Por qué elegirnos?
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                Lo que nos hace{" "}
                <span className="text-emerald-600">diferentes</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="font-bold text-slate-800 mb-2">
                  Seguridad Total
                </h3>
                <p className="text-slate-500 text-sm">
                  Protocolos de seguridad e higiene de primer nivel
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="font-bold text-slate-800 mb-2">
                  Atención Puntual
                </h3>
                <p className="text-slate-500 text-sm">
                  Respetamos tu tiempo con citas puntuales
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="font-bold text-slate-800 mb-2">Trato Humano</h3>
                <p className="text-slate-500 text-sm">
                  Atención personalizada y empática
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="font-bold text-slate-800 mb-2">
                  Tecnología Avanzada
                </h3>
                <p className="text-slate-500 text-sm">
                  Equipos de última generación
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <TeamSection />

        {/* CTA con imagen */}
        <section className="py-20 bg-slate-900 relative overflow-hidden">
          {/* Imagen de fondo */}
          <div className="absolute inset-0">
            <Image
              src="/peso_alimentacion_suplementacion.jpeg"
              alt="Salud integral: peso, alimentación y suplementación"
              fill
              className="object-cover opacity-30"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 via-teal-900/80 to-emerald-900/90" />
          </div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              ¿Listo para cuidar tu salud digestiva?
            </h2>
            <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
              Agenda tu cita hoy y recibe atención de calidad con nuestros
              especialistas.
            </p>
            <Link href="/agendar">
              <Button
                size="lg"
                className="bg-white text-emerald-600 hover:bg-emerald-50"
              >
                Agendar Cita Ahora
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
