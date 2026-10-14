import { AssignmentDTO } from '@fisica-tareas/shared';
import { prisma } from '../../config/prisma';

// Tareas demo pre-generadas
const MOCK_ASSIGNMENTS: AssignmentDTO[] = [
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
    recipients: [
      {
        id: 'rec-01',
        assignmentId: 'asg-demo-01',
        studentId: 'user-student-01',
        studentName: 'Alejandro Gómez (Carné 2025287)',
        studentEmail: 'estudiante@kinal.edu.gt',
        status: 'PENDING',
        exercises: [
          {
            id: 'asg-ex-01-std1',
            assignmentId: 'asg-demo-01',
            recipientId: 'rec-01',
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
            assignmentId: 'asg-demo-01',
            recipientId: 'rec-01',
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
          {
            id: 'asg-ex-03-std1',
            assignmentId: 'asg-demo-01',
            recipientId: 'rec-01',
            exerciseId: 'ex-mru-03',
            exerciseNumber: 3,
            statementRendered:
              'Un ciclista avanza en una pista rectilínea con rapidez constante de 12 m/s. Si la longitud total del trayecto es de 600 metros, ¿cuántos segundos tardará en completarlo?',
            generatedValues: { distancia: 600, velocidad: 12 },
            correctAnswer: { value: 50, unit: 's', formattedAnswer: '50 s' },
            solutionSteps: [
              'Despeje del tiempo en MRU: t = d / v',
              'Sustitución: t = 600 m / 12 m/s',
              'Resultado: t = 50 s',
            ],
            createdAt: '2026-02-10T10:00:00.000Z',
          },
        ],
      },
      {
        id: 'rec-02',
        assignmentId: 'asg-demo-01',
        studentId: 'user-student-02',
        studentName: 'María Fernanda López (Carné 2025114)',
        studentEmail: 'estudiante2@kinal.edu.gt',
        status: 'SUBMITTED',
        score: 95,
        submittedAt: '2026-02-15T14:30:00.000Z',
        exercises: [
          {
            id: 'asg-ex-01-std2',
            assignmentId: 'asg-demo-01',
            recipientId: 'rec-02',
            exerciseId: 'ex-mru-01',
            exerciseNumber: 1,
            // Versión aleatoria diferente para la estudiante 2
            statementRendered:
              'Un automóvil se desplaza en línea recta sobre una autopista horizontal, recorriendo una distancia de 480 metros en un intervalo de 20 segundos a velocidad constante. Determine la velocidad del automóvil.',
            generatedValues: { distancia: 480, tiempo: 20 },
            correctAnswer: { value: 24, unit: 'm/s', formattedAnswer: '24 m/s' },
            solutionSteps: [
              'Fórmula fundamental del MRU: v = d / t',
              'Sustitución de valores: v = 480 m / 20 s',
              'Resultado: v = 24 m/s',
            ],
            createdAt: '2026-02-10T10:00:00.000Z',
          },
        ],
      },
    ],
    // Versión maestra o plantilla
    exercises: [
      {
        id: 'asg-ex-01-master',
        assignmentId: 'asg-demo-01',
        exerciseId: 'ex-mru-01',
        exerciseNumber: 1,
        statementRendered:
          'Un automóvil se desplaza en línea recta sobre una autopista horizontal, recorriendo una distancia de {distancia} metros en un intervalo de {tiempo} segundos a velocidad constante. Determine la velocidad del automóvil.',
        generatedValues: { distancia: 360, tiempo: 18 },
        correctAnswer: { value: 20, unit: 'm/s', formattedAnswer: '20 m/s' },
        createdAt: '2026-02-10T10:00:00.000Z',
      },
    ],
  },
];

export class AssignmentsRepository {
  public async findAll(): Promise<AssignmentDTO[]> {
    try {
      const records = await prisma.assignment.findMany({
        include: {
          topic: true,
          teacher: true,
          recipients: {
            include: {
              student: true,
              exercises: true,
            },
          },
          exercises: true,
        },
        orderBy: { createdAt: 'desc' },
      });

      if (records && records.length > 0) {
        return records.map((r) => ({
          id: r.id,
          title: r.title,
          topicId: r.topicId,
          topicName: r.topic.name,
          teacherId: r.teacherId,
          teacherName: r.teacher.name,
          difficulty: r.difficulty as AssignmentDTO['difficulty'],
          status: r.status as AssignmentDTO['status'],
          dueDate: r.dueDate?.toISOString(),
          createdAt: r.createdAt.toISOString(),
          exerciseCount: r.exercises.length,
          recipients: r.recipients.map((rec) => ({
            id: rec.id,
            assignmentId: rec.assignmentId,
            studentId: rec.studentId,
            studentName: rec.student.name,
            studentEmail: rec.student.email,
            status: rec.status as AssignmentDTO['recipients'] extends (infer R)[]
              ? R extends { status: infer S }
                ? S
                : never
              : never,
            score: rec.score || undefined,
            submittedAt: rec.submittedAt?.toISOString(),
            exercises: rec.exercises.map((e) => ({
              id: e.id,
              assignmentId: e.assignmentId,
              recipientId: e.recipientId || undefined,
              exerciseId: e.exerciseId,
              exerciseNumber: e.exerciseNumber,
              statementRendered: e.statementRendered,
              generatedValues: e.generatedValues as Record<string, number | string>,
              correctAnswer: e.correctAnswer as Record<string, unknown>,
              solutionSteps: (e.solutionSteps as string[]) || undefined,
              createdAt: e.createdAt.toISOString(),
            })),
          })),
        }));
      }
    } catch {
      // Fallback
    }

    return MOCK_ASSIGNMENTS;
  }

  public async findById(id: string): Promise<AssignmentDTO | null> {
    const list = await this.findAll();
    return list.find((a) => a.id === id) || null;
  }

  public async save(assignment: AssignmentDTO): Promise<AssignmentDTO> {
    MOCK_ASSIGNMENTS.unshift(assignment);
    return assignment;
  }
}

export const assignmentsRepository = new AssignmentsRepository();
