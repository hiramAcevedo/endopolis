"use client";

import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import Button from "../ui/Button";

export default function ContactSection() {
  return (
    <section id="contacto" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            Ubicación y Contacto
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Estamos aquí para{" "}
            <span className="text-emerald-600">atenderte</span>
          </h2>
          <p className="text-lg text-slate-600">
            Visítanos en nuestra clínica o contáctanos por cualquiera de
            nuestros canales de comunicación.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Map */}
          <div className="relative rounded-2xl overflow-hidden shadow-xl h-[400px] lg:h-auto">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3732.6789!2d-103.3689!3d20.6742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDQwJzI3LjEiTiAxMDPCsDIyJzA4LjAiVw!5e0!3m2!1sen!2smx!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "400px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de Endopolis"
            />

            {/* Overlay card */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg md:right-auto md:max-w-xs">
              <h3 className="font-bold text-slate-800 mb-2">
                Endopolis Clínica
              </h3>
              <p className="text-sm text-slate-600">
                Av. Vallarta 1234, Col. Americana
                <br />
                Guadalajara, Jalisco
              </p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-emerald-600 font-medium mt-2 hover:text-emerald-700"
              >
                Cómo llegar
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Contact info */}
          <div className="space-y-8">
            {/* Contact cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              <a
                href="tel:+523312345678"
                className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl hover:bg-emerald-50 transition-colors group"
              >
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                  <Phone className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Teléfono</p>
                  <p className="font-semibold text-slate-800">33 1234 5678</p>
                </div>
              </a>

              <a
                href="mailto:contacto@endopolis.com"
                className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl hover:bg-emerald-50 transition-colors group"
              >
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                  <Mail className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Email</p>
                  <p className="font-semibold text-slate-800">
                    contacto@endopolis.com
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Dirección</p>
                  <p className="font-semibold text-slate-800">
                    Av. Vallarta 1234
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Horario</p>
                  <p className="font-semibold text-slate-800">Lun-Sab</p>
                </div>
              </div>
            </div>

            {/* Schedule */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-emerald-600" />
                Horarios de Atención
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Lunes a Viernes</span>
                  <span className="font-medium text-slate-800">
                    8:00 - 12:30
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Sábado</span>
                  <span className="font-medium text-slate-800">
                    9:00 - 14:00
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Domingo</span>
                  <span className="font-medium text-red-500">Cerrado</span>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/523312345678?text=Hola,%20me%20gustaría%20agendar%20una%20cita"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg shadow-green-500/30"
                size="lg"
                leftIcon={<MessageCircle className="w-5 h-5" />}
              >
                Escríbenos por WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

