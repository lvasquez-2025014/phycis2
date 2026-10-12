export type QuestionType = 'multiple_choice' | 'application_problem' | 'graph_table' | 'open_text';

export interface Objective {
  id: string;
  text: string;
}

export interface ChoiceOption {
  letter: string; // 'a', 'b', 'c', 'd'
  text: string;
  isCorrect?: boolean;
}

export interface AnswerSlot {
  label: string; // ej: "Resp."
  value?: string; // Respuesta docente ej: "0.017 s"
}

export interface AnswerTableRow {
  col1: string; // ej: "0 – 3" o "Vmedia"
  col2: string; // ej: "90.00 km" (en modo docente)
}

export interface AnswerTable {
  headerCol1: string; // ej: "Intervalo Tiempo" o ""
  headerCol2: string; // ej: "Respuesta" o ""
  rows: AnswerTableRow[];
}

export interface SubQuestion {
  id: string;
  letter?: string; // ej: "(a)", "(b)", "(c)"
  text: string;
  answerSlots?: AnswerSlot[];
  answerTable?: AnswerTable;
}

export interface ExerciseItem {
  id: string;
  number: number;
  type: QuestionType;
  columnPlacement?: 'auto' | 'left' | 'right';
  prompt: string; // Redacción del problema
  promptFormula?: string; // ej: "5 s → 1 milla"
  imageUrl?: string; // Gráfica (ej: /assets/image5.jpeg)
  imageCaption?: string;
  
  // Opción múltiple
  options?: ChoiceOption[];

  // Incisos y respuestas
  hasRealiceHeading?: boolean; // Muestra "Realice:"
  subQuestions?: SubQuestion[];
  answerSlots?: AnswerSlot[];
  answerTable?: AnswerTable;

  // Solución docente
  teacherSolution?: string;
}

export interface WorksheetSection {
  id: string;
  title: string; // ej: "Forma 1 – PREGUNTAS CONCEPTUALES"
  instructions: string;
  items: ExerciseItem[];
}

export interface InstitutionalHeader {
  logoUrl: string;
  unitTitle: string; // "Unidad 1"
  sectionCodeLabel: string; // "Código de sección académica"
  sectionCodeValue: string; // ""
  courseTitle: string; // "Física II – Quinto"
  htCodeAndTitle: string; // "HT01: Movimiento Rectilíneo Uniforme (MRU)"
  year: string; // "2026"
}

export interface MilestoneItem {
  label: string;
  startText?: string;
  endText?: string;
  highlightText?: string;
}

export interface WorksheetData {
  header: InstitutionalHeader;
  generalInstructionsTitle: string; // "HT01: MOVIMIENTO RECTILÍNEO UNIFORME (MRU)"
  generalInstructionsText: string;
  
  // Página 1
  objectives: Objective[];
  generalDescriptionInstructions: string; // "Lee detenidamente las siguientes instrucciones:"
  generalDescriptionPoints: string[];
  milestones: MilestoneItem[];
  observations: string[];
  
  // Contenido de ejercicios (Páginas 2 y 3)
  sections: WorksheetSection[];

  // Configuración
  mode: 'student' | 'teacher';
}
