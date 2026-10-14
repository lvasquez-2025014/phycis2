# Física Fundamental | Plataforma de Tareas y Generación Aleatoria

Plataforma educativa para el diseño, generación y asignación aleatoria de tareas y hojas de trabajo de Física Fundamental (MRU, MRUA, Leyes de Newton). Desarrollada con arquitectura de monorepo moderno con **React + Vite + TypeScript** en frontend y un **monolito modular en capas con Express + Node.js + Prisma + Zod** en backend.

---

## 1. Requisitos Previos

- **Node.js**: v18.0.0 o superior (verificado en v22.22.3).
- **pnpm**: v9.0.0 o superior (verificado en v12.0.1).
- **PostgreSQL**: v14.0 o superior (opcional para ejecución del prototipo en memoria, requerido para persistencia en base de datos).
- **Git**.

---

## 2. Estructura del Monorepo

El proyecto está organizado como un monorepo administrado mediante **npm workspaces**:

```text
phycis2/
├── packages/
│   └── shared/                 # Tipos, contratos, interfaces y DTOs comunes
│       ├── src/
│       │   └── index.ts        # UserRole, Difficulty, TopicDTO, AssignmentDTO, ApiResponse
│       └── package.json
├── backend/                    # Monolito modular en capas con Node.js & Express
│   ├── prisma/
│   │   └── schema.prisma       # Modelos relacionales PostgreSQL
│   ├── src/
│   │   ├── config/             # Configuración y validación Zod de variables (.env)
│   │   ├── middlewares/        # ErrorHandler centralizado, Auth Guards, Validador Zod
│   │   ├── modules/
│   │   │   ├── auth/           # Rutas, controlador, servicio y esquemas de sesión
│   │   │   ├── users/          # Repositorio, servicio y controlador de usuarios
│   │   │   ├── exercises/      # Banco de plantillas de física y temas
│   │   │   ├── physics/        # Motor matemático DESACOPLADO (sin Prisma/Express/eval)
│   │   │   │   ├── solvers/    # Resolutores específicos (MRU, MRUA, Newton)
│   │   │   │   ├── registry.ts # PhysicsSolverRegistry seguro y tipado
│   │   │   │   └── types.ts
│   │   │   ├── assignments/    # Generador inmutable y gestor de tareas
│   │   │   └── pdf/            # Estructura preparada para exportación a PDF
│   │   ├── app.ts              # Configuración Express (JSON, CORS, Health check)
│   │   └── server.ts           # Entrada del servidor
│   ├── tests/                  # Pruebas unitarias con Vitest
│   ├── .env.example
│   └── package.json
├── frontend/                   # Aplicación Web React + Vite + TypeScript + CSS Puro
│   ├── src/
│   │   ├── components/         # Navbar contextual, DemoBanner informativo, UI
│   │   ├── hooks/              # useAuth y contexto de sesión demo
│   │   ├── pages/
│   │   │   ├── login/          # Inicio de sesión con accesos directos demo
│   │   │   ├── teacher/        # Panel docente y generador de tareas
│   │   │   ├── student/        # Panel de tareas del alumno
│   │   │   └── assignments/    # Visor detallado de tareas y soluciones
│   │   ├── services/           # Cliente HTTP centralizado (Fetch API) y servicios
│   │   ├── styles/             # Variables CSS y estilos globales responsivos
│   │   ├── App.tsx             # Enrutador React Router
│   │   └── main.tsx
│   ├── .env.example
│   └── package.json
├── legacy/                     # Resguardo íntegro del proyecto Angular anterior y activos
├── .env.example                # Variables de entorno de ejemplo para el monorepo
├── .gitignore
├── eslint.config.js            # Configuración ESLint 9
├── .prettierrc                 # Configuración de formateo de código
└── README.md
```

---

## 3. Instalación de Dependencias

Ejecuta el siguiente comando en la raíz del proyecto para instalar todas las dependencias del monorepo mediante **pnpm**:

```bash
pnpm install
```

Para compilar el paquete compartido `@fisica-tareas/shared`:

```bash
pnpm run build:shared
```

---

## 4. Configuración de Variables de Entorno

El proyecto incluye archivos `.env.example` tanto en la raíz como en cada paquete:

