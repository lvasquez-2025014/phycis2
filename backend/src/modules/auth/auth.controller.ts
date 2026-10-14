import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '@fisica-tareas/shared';
import { authService } from './auth.service';

export class AuthController {
  public async login(req: Request, res: Response<ApiResponse>, next: NextFunction) {
    try {
      const result = await authService.login(req.body);
      return res.status(200).json({
        success: true,
        data: result,
        meta: { timestamp: new Date().toISOString() },
      });
    } catch (error) {
      next(error);
    }
  }

  public async getCurrentUser(req: Request, res: Response<ApiResponse>, next: NextFunction) {
    try {
      return res.status(200).json({
        success: true,
        data: req.user,
        meta: { timestamp: new Date().toISOString() },
      });
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();
