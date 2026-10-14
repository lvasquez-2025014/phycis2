import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('El correo electrónico no es válido'),
  password: z.string().min(4, 'La contraseña debe tener al menos 4 caracteres'),
  role: z.enum(['TEACHER', 'STUDENT']).optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
