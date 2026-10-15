export const TOPICS = [
  "Cinemática",
  "Dinámica",
  "Leyes de Newton",
  "Trabajo y energía",
  "Cantidad de movimiento",
  "Electricidad",
  "Movimiento circular",
] as const

export const DIFFICULTIES = ["Básico", "Intermedio", "Avanzado"] as const

export type Difficulty = (typeof DIFFICULTIES)[number]
export type ExerciseStatus = "Aprobado" | "En revisión" | "Borrador"

export type ExerciseOptions = {
  A: string
  B: string
  C: string
  D: string
}

export type Exercise = {
  id: string
  name: string
  topic: string
  difficulty?: Difficulty
  status?: ExerciseStatus
  createdAt: string
  statement: string
  options?: ExerciseOptions
  correctOption?: "A" | "B" | "C" | "D"
  answer: string
  hasSteps: boolean
  diagramUrl?: string
  diagramCaption?: string
}

export const exercises: Exercise[] = [
  { id: "EJ-001", name: "Caída libre desde un edificio", topic: "Cinemática", difficulty: "Básico", status: "Aprobado", createdAt: "2026-09-02", statement: "Se deja caer una piedra desde 45 m de altura. ¿Cuánto tarda en llegar al suelo?", answer: "t ≈ 3.03 s", hasSteps: true },
  {
    id: "EJ-002",
    name: "Bloque en plano inclinado",
    topic: "Dinámica",
    difficulty: "Intermedio",
    status: "Aprobado",
    createdAt: "2026-09-04",
    statement: "Un bloque de 5 kg desliza por un plano de 30° sin fricción. Calcula su aceleración.",
    answer: "a = 4.9 m/s²",
    hasSteps: true,
    diagramUrl: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 160' width='320' height='160'><polygon points='30,135 290,135 290,25' fill='%23F4EDE4' stroke='%232D3250' stroke-width='2'/><rect x='150' y='55' width='44' height='30' rx='2' transform='rotate(-23 172 70)' fill='%232D3250'/><text x='172' y='74' fill='%23ffffff' font-size='10' font-family='sans-serif' font-weight='bold' text-anchor='middle'>m = 5kg</text><path d='M 75,135 A 40,40 0 0,0 68,120' stroke='%237077A1' stroke-width='2' fill='none'/><text x='82' y='128' fill='%232D3250' font-size='12' font-family='sans-serif' font-weight='600'>θ = 30°</text><line x1='172' y1='70' x2='172' y2='110' stroke='%23D9531E' stroke-width='2'/><text x='178' y='108' fill='%23D9531E' font-size='10' font-family='sans-serif'>W = mg</text></svg>",
    diagramCaption: "Diagrama de cuerpo libre en plano inclinado de 30°",
  },
  { id: "EJ-003", name: "Segunda ley con dos masas", topic: "Leyes de Newton", difficulty: "Intermedio", status: "En revisión", createdAt: "2026-09-08", statement: "Dos masas de 2 kg y 3 kg unidas por una cuerda son jaladas con 20 N. Halla la tensión.", answer: "T = 8 N", hasSteps: false },
  { id: "EJ-004", name: "Energía de un péndulo", topic: "Trabajo y energía", difficulty: "Básico", status: "Aprobado", createdAt: "2026-09-10", statement: "Un péndulo se suelta desde 0.8 m de altura. ¿Qué rapidez tiene en el punto más bajo?", answer: "v ≈ 3.96 m/s", hasSteps: true },
  { id: "EJ-005", name: "Choque inelástico de carros", topic: "Cantidad de movimiento", difficulty: "Avanzado", status: "Aprobado", createdAt: "2026-09-15", statement: "Un carro de 1200 kg a 15 m/s choca con otro de 800 kg en reposo y quedan unidos. Halla la velocidad final.", answer: "v = 9 m/s", hasSteps: true },
  { id: "EJ-006", name: "Resistencias en serie", topic: "Electricidad", difficulty: "Básico", status: "Borrador", createdAt: "2026-09-18", statement: "Tres resistencias de 4 Ω, 6 Ω y 10 Ω se conectan en serie a 12 V. Halla la corriente.", answer: "I = 0.6 A", hasSteps: false },
  { id: "EJ-007", name: "Fuerza centrípeta en curva", topic: "Movimiento circular", difficulty: "Intermedio", status: "Aprobado", createdAt: "2026-09-21", statement: "Un auto de 1000 kg toma una curva de 50 m de radio a 20 m/s. ¿Qué fuerza centrípeta actúa?", answer: "F = 8000 N", hasSteps: true },
  { id: "EJ-008", name: "Tiro parabólico", topic: "Cinemática", difficulty: "Avanzado", status: "Aprobado", createdAt: "2026-09-25", statement: "Se lanza un proyectil a 30 m/s con 45°. Calcula su alcance horizontal.", answer: "R ≈ 91.8 m", hasSteps: true },
  { id: "EJ-009", name: "Trabajo de una fuerza variable", topic: "Trabajo y energía", difficulty: "Avanzado", status: "En revisión", createdAt: "2026-09-29", statement: "Un resorte de k = 200 N/m se estira 0.15 m. ¿Qué trabajo se realizó?", answer: "W = 2.25 J", hasSteps: false },
  { id: "EJ-010", name: "Ley de Ohm básica", topic: "Electricidad", difficulty: "Básico", status: "Aprobado", createdAt: "2026-10-02", statement: "Por una resistencia de 220 Ω circula 0.05 A. ¿Cuál es el voltaje?", answer: "V = 11 V", hasSteps: true },
  { id: "EJ-011", name: "Impulso sobre una pelota", topic: "Cantidad de movimiento", difficulty: "Intermedio", status: "Aprobado", createdAt: "2026-10-06", statement: "Una pelota de 0.4 kg cambia su velocidad de 10 a −8 m/s. Halla el impulso.", answer: "J = −7.2 N·s", hasSteps: true },
  { id: "EJ-012", name: "Fricción estática", topic: "Leyes de Newton", difficulty: "Básico", status: "Aprobado", createdAt: "2026-10-09", statement: "Un mueble de 40 kg con μs = 0.5. ¿Qué fuerza mínima lo pone en movimiento?", answer: "F = 196 N", hasSteps: true },
]

