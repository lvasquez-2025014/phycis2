import { ExerciseTemplateDTO, TopicDTO, Difficulty } from '@fisica-tareas/shared';
import { AppError } from '../../middlewares/errorHandler';
import { exercisesRepository } from './exercises.repository';

export class ExercisesService {
  public async getTopics(): Promise<TopicDTO[]> {
    return exercisesRepository.getTopics();
  }

  public async listExercises(filters?: {
    topicId?: string;
    difficulty?: Difficulty;
  }): Promise<ExerciseTemplateDTO[]> {
    return exercisesRepository.findAll(filters);
  }

  public async getExerciseById(id: string): Promise<ExerciseTemplateDTO> {
    const exercise = await exercisesRepository.findById(id);
    if (!exercise) {
      throw new AppError('Plantilla de ejercicio no encontrada', 404, 'EXERCISE_NOT_FOUND');
    }
    return exercise;
  }
}

export const exercisesService = new ExercisesService();
