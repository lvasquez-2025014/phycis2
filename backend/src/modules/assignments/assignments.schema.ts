import { z } from 'zod';

export const generateAssignmentSchema = z.object({
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
  topicId: z.string().min(1, 'El tema es requerido'),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']),
  exerciseCount: z.number().int().min(1).max(20),
  studentIds: z.array(z.string()).min(1, 'Debe seleccionar al menos un estudiante'),
  dueDate: z.string().optional(),
});

export const listAssignmentsQuerySchema = z.object({
  topicId: z.string().optional(),
  studentId: z.string().optional(),
});

export type GenerateAssignmentInput = z.infer<typeof generateAssignmentSchema>;
