"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Phone,
  Mail,
  ChevronDown,
  User,
  LogOut,
  Calendar,
  LayoutDashboard,
} from "lucide-react";
import Button from "../ui/Button";

interface HeaderProps {
  user?: {
    email: string;
    role: string;
    patientId?: number;
  } | null;
}

export default function Header({ user }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/";
  };

  return (
    <>
      {/* Top bar */}
      <div className="bg-slate-900 text-slate-300 text-sm py-2 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a
              href="tel:+523312345678"
              className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>33 1234 5678</span>
            </a>
            <a
              href="mailto:contacto@endopolis.com"
              className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>contacto@endopolis.com</span>
            </a>
          </div>
          <div className="text-slate-400">
            Lun - Vie: 8:00 - 12:30 | Sáb: 9:00 - 14:00
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg shadow-slate-200/50"
            : "bg-white"
        }`}
      >
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <div className="hidden sm:block">
                <span className="font-bold text-xl text-slate-800">
                  Endopolis
                </span>
                <p className="text-xs text-slate-500">
                  Gastroenterología y Nutrición
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              <Link
                href="/"
                className="px-4 py-2 text-slate-600 hover:text-emerald-600 font-medium transition-colors"
              >
                Inicio
              </Link>
              <Link
                href="/nosotros"
                className="px-4 py-2 text-slate-600 hover:text-emerald-600 font-medium transition-colors"
              >
                Nosotros
              </Link>

              {/* Servicios dropdown */}
              <div className="relative">
                <button
                  className="px-4 py-2 text-slate-600 hover:text-emerald-600 font-medium transition-colors flex items-center gap-1"
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  onBlur={() => setTimeout(() => setIsServicesOpen(false), 150)}
                >
                  Servicios
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${isServicesOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isServicesOpen && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl shadow-slate-200/50 border border-slate-100 py-2 animate-in fade-in slide-in-from-top-2">
                    <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wide">
                      Consultas
                    </div>
                    <Link
                      href="/consultas/gastroenterologia"
                      className="block px-4 py-2 text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                    >
                      Gastroenterología
                    </Link>
                    <Link
                      href="/consultas/nutricion"
                      className="block px-4 py-2 text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                    >
                      Nutrición
                    </Link>
                    <div className="border-t border-slate-100 my-2" />
                    <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wide">
                      Procedimientos
                    </div>
                    <Link
                      href="/procedimientos/endoscopia"
                      className="block px-4 py-2 text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                    >
                      Endoscopia
                    </Link>
                    <Link
                      href="/procedimientos/colonoscopia"
                      className="block px-4 py-2 text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                    >
                      Colonoscopia
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/#contacto"
                className="px-4 py-2 text-slate-600 hover:text-emerald-600 font-medium transition-colors"
              >
                Contacto
              </Link>
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    onBlur={() =>
                      setTimeout(() => setIsUserMenuOpen(false), 150)
                    }
                    className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-emerald-600 font-medium transition-colors"
                  >
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="max-w-[120px] truncate">{user.email}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${isUserMenuOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isUserMenuOpen && (
                    <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-xl shadow-slate-200/50 border border-slate-100 py-2 animate-in fade-in slide-in-from-top-2">
                      {user.role === "ADMIN" ? (
                        <Link
                          href="/admin"
                          className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4" />
                          Panel Admin
                        </Link>
                      ) : (
                        <>
                          <Link
                            href="/mi-cuenta"
                            className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                          >
                            <LayoutDashboard className="w-4 h-4" />
                            Mi Cuenta
                          </Link>
                          <Link
                            href="/mi-cuenta/citas"
                            className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                          >
                            <Calendar className="w-4 h-4" />
                            Mis Citas
                          </Link>
                        </>
                      )}
                      <div className="border-t border-slate-100 my-2" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors w-full"
                      >
                        <LogOut className="w-4 h-4" />
                        Cerrar Sesión
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Iniciar Sesión
                  </Button>
                </Link>
              )}
              <Link href="/agendar">
                <Button
                  size="sm"
                  rightIcon={<Calendar className="w-4 h-4" />}
                >
                  Agendar Cita
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 text-slate-600 hover:text-emerald-600 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </nav>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-slate-100 bg-white animate-in slide-in-from-top-2">
            <div className="container mx-auto px-4 py-4 space-y-2">
              <Link
                href="/"
                className="block px-4 py-3 text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link
                href="/nosotros"
                className="block px-4 py-3 text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Nosotros
              </Link>
              <div className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wide">
                Consultas
              </div>
              <Link
                href="/consultas/gastroenterologia"
                className="block px-4 py-3 pl-8 text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Gastroenterología
              </Link>
              <Link
                href="/consultas/nutricion"
                className="block px-4 py-3 pl-8 text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Nutrición
              </Link>
              <div className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wide">
                Procedimientos
              </div>
              <Link
                href="/procedimientos/endoscopia"
                className="block px-4 py-3 pl-8 text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Endoscopia
              </Link>
              <Link
                href="/procedimientos/colonoscopia"
                className="block px-4 py-3 pl-8 text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Colonoscopia
              </Link>
              <Link
                href="/#contacto"
                className="block px-4 py-3 text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contacto
              </Link>
              <div className="border-t border-slate-100 pt-4 mt-4 space-y-3">
                {user ? (
                  <>
                    <div className="px-4 py-2 text-sm text-slate-500">
                      {user.email}
                    </div>
                    {user.role === "ADMIN" ? (
                      <Link
                        href="/admin"
                        className="block px-4 py-3 text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Panel Admin
                      </Link>
                    ) : (
                      <Link
                        href="/mi-cuenta"
                        className="block px-4 py-3 text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Mi Cuenta
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      Cerrar Sesión
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="block px-4 py-3 text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Iniciar Sesión
                  </Link>
                )}
                <Link href="/agendar" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full" rightIcon={<Calendar className="w-4 h-4" />}>
                    Agendar Cita
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

