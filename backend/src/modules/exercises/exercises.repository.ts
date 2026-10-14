import { ExerciseTemplateDTO, TopicDTO, Difficulty } from '@fisica-tareas/shared';
import { prisma } from '../../config/prisma';

export const SEED_TOPICS: TopicDTO[] = [
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

export const SEED_EXERCISES: ExerciseTemplateDTO[] = [
  {
    id: 'ex-mru-01',
    topicId: 'topic-mru',
    topicName: 'Movimiento Rectilíneo Uniforme (MRU)',
    title: 'Cálculo de velocidad constante de un automóvil',
    statementTemplate:
      'Un automóvil se desplaza en línea recta sobre una autopista horizontal, recorriendo una distancia de {distancia} metros en un intervalo de {tiempo} segundos a velocidad constante. Determine la velocidad del automóvil.',
    variablesSchema: [
      { name: 'distancia', label: 'Distancia recorrida', unit: 'm', min: 100, max: 800, step: 20 },
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
      { name: 'velocidad', label: 'Velocidad constante', unit: 'm/s', min: 10, max: 45, step: 2 },
      { name: 'tiempo', label: 'Tiempo de viaje', unit: 's', min: 15, max: 120, step: 5 },
    ],
    defaultDifficulty: 'EASY',
    solverKey: 'mru_calcular_distancia',
    createdAt: '2026-01-12T00:00:00.000Z',
  },
  {
    id: 'ex-mru-03',
    topicId: 'topic-mru',
    topicName: 'Movimiento Rectilíneo Uniforme (MRU)',
    title: 'Tiempo para completar recorrido en bicicleta',
    statementTemplate:
      'Un ciclista avanza en una pista rectilínea con rapidez constante de {velocidad} m/s. Si la longitud total del trayecto es de {distancia} metros, ¿cuántos segundos tardará en completarlo?',
    variablesSchema: [
      {
        name: 'distancia',
        label: 'Longitud del trayecto',
        unit: 'm',
        min: 200,
        max: 1200,
        step: 50,
      },
      { name: 'velocidad', label: 'Rapidez del ciclista', unit: 'm/s', min: 4, max: 20, step: 1 },
    ],
    defaultDifficulty: 'MEDIUM',
    solverKey: 'mru_calcular_tiempo',
    createdAt: '2026-01-12T00:00:00.000Z',
  },
  {
    id: 'ex-mrua-01',
    topicId: 'topic-mrua',
    topicName: 'Movimiento Rectilíneo Uniformemente Acelerado (MRUA)',
    title: 'Velocidad final de un móvil en aceleración',
    statementTemplate:
      'Un móvil inicia su movimiento con una velocidad inicial de {v0} m/s y acelera uniformemente a razón de {aceleracion} m/s² durante un lapso de {tiempo} segundos. Determine la velocidad final alcanzada.',
    variablesSchema: [
      { name: 'v0', label: 'Velocidad inicial', unit: 'm/s', min: 0, max: 25, step: 1 },
      {
        name: 'aceleracion',
        label: 'Aceleración constante',
        unit: 'm/s²',
        min: 1.5,
        max: 6,
        step: 0.5,
      },
      { name: 'tiempo', label: 'Tiempo transcurrido', unit: 's', min: 3, max: 20, step: 1 },
    ],
    defaultDifficulty: 'MEDIUM',
    solverKey: 'mrua_velocidad_final',
    createdAt: '2026-01-14T00:00:00.000Z',
  },
  {
    id: 'ex-newton-01',
    topicId: 'topic-newton',
    topicName: 'Leyes de Newton y Dinámica',
    title: 'Fuerza neta sobre un cuerpo rígido',
    statementTemplate:
      'Sobre un cuerpo de masa {masa} kg que se encuentra en una superficie lisa sin fricción se ejerce una fuerza horizontal constante produciendo una aceleración de {aceleracion} m/s². Calcule la magnitud de dicha fuerza.',
    variablesSchema: [
      { name: 'masa', label: 'Masa del cuerpo', unit: 'kg', min: 2, max: 50, step: 2 },
      {
        name: 'aceleracion',
        label: 'Aceleración experimentada',
        unit: 'm/s²',
        min: 1,
        max: 8,
        step: 0.5,
      },
    ],
    defaultDifficulty: 'HARD',
    solverKey: 'newton_segunda_ley',
    createdAt: '2026-01-15T00:00:00.000Z',
  },
];

export class ExercisesRepository {
  public async getTopics(): Promise<TopicDTO[]> {
    try {
      const topics = await prisma.topic.findMany({ orderBy: { name: 'asc' } });
      if (topics && topics.length > 0) {
        return topics.map((t) => ({
          id: t.id,
          name: t.name,
          slug: t.slug,
          description: t.description,
          gradeLevel: t.gradeLevel,
          createdAt: t.createdAt.toISOString(),
        }));
      }
    } catch {
      // Fallback
    }
    return SEED_TOPICS;
  }

  public async getTopicById(id: string): Promise<TopicDTO | null> {
    const topics = await this.getTopics();
    return topics.find((t) => t.id === id) || null;
  }

  public async findAll(filters?: {
    topicId?: string;
    difficulty?: Difficulty;
  }): Promise<ExerciseTemplateDTO[]> {
    try {
      const exercises = await prisma.exercise.findMany({
        where: {
          topicId: filters?.topicId,
          defaultDifficulty: filters?.difficulty,
        },
        include: { topic: true },
        orderBy: { createdAt: 'desc' },
      });

      if (exercises && exercises.length > 0) {
        return exercises.map((e) => ({
          id: e.id,
          topicId: e.topicId,
          topicName: e.topic.name,
          title: e.title,
          statementTemplate: e.statementTemplate,
          variablesSchema: e.variablesSchema as unknown as ExerciseTemplateDTO['variablesSchema'],
          defaultDifficulty: e.defaultDifficulty as Difficulty,
          solverKey: e.solverKey,
          diagramUrl: e.diagramUrl || undefined,
          createdAt: e.createdAt.toISOString(),
        }));
      }
    } catch {
      // Fallback
    }

    let result = SEED_EXERCISES;
    if (filters?.topicId) {
      result = result.filter((e) => e.topicId === filters.topicId);
    }
    if (filters?.difficulty) {
      result = result.filter((e) => e.defaultDifficulty === filters.difficulty);
    }
    return result;
  }

  public async findById(id: string): Promise<ExerciseTemplateDTO | null> {
    const all = await this.findAll();
    return all.find((e) => e.id === id) || null;
  }
}

export const exercisesRepository = new ExercisesRepository();
