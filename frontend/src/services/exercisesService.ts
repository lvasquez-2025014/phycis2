import { ExerciseTemplateDTO, TopicDTO, Difficulty } from '@fisica-tareas/shared';
import { httpClient } from './httpClient';

export class ExercisesService {
  public async getTopics(): Promise<TopicDTO[]> {
    try {
      return await httpClient.get<TopicDTO[]>('/exercises/topics');
    } catch {
      // Fallback con datos de demostración
      return [
        {
          id: 'topic-mru',
          name: 'Movimiento Rectilíneo Uniforme (MRU)',
          slug: 'movimiento-rectilineo-uniforme',
          description:
            'Estudio de móviles con velocidad constante y trayectoria rectilínea sin aceleración.',
          gradeLevel: '4to Diversificado',
          createdAt: '2026-01-10T00:00:00.000Z',
        },
        {
          id: 'topic-mrua',
          name: 'Movimiento Rectilíneo Uniformemente Acelerado (MRUA)',
          slug: 'movimiento-rectilineo-uniformemente-acelerado',
          description:
            'Cinemática unidimensional con aceleración constante, cambios de velocidad y distancias.',
          gradeLevel: '4to Diversificado',
          createdAt: '2026-01-10T00:00:00.000Z',
        },
        {
          id: 'topic-newton',
          name: 'Leyes de Newton y Dinámica',
          slug: 'leyes-de-newton',
          description:
            'Relación entre fuerzas, masas y aceleraciones bajo los principios de la mecánica clásica.',
          gradeLevel: '4to Diversificado',
          createdAt: '2026-01-10T00:00:00.000Z',
        },
      ];
    }
  }

  public async getExercises(params?: {
    topicId?: string;
    difficulty?: Difficulty;
  }): Promise<ExerciseTemplateDTO[]> {
    try {
      return await httpClient.get<ExerciseTemplateDTO[]>('/exercises', params);
    } catch {
      return [
        {
          id: 'ex-mru-01',
          topicId: 'topic-mru',
          topicName: 'Movimiento Rectilíneo Uniforme (MRU)',
          title: 'Cálculo de velocidad constante de un automóvil',
          statementTemplate:
            'Un automóvil se desplaza en línea recta sobre una autopista horizontal, recorriendo una distancia de {distancia} metros en un intervalo de {tiempo} segundos a velocidad constante. Determine la velocidad del automóvil.',
          variablesSchema: [
            {
              name: 'distancia',
              label: 'Distancia recorrida',
              unit: 'm',
              min: 100,
              max: 800,
              step: 20,
            },
            { name: 'tiempo', label: 'Tiempo transcurrido', unit: 's', min: 5, max: 40, step: 1 },
          ],
          defaultDifficulty: 'EASY',
          solverKey: 'mru_calcular_velocidad',
          createdAt: '2026-01-12T00:00:00.000Z',
        },
        {
          id: 'ex-mru-02',
          topicId: 'topic-mru',
          topicName: 'Movimiento Rectilíneo Uniforme (MRU)',
          title: 'Cálculo de distancia recorrida por un tren',
          statementTemplate:
            'Un tren de pasajeros mantiene una velocidad constante de {velocidad} m/s durante {tiempo} segundos en una vía recta. Calcule la distancia total recorrida.',
          variablesSchema: [
            {
              name: 'velocidad',
              label: 'Velocidad constante',
              unit: 'm/s',
              min: 10,
              max: 45,
              step: 2,
            },
            { name: 'tiempo', label: 'Tiempo de viaje', unit: 's', min: 15, max: 120, step: 5 },
          ],
          defaultDifficulty: 'EASY',
          solverKey: 'mru_calcular_distancia',
          createdAt: '2026-01-12T00:00:00.000Z',
        },
      ];
    }
  }
}

export const exercisesService = new ExercisesService();
