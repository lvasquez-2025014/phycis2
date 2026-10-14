import { Request, Response, NextFunction } from 'express';
import { UserRole } from '@fisica-tareas/shared';
import { AppError } from './errorHandler';

export interface AuthenticatedUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

/**
 * Middleware para identificar al usuario autenticado (simulado o vía header para prototipo)
 */
export const authenticate = (req: Request, _res: Response, next: NextFunction) => {
  const userId = (req.headers['x-user-id'] as string) || 'demo-teacher-01';
  const userRole = (req.headers['x-user-role'] as UserRole) || 'TEACHER';
  const userName =
    (req.headers['x-user-name'] as string) ||
    (userRole === 'TEACHER' ? 'Prof. Carlos Alvarado' : 'Estudiante Demo');
  const userEmail =
    (req.headers['x-user-email'] as string) ||
    (userRole === 'TEACHER' ? 'profesor@kinal.edu.gt' : 'estudiante@kinal.edu.gt');

  req.user = {
    id: userId,
    email: userEmail,
    name: userName,
    role: userRole,
  };

  next();
};

/**
 * Guard para restringir rutas a roles específicos
 */
export const requireRole = (allowedRoles: UserRole | UserRole[]) => {
  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError('No autenticado', 401, 'UNAUTHORIZED'));
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(`Acceso denegado: Se requiere rol ${roles.join(' o ')}`, 403, 'FORBIDDEN'),
      );
    }

    next();
  };
};

/**
 * Asegura que un estudiante sólo pueda acceder a sus propios recursos
 */
export const authorizeStudentAccess = (req: Request, studentIdParam = 'studentId') => {
  if (!req.user) {
    throw new AppError('No autenticado', 401, 'UNAUTHORIZED');
  }

  // Los profesores pueden consultar cualquier estudiante
  if (req.user.role === 'TEACHER') {
    return true;
  }

  const requestedStudentId = req.params[studentIdParam] || req.query[studentIdParam];
  if (requestedStudentId && requestedStudentId !== req.user.id) {
    throw new AppError(
      'Acceso denegado: No tienes permiso para ver datos de otros estudiantes',
      403,
      'FORBIDDEN_STUDENT_ISOLATION',
    );
  }

  return true;
};
