# 🏥 Endopolis - Sistema de Gestión de Citas Médicas

Sistema web para la gestión de citas médicas de la Clínica de Gastroenterología y Nutrición Endopolis.

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

## 🚀 Instalación

### Prerrequisitos
- Node.js 18+
- PostgreSQL (local o en la nube)

### Pasos

1. **Clonar e instalar dependencias**
```bash
cd endopolis
npm install
```

2. **Configurar variables de entorno**
```bash
cp .env.example .env
# Editar .env con tu DATABASE_URL
```

3. **Configurar base de datos**
```bash
# Crear tablas
npm run db:push

# Poblar datos iniciales
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
│   │   ├── (public)/      # Páginas públicas
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
│   │   ├── auth.ts        # Autenticación
│   │   └── appointments.ts # Lógica de citas
│   └── types/             # TypeScript types
└── public/                # Archivos estáticos
```

## 🌐 Despliegue en Railway

1. Crear cuenta en [Railway](https://railway.app)
2. Crear nuevo proyecto
3. Agregar PostgreSQL como servicio
4. Conectar repositorio de GitHub
5. Configurar variables de entorno:
   - `DATABASE_URL` (se genera automáticamente)
6. Desplegar

Railway ejecutará automáticamente:
- `npm install`
- `prisma generate`
- `npm run build`
- `npm run start`

## 📱 Capturas

### Landing Page
- Hero con video de YouTube
- Sección de servicios
- Equipo médico
- Mapa de Google Maps
- Botón de WhatsApp flotante

### Portal del Paciente
- Dashboard con próxima cita
- Historial de citas
- Edición de perfil

### Panel Administrativo
- Dashboard con estadísticas
- Gestión de citas
- Calendario visual
- Lista de pacientes
- Configuración

## 🔑 Servicios Disponibles

| Servicio | Duración | Horario L-V | Horario Sáb |
|----------|----------|-------------|-------------|
| Consulta Gastroenterología | 30 min | 08:00-12:30 | 09:00-14:00 |
| Consulta Nutrición | 30 min | 08:00-12:30 | 09:00-14:00 |
| Endoscopia | 60 min | 10:00-12:00 | 10:00-14:00 |
| Colonoscopia | 60 min | 10:00-12:00 | 10:00-14:00 |

## 📄 Licencia

Este proyecto fue desarrollado como producto integrador para el curso IH719 - Conceptualización de Servicios en la Nube.

---

Desarrollado por Hiram Acevedo usando Next.js y Tailwind CSS
