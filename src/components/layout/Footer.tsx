import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Instagram,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Main footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <div>
                <span className="font-bold text-xl text-white">Endopolis</span>
                <p className="text-xs text-slate-400">
                  Gastroenterología y Nutrición
                </p>
              </div>
            </div>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Clínica especializada en el cuidado de tu sistema digestivo.
              Ofrecemos atención de calidad con tecnología de vanguardia.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-emerald-600 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-emerald-600 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/523312345678"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-emerald-600 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Servicios</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/consultas/gastroenterologia"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Consulta Gastroenterología
                </Link>
              </li>
              <li>
                <Link
                  href="/consultas/nutricion"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Consulta Nutrición
                </Link>
              </li>
              <li>
                <Link
                  href="/procedimientos/endoscopia"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Endoscopia
                </Link>
              </li>
              <li>
                <Link
                  href="/procedimientos/colonoscopia"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Colonoscopia
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Enlaces</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/nosotros"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Quiénes Somos
                </Link>
              </li>
              <li>
                <Link
                  href="/agendar"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Agendar Cita
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Iniciar Sesión
                </Link>
              </li>
              <li>
                <Link
                  href="/registro"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Registrarse
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>
                  Av. Vallarta 1234, Col. Americana
                  <br />
                  Guadalajara, Jalisco
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <a
                  href="tel:+523312345678"
                  className="hover:text-emerald-400 transition-colors"
                >
                  33 1234 5678
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <a
                  href="mailto:contacto@endopolis.com"
                  className="hover:text-emerald-400 transition-colors"
                >
                  contacto@endopolis.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p>Lun - Vie: 8:00 - 12:30</p>
                  <p>Sábado: 9:00 - 14:00</p>
                  <p>Domingo: Cerrado</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              © {currentYear} Endopolis. Todos los derechos reservados.
            </p>
            <div className="flex gap-6 text-sm">
              <Link
                href="/privacidad"
                className="text-slate-500 hover:text-emerald-400 transition-colors"
              >
                Aviso de Privacidad
              </Link>
              <Link
                href="/terminos"
                className="text-slate-500 hover:text-emerald-400 transition-colors"
              >
                Términos y Condiciones
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

