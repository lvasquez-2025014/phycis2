import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().default(4000),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  DATABASE_URL: z
    .string()
    .optional()
    .default('postgresql://postgres:postgres@localhost:5432/fisica_tareas?schema=public'),
  CORS_ORIGIN: z.string().default('http://localhost:5173'),
  JWT_SECRET: z.string().default('dev-secret-key-12345'),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('❌ Error de validación en las variables de entorno:', _env.error.format());
  process.exit(1);
}

export const env = _env.data;
