import { UserDTO, UserRole } from '@fisica-tareas/shared';
import { httpClient } from './httpClient';

export const DEMO_PROFILES: Record<UserRole, UserDTO> = {
  TEACHER: {
    id: 'user-teacher-01',
    email: 'profesor@kinal.edu.gt',
    name: 'Prof. Carlos Alvarado',
    role: 'TEACHER',
    createdAt: '2026-01-15T08:00:00.000Z',
  },
  STUDENT: {
    id: 'user-student-01',
    email: 'estudiante@kinal.edu.gt',
    name: 'Alejandro Gómez (Carné 2025287)',
    role: 'STUDENT',
    createdAt: '2026-01-20T08:00:00.000Z',
  },
};

export class AuthService {
  public async login(email: string, password: string): Promise<{ token: string; user: UserDTO }> {
    try {
      const response = await httpClient.post<{ token: string; user: UserDTO }>('/auth/login', {
        email,
        password,
      });
      this.saveSession(response.user);
      return response;
    } catch {
      // Fallback para modo demo sin backend activo
      const role: UserRole = email.includes('profesor') ? 'TEACHER' : 'STUDENT';
      const user = DEMO_PROFILES[role];
      this.saveSession(user);
      return { token: `demo-token-${role}`, user };
    }
  }

  public saveSession(user: UserDTO): void {
    localStorage.setItem('demo_current_user', JSON.stringify(user));
  }

  public getCurrentUser(): UserDTO {
    const raw = localStorage.getItem('demo_current_user');
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch {
        // Fallback
      }
    }
    // Por defecto inicia como Docente para facilitar la exploración de creación de tareas
    const defaultUser = DEMO_PROFILES.TEACHER;
    this.saveSession(defaultUser);
    return defaultUser;
  }

  public switchDemoRole(role: UserRole): UserDTO {
    const user = DEMO_PROFILES[role];
    this.saveSession(user);
    return user;
  }

  public logout(): void {
    localStorage.removeItem('demo_current_user');
  }
}

export const authService = new AuthService();
