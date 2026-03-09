# 🏥 Endopolis - Sistema de Gestión de Citas Médicas

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?logo=prisma)](https://www.prisma.io/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://vercel.com/)
[![Supabase](https://img.shields.io/badge/Database-Supabase-3ECF8E?logo=supabase)](https://supabase.com/)

Sistema web para la gestión de citas médicas de la Clínica de Gastroenterología y Nutrición Endopolis.

## 🌐 Demo en Vivo

🔗 **[endopolis.vercel.app](https://endopolis.vercel.app)**

<p align="center">
  <img src="public/endopolis_landpage.jpeg" alt="Endopolis Landing Page" width="600">
</p>

## 📋 Características

### Fase 1 (MVP - Actual)
- ✅ Landing page con video embebido (YouTube) y mapa (Google Maps)
- ✅ Registro e inicio de sesión de usuarios
- ✅ Creación de citas con selector de fecha/hora
- ✅ Portal del paciente (ver citas, editar perfil)
- ✅ Panel de administrador completo
- ✅ Botón flotante de WhatsApp
- ✅ Diseño responsivo

### Características del Admin
- Dashboard con estadísticas del día
- Gestión de citas (confirmar, rechazar, completar)
- Lista de pacientes con historial
- Calendario visual de citas
- Bloqueo de horarios
- Configuración del sistema

## 🛠️ Stack Tecnológico

| Tecnología | Función |
|------------|---------|
| Next.js 16 | Framework fullstack (App Router) |
| TypeScript | Tipado estático |
| Prisma ORM | Base de datos |
| PostgreSQL | Persistencia |
| Tailwind CSS | Estilos responsivos |
| Lucide React | Iconografía |
| Jose (JWT) | Autenticación |

## ☁️ Arquitectura de Despliegue

```
┌─────────────────────────────────────────────────────────────┐
│                         USUARIOS                            │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                    VERCEL (Frontend)                        │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Next.js 16 (App Router + API Routes)               │   │
│  │  - SSR/SSG para páginas públicas                    │   │
│  │  - API Routes para autenticación y CRUD             │   │
│  │  - Server Components con renderizado dinámico       │   │
│  └─────────────────────────┬───────────────────────────┘   │
└─────────────────────────────┼───────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                 SUPABASE (Base de Datos)                    │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  PostgreSQL                                          │   │
│  │  - Tablas: User, Patient, Appointment, Service...   │   │
│  │  - Conexión segura via Prisma ORM                   │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## 🚀 Instalación Local

### Prerrequisitos
- Node.js 18+
- PostgreSQL (local o en la nube)

### Pasos

1. **Clonar e instalar dependencias**
```bash
git clone https://github.com/hiramAcevedo/endopolis.git
cd endopolis
npm install
```

2. **Configurar variables de entorno**
```bash
cp .env.example .env
```

Editar `.env`:
```env
# Base de datos PostgreSQL
DATABASE_URL="postgresql://usuario:password@localhost:5432/endopolis?schema=public"

# JWT Secret (generar uno aleatorio para producción)
JWT_SECRET="tu-clave-secreta-aqui"
```

3. **Configurar base de datos**
```bash
# Crear tablas
npm run db:push

# Poblar datos iniciales (admin, servicios, configuración)
npm run db:seed
```

4. **Iniciar desarrollo**
```bash
npm run dev
```

5. **Abrir en navegador**
```
http://localhost:3000
```

## 👤 Credenciales de Prueba

**Administrador:**
- Email: `admin@endopolis.com`
- Password: `admin123`

## 📁 Estructura del Proyecto

```
endopolis/
├── prisma/
│   ├── schema.prisma      # Modelo de datos
│   └── seed.ts            # Datos iniciales
├── src/
│   ├── app/
│   │   ├── (auth)/        # Login, registro
│   │   ├── (public)/      # Páginas públicas (nosotros, servicios)
│   │   ├── admin/         # Panel admin
│   │   ├── agendar/       # Formulario de citas
│   │   ├── api/           # API endpoints
│   │   └── mi-cuenta/     # Portal paciente
│   ├── components/
│   │   ├── layout/        # Header, Footer, Sidebar
│   │   ├── landing/       # Secciones de landing
│   │   └── ui/            # Componentes reutilizables
│   ├── lib/
│   │   ├── prisma.ts      # Cliente de BD
│   │   ├── auth.ts        # Autenticación JWT
│   │   └── appointments.ts # Lógica de citas
│   └── types/             # TypeScript types
└── public/                # Imágenes y archivos estáticos
```

## ☁️ Despliegue

### Vercel (Frontend + API)

1. Importar proyecto desde GitHub en [vercel.com](https://vercel.com)
2. Configurar variables de entorno:

| Variable | Descripción |
|----------|-------------|
| `DATABASE_URL` | URL de conexión PostgreSQL (Supabase) |
| `JWT_SECRET` | Clave secreta para tokens (`openssl rand -hex 32`) |

3. Deploy automático en cada push a `main`

### Supabase (Base de Datos)

1. Crear proyecto en [supabase.com](https://supabase.com)
2. Ir a **Project Settings → Database** y copiar la Connection String (URI)
3. Configurar `DATABASE_URL` en tu `.env` y en Vercel
4. Ejecutar migraciones:
```bash
npx prisma db push
npm run db:seed
```

### Variables de Entorno en Producción

```env
# Supabase PostgreSQL
DATABASE_URL="postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres"

# Generar con: openssl rand -hex 32
JWT_SECRET="clave-secreta-aleatoria-de-64-caracteres"
```

## 📱 Funcionalidades

### Landing Page
- Hero con video de YouTube
- Sección de servicios médicos
- Equipo médico con fotos reales
- Mapa de Google Maps
- Botón de WhatsApp flotante

### Portal del Paciente
- Dashboard con próxima cita
- Historial de citas
- Edición de perfil

### Panel Administrativo
- Dashboard con estadísticas del día
- Gestión de citas (confirmar, rechazar, completar)
- Calendario visual de citas
- Lista de pacientes con historial
- Bloqueo de horarios
- Configuración del sistema

## 🔑 Servicios Disponibles

| Servicio | Duración | Horario L-V | Horario Sáb |
|----------|----------|-------------|-------------|
| Consulta Gastroenterología | 30 min | 08:00-12:30 | 09:00-14:00 |
| Consulta Nutrición | 30 min | 08:00-12:30 | 09:00-14:00 |
| Endoscopia | 60 min | 10:00-12:00 | 10:00-14:00 |
| Colonoscopia | 60 min | 10:00-12:00 | 10:00-14:00 |

## 🔧 Scripts Disponibles

```bash
npm run dev        # Servidor de desarrollo
npm run build      # Build de producción
npm run start      # Servidor de producción
npm run db:push    # Sincronizar schema con BD
npm run db:seed    # Poblar datos iniciales
npm run db:studio  # Abrir Prisma Studio (GUI)
```

## 📄 Licencia

Este proyecto fue desarrollado como **Producto Integrador** para el curso:
- **IH719** - Conceptualización de Servicios en la Nube
- Universidad de Guadalajara - CUCEI
- Noviembre 2024

---

**Hiram Acevedo** — 希拉木 · 2026
