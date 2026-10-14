/**
 * Roles de usuario en la plataforma
 */
export type UserRole = 'TEACHER' | 'STUDENT';

/**
 * Niveles de dificultad para los ejercicios
 */
export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';

/**
 * Estados posibles de una tarea
 */
export type AssignmentStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

/**
 * Estados de entrega de un estudiante
 */
export type RecipientStatus = 'PENDING' | 'SUBMITTED' | 'GRADED';

/**
 * Representación básica de un usuario para transferencias
 */
export interface UserDTO {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
}

/**
 * Tema de física fundamental
 */
export interface TopicDTO {
  id: string;
  name: string;
  slug: string;
  description: string;
  gradeLevel: string;
  createdAt: string;
}

/**
 * Definición de un parámetro o variable para la generación de ejercicios
 */
export interface VariableDefinition {
  name: string;
  label: string;
  unit: string;
  min: number;
  max: number;
  step?: number;
  decimals?: number;
}

/**
 * Plantilla de ejercicio base
 */
export interface ExerciseTemplateDTO {
  id: string;
  topicId: string;
  topicName?: string;
  title: string;
  statementTemplate: string; // Ejemplo: "Un automóvil se desplaza con velocidad constante de {v} {vUnit} durante {t} {tUnit}..."
  variablesSchema: VariableDefinition[];
  defaultDifficulty: Difficulty;
  solverKey: string; // Clave para invocar el resolvedor en el registro matemático
  diagramUrl?: string;
  createdAt: string;
}

/**
 * Ejercicio concreto generado e instanciado para una tarea
 * La inmutabilidad permite reproducir exactamente la tarea generada
 */
export interface AssignmentExerciseDTO {
  id: string;
  assignmentId: string;
  recipientId?: string;
  exerciseId: string;
  exerciseNumber: number;
  statementRendered: string; // Enunciado con los valores sustituidos
  generatedValues: Record<string, number | string>; // Valores numéricos usados
  correctAnswer?: string | number | Record<string, unknown>; // Sólo visible para el docente o tras calificar
  solutionSteps?: string[]; // Pasos de solución para el profesor
  createdAt: string;
}

/**
 * Asignación a un estudiante en particular
 */
export interface AssignmentRecipientDTO {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName?: string;
  studentEmail?: string;
  status: RecipientStatus;
  score?: number;
  submittedAt?: string;
  exercises?: AssignmentExerciseDTO[];
}

/**
 * Tarea completa
 */
export interface AssignmentDTO {
  id: string;
  title: string;
  topicId: string;
  topicName?: string;
  teacherId: string;
  teacherName?: string;
  difficulty: Difficulty;
  status: AssignmentStatus;
  dueDate?: string;
  createdAt: string;
  exerciseCount: number;
  recipients?: AssignmentRecipientDTO[];
  exercises?: AssignmentExerciseDTO[]; // Ejercicios generales o versión docente
}

/**
 * Petición para generar una nueva tarea
 */
export interface GenerateAssignmentRequestDTO {
  title: string;
  topicId: string;
  difficulty: Difficulty;
  exerciseCount: number;
  studentIds: string[];
  dueDate?: string;
}

/**
 * Formato estándar de respuesta de la API REST
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  meta?: {
    timestamp: string;
    page?: number;
    total?: number;
  };
}
