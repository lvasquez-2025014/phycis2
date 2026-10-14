import { z } from 'zod';

export const variableDefinitionSchema = z.object({
  name: z.string(),
  label: z.string(),
  unit: z.string(),
  min: z.number(),
  max: z.number(),
  step: z.number().optional(),
  decimals: z.number().optional(),
});

export const createExerciseSchema = z.object({
  topicId: z.string().uuid(),
  title: z.string().min(3),
  statementTemplate: z.string().min(10),
  variablesSchema: z.array(variableDefinitionSchema),
  defaultDifficulty: z.enum(['EASY', 'MEDIUM', 'HARD']),
  solverKey: z.string().min(3),
  diagramUrl: z.string().optional(),
});

export const listExercisesQuerySchema = z.object({
  topicId: z.string().optional(),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']).optional(),
});
