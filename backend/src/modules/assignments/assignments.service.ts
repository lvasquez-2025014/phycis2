import {
  AssignmentDTO,
  AssignmentExerciseDTO,
  AssignmentRecipientDTO,
  GenerateAssignmentRequestDTO,
} from '@fisica-tareas/shared';
import { AppError } from '../../middlewares/errorHandler';
import { AuthenticatedUser } from '../../middlewares/authMiddleware';
import { exercisesRepository } from '../exercises/exercises.repository';
import { usersRepository } from '../users/users.repository';
import { physicsRegistry } from '../physics';
import { assignmentsRepository } from './assignments.repository';

export class AssignmentsService {
  /**
   * Genera una tarea creando versiones aleatorias personalizadas por estudiante
   */
  public async generateAssignment(
    input: GenerateAssignmentRequestDTO,
    teacher: AuthenticatedUser,
  ): Promise<AssignmentDTO> {
    const topic = await exercisesRepository.getTopicById(input.topicId);
    if (!topic) {
      throw new AppError('Tema no encontrado', 404, 'TOPIC_NOT_FOUND');
    }

    const availableExercises = await exercisesRepository.findAll({
      topicId: input.topicId,
    });

    if (availableExercises.length === 0) {
      throw new AppError(
        'No hay plantillas de ejercicios disponibles para este tema.',
        400,
        'NO_EXERCISES_FOR_TOPIC',
      );
    }

    const assignmentId = `asg-${Date.now()}`;
    const recipients: AssignmentRecipientDTO[] = [];

    // Por cada estudiante seleccionado, generar su propia versión aleatoria
    for (const studentId of input.studentIds) {
      const student = await usersRepository.findById(studentId);
      const recipientId = `rec-${Date.now()}-${studentId.slice(-4)}`;

      // Seleccionar ejercicios (rotando o eligiendo según la cantidad requerida)
      const studentExercises: AssignmentExerciseDTO[] = [];
      const count = Math.min(input.exerciseCount, availableExercises.length * 3);

      for (let i = 0; i < count; i++) {
        const template = availableExercises[i % availableExercises.length];
        const generatedValues: Record<string, number> = {};

        // Generar valores numéricos aleatorios basados en el esquema de variables
        for (const varDef of template.variablesSchema) {
          const step = varDef.step || 1;
          const stepsCount = Math.floor((varDef.max - varDef.min) / step);
          const randomStep = Math.floor(Math.random() * (stepsCount + 1));
          const val = Number((varDef.min + randomStep * step).toFixed(varDef.decimals || 2));
          generatedValues[varDef.name] = val;
        }

        // Renderizar el enunciado sustituyendo las variables {varName}
        let rendered = template.statementTemplate;
        for (const [key, value] of Object.entries(generatedValues)) {
          rendered = rendered.replace(new RegExp(`{${key}}`, 'g'), String(value));
        }

        // Resolver matemáticamente utilizando el motor desacoplado de física
        const solution = physicsRegistry.solve(template.solverKey, generatedValues);

        studentExercises.push({
          id: `ex-inst-${Date.now()}-${studentId.slice(-4)}-${i + 1}`,
          assignmentId,
          recipientId,
          exerciseId: template.id,
          exerciseNumber: i + 1,
          statementRendered: rendered,
          generatedValues,
          correctAnswer: {
            value: solution.value,
            unit: solution.unit,
            formattedAnswer: solution.formattedAnswer,
          },
          solutionSteps: solution.steps,
          createdAt: new Date().toISOString(),
        });
      }

      recipients.push({
        id: recipientId,
        assignmentId,
        studentId,
        studentName: student?.name || 'Estudiante',
        studentEmail: student?.email || '',
        status: 'PENDING',
        exercises: studentExercises,
      });
    }

    const newAssignment: AssignmentDTO = {
      id: assignmentId,
      title: input.title,
      topicId: topic.id,
      topicName: topic.name,
      teacherId: teacher.id,
      teacherName: teacher.name,
      difficulty: input.difficulty,
      status: 'PUBLISHED',
      exerciseCount: input.exerciseCount,
      dueDate: input.dueDate,
      createdAt: new Date().toISOString(),
      recipients,
    };

    return assignmentsRepository.save(newAssignment);
  }

  /**
   * Obtiene la lista de tareas aplicando reglas de visibilidad y seguridad
   */
  public async getAssignments(user: AuthenticatedUser): Promise<AssignmentDTO[]> {
    const allAssignments = await assignmentsRepository.findAll();

    if (user.role === 'TEACHER') {
      return allAssignments;
    }

    // Para un estudiante: Sólo retornar las tareas en las que esté como destinatario
    return allAssignments
      .filter((asg) => asg.recipients?.some((r) => r.studentId === user.id))
      .map((asg) => {
        // Filtrar datos sensibles de otros estudiantes
        const myRecipient = asg.recipients?.find((r) => r.studentId === user.id);
        return {
          ...asg,
          recipients: myRecipient ? [this.sanitizeRecipientForStudent(myRecipient)] : [],
        };
      });
  }

  /**
   * Obtiene una tarea por ID respetando los permisos de rol y privacidad
   */
  public async getAssignmentById(id: string, user: AuthenticatedUser): Promise<AssignmentDTO> {
    const assignment = await assignmentsRepository.findById(id);
    if (!assignment) {
      throw new AppError('Tarea no encontrada', 404, 'ASSIGNMENT_NOT_FOUND');
    }

    if (user.role === 'TEACHER') {
      return assignment; // El profesor puede ver todo
    }

    // El estudiante sólo puede ver su propia asignación
    const myRecipient = assignment.recipients?.find((r) => r.studentId === user.id);
    if (!myRecipient) {
      throw new AppError(
        'Acceso denegado: No estás asignado a esta tarea.',
        403,
        'ASSIGNMENT_ACCESS_DENIED',
      );
    }

    return {
      ...assignment,
      recipients: [this.sanitizeRecipientForStudent(myRecipient)],
    };
  }

  /**
   * Elimina respuestas correctas y pasos de solución para estudiantes no calificados
   */
  private sanitizeRecipientForStudent(recipient: AssignmentRecipientDTO): AssignmentRecipientDTO {
    const isGraded = recipient.status === 'GRADED';
    return {
      ...recipient,
      exercises: recipient.exercises?.map((e) => ({
        ...e,
        correctAnswer: isGraded ? e.correctAnswer : undefined,
        solutionSteps: isGraded ? e.solutionSteps : undefined,
      })),
    };
  }
}

export const assignmentsService = new AssignmentsService();
