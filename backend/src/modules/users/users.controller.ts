import { Request, Response, NextFunction } from 'express';
import { ApiResponse, UserRole } from '@fisica-tareas/shared';
import { usersService } from './users.service';

export class UsersController {
  public async list(req: Request, res: Response<ApiResponse>, next: NextFunction) {
    try {
      const role = req.query.role as UserRole | undefined;
      const users = await usersService.listUsers(role);
      return res.status(200).json({
        success: true,
        data: users,
        meta: { timestamp: new Date().toISOString(), total: users.length },
      });
    } catch (error) {
      next(error);
    }
  }

  public async getById(req: Request, res: Response<ApiResponse>, next: NextFunction) {
    try {
      const user = await usersService.getUserById(req.params.id);
      return res.status(200).json({
        success: true,
        data: user,
        meta: { timestamp: new Date().toISOString() },
      });
    } catch (error) {
      next(error);
    }
  }
}

export const usersController = new UsersController();