export const JORNADAS = ["Matutina", "Vespertina"] as const
export type Jornada = (typeof JORNADAS)[number]

export const CODIGOS_ACADEMICOS = ["IN6AM", "IN6AV", "PE4BM", "BA6AM", "ME5BV"] as const
export type CodigoAcademico = (typeof CODIGOS_ACADEMICOS)[number]

export const SECCIONES = ["A", "B", "C"] as const
export type Seccion = (typeof SECCIONES)[number]

export type StudentStatus = "Activo" | "Inactivo"

export type Student = {
  id: string
  carnet: string
  name: string
  email: string
  jornada: Jornada
  codigoAcademico: string
  seccion: Seccion
  joinedAt: string
  activeAssignments: number
  status: StudentStatus
}

export const students: Student[] = [
  { id: "ST-01", carnet: "2021001", name: "Valeria Gómez", email: "valeria.gomez@kinal.edu.gt", jornada: "Matutina", codigoAcademico: "IN6AM", seccion: "A", joinedAt: "2026-08-12", activeAssignments: 2, status: "Activo" },
  { id: "ST-02", carnet: "2021012", name: "Diego Ramírez", email: "diego.ramirez@kinal.edu.gt", jornada: "Matutina", codigoAcademico: "IN6AM", seccion: "A", joinedAt: "2026-08-12", activeAssignments: 1, status: "Activo" },
  { id: "ST-03", carnet: "2021050", name: "Camila Torres", email: "camila.torres@kinal.edu.gt", jornada: "Matutina", codigoAcademico: "IN6AM", seccion: "A", joinedAt: "2026-08-14", activeAssignments: 3, status: "Activo" },
  { id: "ST-04", carnet: "2022099", name: "Andrés Herrera", email: "andres.herrera@kinal.edu.gt", jornada: "Vespertina", codigoAcademico: "IN6AV", seccion: "B", joinedAt: "2026-08-20", activeAssignments: 0, status: "Inactivo" },
  { id: "ST-05", carnet: "2022145", name: "Sofía Morales", email: "sofia.morales@kinal.edu.gt", jornada: "Matutina", codigoAcademico: "BA6AM", seccion: "A", joinedAt: "2026-09-01", activeAssignments: 2, status: "Activo" },
  { id: "ST-06", carnet: "2021088", name: "Mateo Castillo", email: "mateo.castillo@kinal.edu.gt", jornada: "Vespertina", codigoAcademico: "PE4BM", seccion: "B", joinedAt: "2026-09-03", activeAssignments: 1, status: "Activo" },
]

export const ANSWER_FORMATS = [
  { id: "none", label: "Sin respuestas" },
  { id: "inline", label: "Respuestas debajo de cada ejercicio" },
  { id: "key", label: "Clave de respuestas al final" },
  { id: "steps", label: "Solución paso a paso" },
] as const

export type AnswerFormatId = (typeof ANSWER_FORMATS)[number]["id"]

export const formatLabel = (id: AnswerFormatId) =>
  ANSWER_FORMATS.find((f) => f.id === id)?.label ?? id

export type AssignmentStatus = "Activa" | "Vencida" | "Completada"

export type Assignment = {
  id: string
  name: string
  target: string
  targetCarnets?: string[]
  jornada?: string
  codigoAcademico?: string
  seccion?: string
  exercises: number
  dueDate: string
  status: AssignmentStatus
  formats: AnswerFormatId[]
}

