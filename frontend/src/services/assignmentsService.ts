import { AssignmentDTO, GenerateAssignmentRequestDTO } from '@fisica-tareas/shared';
import { httpClient } from './httpClient';

export class AssignmentsService {
  public async getAssignments(): Promise<AssignmentDTO[]> {
    try {
      return await httpClient.get<AssignmentDTO[]>('/assignments');
    } catch {
      // Fallback con tareas demo
      return [
        {
          id: 'asg-demo-01',
          title: 'Hoja de Trabajo 01 - MRU Fundamental',
          topicId: 'topic-mru',
          topicName: 'Movimiento Rectilíneo Uniforme (MRU)',
          teacherId: 'user-teacher-01',
          teacherName: 'Prof. Carlos Alvarado',
          difficulty: 'EASY',
          status: 'PUBLISHED',
          exerciseCount: 3,
          createdAt: '2026-02-10T10:00:00.000Z',
          dueDate: '2026-03-01T23:59:59.000Z',
        },
      ];
    }
  }

  public async getAssignmentById(id: string): Promise<AssignmentDTO> {
    try {
      return await httpClient.get<AssignmentDTO>(`/assignments/${id}`);
    } catch {
      // Fallback con datos demo
      return {
        id,
        title: 'Hoja de Trabajo 01 - MRU Fundamental',
        topicId: 'topic-mru',
        topicName: 'Movimiento Rectilíneo Uniforme (MRU)',
        teacherId: 'user-teacher-01',
        teacherName: 'Prof. Carlos Alvarado',
        difficulty: 'EASY',
        status: 'PUBLISHED',
        exerciseCount: 2,
        createdAt: '2026-02-10T10:00:00.000Z',
        dueDate: '2026-03-01T23:59:59.000Z',
        recipients: [
          {
            id: 'rec-01',
            assignmentId: id,
            studentId: 'user-student-01',
            studentName: 'Alejandro Gómez (Carné 2025287)',
            status: 'PENDING',
            exercises: [
              {
                id: 'asg-ex-01-std1',
                assignmentId: id,
                exerciseId: 'ex-mru-01',
                exerciseNumber: 1,
                statementRendered:
                  'Un automóvil se desplaza en línea recta sobre una autopista horizontal, recorriendo una distancia de 360 metros en un intervalo de 18 segundos a velocidad constante. Determine la velocidad del automóvil.',
                generatedValues: { distancia: 360, tiempo: 18 },
                correctAnswer: { value: 20, unit: 'm/s', formattedAnswer: '20 m/s' },
                solutionSteps: [
                  'Fórmula fundamental del MRU: v = d / t',
                  'Sustitución de valores: v = 360 m / 18 s',
                  'Resultado: v = 20 m/s',
                ],
                createdAt: '2026-02-10T10:00:00.000Z',
              },
              {
                id: 'asg-ex-02-std1',
                assignmentId: id,
                exerciseId: 'ex-mru-02',
                exerciseNumber: 2,
                statementRendered:
                  'Un tren de pasajeros mantiene una velocidad constante de 28 m/s durante 45 segundos en una vía recta. Calcule la distancia total recorrida.',
                generatedValues: { velocidad: 28, tiempo: 45 },
                correctAnswer: { value: 1260, unit: 'm', formattedAnswer: '1260 m' },
                solutionSteps: [
                  'Fórmula de distancia en MRU: d = v * t',
                  'Sustitución: d = 28 m/s * 45 s',
                  'Resultado: d = 1260 m',
                ],
                createdAt: '2026-02-10T10:00:00.000Z',
              },
            ],
          },
        ],
      };
    }
  }

  public async generateAssignment(payload: GenerateAssignmentRequestDTO): Promise<AssignmentDTO> {
    return await httpClient.post<AssignmentDTO>('/assignments/generate', payload);
  }
}

export const assignmentsService = new AssignmentsService();
