"use client";

import { Award, GraduationCap, Star } from "lucide-react";
import Card from "../ui/Card";
import Image from "next/image";

const team = [
  {
    name: "Dr. Agustín Acevedo",
    title: "Gastroenterólogo",
    image: "/doctor.jpeg",
    description:
      "Especialista con más de 15 años de experiencia en gastroenterología y endoscopia digestiva.",
    credentials: [
      "Universidad de Guadalajara",
      "Fellow en Endoscopia",
      "Certificado CMGE",
    ],
  },
  {
    name: "Lic. María Cecilia López",
    title: "Nutrióloga",
    image: "/nutriologa.jpeg",
    description:
      "Experta en nutrición clínica y manejo nutricional de enfermedades gastrointestinales.",
    credentials: [
      "ITESO Guadalajara",
      "Esp. Nutrición Clínica",
      "Certificada CONMEXICO",
    ],
  },
];

export default function TeamSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            Nuestro Equipo
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Profesionales{" "}
            <span className="text-emerald-600">comprometidos</span> con tu salud
          </h2>
          <p className="text-lg text-slate-600">
            Contamos con especialistas altamente calificados y en constante
            actualización para brindarte la mejor atención.
          </p>
        </div>

        {/* Team grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {team.map((member) => (
            <Card key={member.name} className="overflow-hidden" padding="none">
              <div className="aspect-[4/3] relative bg-gradient-to-br from-emerald-100 to-teal-100">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />
              </div>

              <div className="p-6 -mt-8 relative">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">
                      {member.name}
                    </h3>
                    <p className="text-emerald-600 font-medium">
                      {member.title}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium">5.0</span>
                  </div>
                </div>

                <p className="text-slate-500 mb-4">{member.description}</p>

                <div className="space-y-2">
                  {member.credentials.map((credential, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm text-slate-600"
                    >
                      {index === 0 ? (
                        <GraduationCap className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Award className="w-4 h-4 text-emerald-500" />
                      )}
                      <span>{credential}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="mt-16 pt-16 border-t border-slate-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Award className="w-8 h-8 text-emerald-600" />
              </div>
              <p className="font-semibold text-slate-800">Certificados</p>
              <p className="text-sm text-slate-500">Por consejos médicos</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <GraduationCap className="w-8 h-8 text-emerald-600" />
              </div>
              <p className="font-semibold text-slate-800">Especializados</p>
              <p className="text-sm text-slate-500">En su área</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Star className="w-8 h-8 text-emerald-600" />
              </div>
              <p className="font-semibold text-slate-800">5 estrellas</p>
              <p className="text-sm text-slate-500">En reseñas</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-8 h-8 text-emerald-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <p className="font-semibold text-slate-800">Actualizados</p>
              <p className="text-sm text-slate-500">Capacitación continua</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
