import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '@fisica-tareas/shared';
import { assignmentsService } from './assignments.service';

export class AssignmentsController {
  public async generate(req: Request, res: Response<ApiResponse>, next: NextFunction) {
    try {
      const assignment = await assignmentsService.generateAssignment(req.body, req.user!);
      return res.status(201).json({
        success: true,
        data: assignment,
        meta: { timestamp: new Date().toISOString() },
      });
    } catch (error) {
      next(error);
    }
  }

  public async list(req: Request, res: Response<ApiResponse>, next: NextFunction) {
    try {
      const assignments = await assignmentsService.getAssignments(req.user!);
      return res.status(200).json({
        success: true,
        data: assignments,
        meta: { timestamp: new Date().toISOString(), total: assignments.length },
      });
    } catch (error) {
      next(error);
    }
  }

  public async getById(req: Request, res: Response<ApiResponse>, next: NextFunction) {
    try {
      const assignment = await assignmentsService.getAssignmentById(req.params.id, req.user!);
      return res.status(200).json({
        success: true,
        data: assignment,
        meta: { timestamp: new Date().toISOString() },
      });
    } catch (error) {
      next(error);
    }
  }
}

export const assignmentsController = new AssignmentsController();