### Backend (`backend/.env`):

```env
PORT=4000
NODE_ENV=development
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/fisica_tareas?schema=public"
CORS_ORIGIN="http://localhost:5173"
JWT_SECRET="clave_secreta_de_desarrollo"
```

### Frontend (`frontend/.env`):

```env
VITE_API_URL="http://localhost:4000/api"
```

---

## 5. Configuración de Base de Datos PostgreSQL y Prisma

1. Crea la base de datos en tu servidor PostgreSQL:
   ```sql
   CREATE DATABASE fisica_tareas;
   ```

2. Genera los clientes de Prisma:
   ```bash
   pnpm prisma:generate
   ```

3. Aplica las migraciones para crear las tablas (`User`, `Topic`, `Exercise`, `Assignment`, `AssignmentRecipient`, `AssignmentExercise`):
   ```bash
   pnpm prisma:migrate
   ```

> **Nota:** La aplicación cuenta con repositorios desacoplados con resguardo en memoria. Si PostgreSQL aún no está configurado o iniciado, el backend y el frontend funcionarán en modo demostración con datos simulados y no fallarán.

---

## 6. Ejecución del Proyecto

### Modo Desarrollo

Para ejecutar ambos entornos de forma independiente o en paralelo:

**Backend (API Express):**
```bash
pnpm dev:backend
```
El servidor arrancará en: [http://localhost:4000](http://localhost:4000)

**Frontend (React + Vite):**
```bash
pnpm dev:frontend
```
La interfaz de usuario estará disponible en: [http://localhost:5173](http://localhost:5173)

---

## 7. Comprobación del Servidor y la API

Puedes verificar que la API REST está funcionando correctamente consumiendo el endpoint de salud:

```bash
curl http://localhost:4000/api/health
```

Respuesta esperada:
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "uptime": 12.34,
    "environment": "development",
    "service": "fisica-tareas-backend"
  },
  "meta": {
    "timestamp": "2026-10-13T..."
  }
}
```

---

## 8. Calidad y Pruebas Unitarias

Para ejecutar la suite de pruebas unitarias con **Vitest**:

```bash
pnpm test
```

Para verificar reglas de estilo y tipos con **ESLint**:

```bash
pnpm lint
```

Para formatear el código fuente con **Prettier**:

```bash
pnpm format
```

---

## 9. Estado de Funcionalidades (Implementado vs Prototipo)

| Módulo / Funcionalidad          |    Estado Actual    | Descripción                                                                                            |
| :------------------------------ | :-----------------: | :----------------------------------------------------------------------------------------------------- |
| **Monorepo & Workspaces**       | ✅ **Implementado** | Estructura modular funcional con dependencias enlazadas.                                               |
| **Esquema Prisma Relacional**   | ✅ **Implementado** | Modelos PostgreSQL listos con inmutabilidad de ejercicios generados.                                   |
| **Motor de Física Desacoplado** | ✅ **Implementado** | `PhysicsSolverRegistry` tipado y seguro, sin Express ni Prisma, con resolutores de MRU, MRUA y Newton. |
| **Seguridad & Aislamiento**     | ✅ **Implementado** | Validación Zod, ocultamiento de respuestas para estudiantes y aislamiento de datos de otros alumnos.   |
| **Cliente HTTP Centralizado**   | ✅ **Implementado** | Fetch API centralizado en frontend con variables de entorno.                                           |
| **Panel Docente & Formulario**  | ✅ **Implementado** | Interfaz React con CSS puro, generador de tareas e historial.                                          |
| **Panel de Estudiante**         | ✅ **Implementado** | Visualización de tareas asignadas con enunciados y casillas de respuesta.                              |
| **Autenticación en Producción** |  🟡 **Prototipo**   | Sesión basada en cabeceras y selector rápido para pruebas de roles; preparado para JWT y bcrypt.       |
| **Persistencia PostgreSQL**     |  🟡 **Prototipo**   | Modelos y repositorio listos con fallback automático en memoria mientras se levanta la BD.             |
| **Exportador PDF Nativo**       |  🟡 **Prototipo**   | Endpoint base `/api/pdf/export` listo para integración con librerías de generación como jsPDF/pdfmake. |
