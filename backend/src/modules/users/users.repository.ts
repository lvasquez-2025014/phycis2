import { UserDTO, UserRole } from '@fisica-tareas/shared';
import { prisma } from '../../config/prisma';

// Usuarios de demostración en memoria por defecto
const MOCK_USERS: UserDTO[] = [
  {
    id: 'user-teacher-01',
    email: 'profesor@kinal.edu.gt',
    name: 'Prof. Carlos Alvarado',
    role: 'TEACHER',
    createdAt: '2026-01-15T08:00:00.000Z',
  },
  {
    id: 'user-student-01',
    email: 'estudiante@kinal.edu.gt',
    name: 'Alejandro Gómez (Carné 2025287)',
    role: 'STUDENT',
    createdAt: '2026-01-20T08:00:00.000Z',
  },
  {
    id: 'user-student-02',
    email: 'estudiante2@kinal.edu.gt',
    name: 'María Fernanda López (Carné 2025114)',
    role: 'STUDENT',
    createdAt: '2026-01-20T08:00:00.000Z',
  },
  {
    id: 'user-student-03',
    email: 'estudiante3@kinal.edu.gt',
    name: 'José Daniel Martínez (Carné 2025092)',
    role: 'STUDENT',
    createdAt: '2026-01-21T08:00:00.000Z',
  },
];

export class UsersRepository {
  public async findById(id: string): Promise<UserDTO | null> {
    try {
      const user = await prisma.user.findUnique({ where: { id } });
      if (user) {
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role as UserRole,
          createdAt: user.createdAt.toISOString(),
        };
      }
    } catch {
      // Fallback a memoria si la base de datos no está levantada
    }
    return MOCK_USERS.find((u) => u.id === id) || null;
  }

  public async findByEmail(email: string): Promise<UserDTO | null> {
    try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (user) {
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role as UserRole,
          createdAt: user.createdAt.toISOString(),
        };
      }
    } catch {
      // Fallback a memoria
    }
    return MOCK_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
  }

  public async findAll(role?: UserRole): Promise<UserDTO[]> {
    try {
      const users = await prisma.user.findMany({
        where: role ? { role: role as 'TEACHER' | 'STUDENT' } : undefined,
        orderBy: { name: 'asc' },
      });
      if (users && users.length > 0) {
        return users.map((u) => ({
          id: u.id,
          email: u.email,
          name: u.name,
          role: u.role as UserRole,
          createdAt: u.createdAt.toISOString(),
        }));
      }
    } catch {
      // Fallback a memoria
    }
    return role ? MOCK_USERS.filter((u) => u.role === role) : MOCK_USERS;
  }
}

export const usersRepository = new UsersRepository();
