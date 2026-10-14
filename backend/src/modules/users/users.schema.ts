import { z } from 'zod';

export const createUserSchema = z.object({
  email: z.string().email('Correo inválido'),
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  password: z.string().min(6, 'La contraseña debe tener mínimo 6 caracteres'),
  role: z.enum(['TEACHER', 'STUDENT']),
});

export const listUsersQuerySchema = z.object({
  role: z.enum(['TEACHER', 'STUDENT']).optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
