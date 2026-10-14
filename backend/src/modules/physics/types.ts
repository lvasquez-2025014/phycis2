/**
 * Tipos fundamentales para el motor desacoplado de física
 * NO depende de Express ni de Prisma
 */

export interface SolverOutput {
  value: number;
  unit: string;
  formattedAnswer: string;
  steps: string[];
}

export type ExerciseSolverFunction = (variables: Record<string, number>) => SolverOutput;

export interface ExerciseSolverDefinition {
  key: string;
  name: string;
  topicSlug: string;
  description: string;
  requiredVariables: string[];
  solve: ExerciseSolverFunction;
}
