import { UserDTO, UserRole } from '@fisica-tareas/shared';
import { AppError } from '../../middlewares/errorHandler';
import { LoginInput } from './auth.schema';

const DEMO_USERS: Record<string, { id: string; name: string; role: UserRole; email: string }> = {
  'profesor@kinal.edu.gt': {
    id: 'user-teacher-01',
    name: 'Prof. Carlos Alvarado',
    role: 'TEACHER',
    email: 'profesor@kinal.edu.gt',
  },
  'estudiante@kinal.edu.gt': {
    id: 'user-student-01',
    name: 'Alejandro Gómez (Carné 2025287)',
    role: 'STUDENT',
    email: 'estudiante@kinal.edu.gt',
  },
  'estudiante2@kinal.edu.gt': {
    id: 'user-student-02',
    name: 'María Fernanda López (Carné 2025114)',
    role: 'STUDENT',
    email: 'estudiante2@kinal.edu.gt',
  },
};

export class AuthService {
  public async login(input: LoginInput): Promise<{ token: string; user: UserDTO }> {
    const userMatch = DEMO_USERS[input.email.toLowerCase()];

    if (!userMatch) {
      throw new AppError(
        'Credenciales incorrectas. Para modo demo use: profesor@kinal.edu.gt o estudiante@kinal.edu.gt',
        401,
        'INVALID_CREDENTIALS',
      );
    }

    // En una fase de producción se verificaría con bcryptjs el hash en PostgreSQL
    const user: UserDTO = {
      id: userMatch.id,
      email: userMatch.email,
      name: userMatch.name,
      role: userMatch.role,
      createdAt: new Date().toISOString(),
    };

    const token = `demo-token-${user.role.toLowerCase()}-${user.id}`;

    return { token, user };
  }
}

export const authService = new AuthService();
