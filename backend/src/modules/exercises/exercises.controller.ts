import { Request, Response, NextFunction } from 'express';
import { ApiResponse, Difficulty } from '@fisica-tareas/shared';
import { exercisesService } from './exercises.service';

export class ExercisesController {
  public async getTopics(_req: Request, res: Response<ApiResponse>, next: NextFunction) {
    try {
      const topics = await exercisesService.getTopics();
      return res.status(200).json({
        success: true,
        data: topics,
        meta: { timestamp: new Date().toISOString(), total: topics.length },
      });
    } catch (error) {
      next(error);
    }
  }

  public async list(req: Request, res: Response<ApiResponse>, next: NextFunction) {
    try {
      const { topicId, difficulty } = req.query as { topicId?: string; difficulty?: Difficulty };
      const exercises = await exercisesService.listExercises({ topicId, difficulty });
      return res.status(200).json({
        success: true,
        data: exercises,
        meta: { timestamp: new Date().toISOString(), total: exercises.length },
      });
    } catch (error) {
      next(error);
    }
  }

  public async getById(req: Request, res: Response<ApiResponse>, next: NextFunction) {
    try {
      const exercise = await exercisesService.getExerciseById(req.params.id);
      return res.status(200).json({
        success: true,
        data: exercise,
        meta: { timestamp: new Date().toISOString() },
      });
    } catch (error) {
      next(error);
    }
  }
}

export const exercisesController = new ExercisesController();