export const assignments: Assignment[] = [
  { id: "AS-01", name: "Repaso de Cinemática", target: "Sección A · IN6AM", targetCarnets: ["2021050", "2021001", "2021012"], jornada: "Matutina", codigoAcademico: "IN6AM", seccion: "A", exercises: 15, dueDate: "2026-10-20", status: "Activa", formats: ["none", "key"] },
  { id: "AS-02", name: "Leyes de Newton I", target: "Camila Torres (Carné 2021050)", targetCarnets: ["2021050"], jornada: "Matutina", codigoAcademico: "IN6AM", seccion: "A", exercises: 10, dueDate: "2026-10-18", status: "Activa", formats: ["none", "inline", "steps"] },
  { id: "AS-03", name: "Energía y trabajo", target: "Sección B · PE4BM", targetCarnets: ["2021088", "2022099"], jornada: "Vespertina", codigoAcademico: "PE4BM", seccion: "B", exercises: 12, dueDate: "2026-10-05", status: "Vencida", formats: ["key"] },
  { id: "AS-04", name: "Choques y momento", target: "Valeria Gómez (Carné 2021001)", targetCarnets: ["2021001"], jornada: "Matutina", codigoAcademico: "IN6AM", seccion: "A", exercises: 8, dueDate: "2026-09-30", status: "Completada", formats: ["none", "key", "steps"] },
]

export const collections = [
  { id: "CO-01", name: "Cinemática esencial", count: 18 },
  { id: "CO-02", name: "Dinámica intermedia", count: 12 },
  { id: "CO-03", name: "Electricidad básica", count: 10 },
]

export type DocumentRecord = {
  id: string
  name: string
  owner: string
  assignment: string
  exercises: number
  format: AnswerFormatId
  createdAt: string
  status: "Listo" | "Pendiente"
}

export const documents: DocumentRecord[] = [
  { id: "DOC-031", name: "Cinemática – Práctica 3", owner: "Valeria Gómez", assignment: "Repaso de Cinemática", exercises: 15, format: "key", createdAt: "2026-10-13", status: "Listo" },
  { id: "DOC-030", name: "Newton – Guía de estudio", owner: "Prof. Laura Méndez", assignment: "Leyes de Newton I", exercises: 10, format: "steps", createdAt: "2026-10-12", status: "Listo" },
  { id: "DOC-029", name: "Energía – Examen simulado", owner: "Diego Ramírez", assignment: "Energía y trabajo", exercises: 12, format: "none", createdAt: "2026-10-10", status: "Pendiente" },
  { id: "DOC-028", name: "Momento lineal – Taller", owner: "Camila Torres", assignment: "Choques y momento", exercises: 8, format: "inline", createdAt: "2026-10-07", status: "Listo" },
  { id: "DOC-027", name: "Cinemática – Práctica 2", owner: "Sofía Morales", assignment: "Repaso de Cinemática", exercises: 15, format: "key", createdAt: "2026-10-03", status: "Listo" },
]

export type ReviewResult = "Correcta" | "Incorrecta" | "Parcial"

export type Submission = {
  id: string
  student: string
  exerciseId: string
  answer: string
  procedure?: string
  submittedAt: string
  result?: ReviewResult
  notes?: string
}

export const submissions: Submission[] = [
  { id: "SU-01", student: "Valeria Gómez", exerciseId: "EJ-001", answer: "t = 3.0 s", procedure: "h = ½gt² → t = √(2·45/9.8)", submittedAt: "2026-10-13" },
  { id: "SU-02", student: "Diego Ramírez", exerciseId: "EJ-002", answer: "a = 5.6 m/s²", procedure: "a = g·cos30°", submittedAt: "2026-10-13" },
  { id: "SU-03", student: "Camila Torres", exerciseId: "EJ-007", answer: "F = 8000 N", procedure: "F = mv²/r = 1000·400/50", submittedAt: "2026-10-12" },
  { id: "SU-04", student: "Sofía Morales", exerciseId: "EJ-005", answer: "v = 9 m/s", submittedAt: "2026-10-10", result: "Correcta" },
  { id: "SU-05", student: "Mateo Castillo", exerciseId: "EJ-010", answer: "V = 1.1 V", submittedAt: "2026-10-09", result: "Incorrecta", notes: "Revisa la multiplicación." },
]

export const recentActivity = [
  { id: 1, text: "Nuevo ejercicio registrado: Fricción estática", time: "Hace 2 h", type: "exercise" },
  { id: 2, text: "Repaso de Cinemática asignado al Grupo A", time: "Hace 5 h", type: "assignment" },
  { id: 3, text: "PDF generado: Cinemática – Práctica 3", time: "Ayer", type: "pdf" },
  { id: 4, text: "Diego Ramírez entregó respuestas para validar", time: "Ayer", type: "submission" },
] as const

export const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("es-MX", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
