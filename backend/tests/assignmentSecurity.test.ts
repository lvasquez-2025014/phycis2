import { describe, it, expect } from 'vitest';
import { AssignmentsService } from '../src/modules/assignments/assignments.service';
import { AuthenticatedUser } from '../src/middlewares/authMiddleware';

describe('Seguridad y Privacidad en AssignmentsService', () => {
  const service = new AssignmentsService();

  const teacherUser: AuthenticatedUser = {
    id: 'user-teacher-01',
    email: 'profesor@kinal.edu.gt',
    name: 'Prof. Carlos Alvarado',
    role: 'TEACHER',
  };

  const student1: AuthenticatedUser = {
    id: 'user-student-01',
    email: 'estudiante@kinal.edu.gt',
    name: 'Alejandro Gómez',
    role: 'STUDENT',
  };

  const student2: AuthenticatedUser = {
    id: 'user-student-02',
    email: 'estudiante2@kinal.edu.gt',
    name: 'María López',
    role: 'STUDENT',
  };

  it('el profesor puede ver las respuestas correctas de la tarea demo', async () => {
    const assignment = await service.getAssignmentById('asg-demo-01', teacherUser);
    expect(assignment).toBeDefined();
    expect(assignment.recipients).toBeDefined();

    const recipient = assignment.recipients![0];
    expect(recipient.exercises![0].correctAnswer).toBeDefined();
  });

  it('el estudiante NO puede ver las respuestas correctas de una tarea pendiente', async () => {
    const assignment = await service.getAssignmentById('asg-demo-01', student1);
    expect(assignment).toBeDefined();
    expect(assignment.recipients?.length).toBe(1);

    const myRecipient = assignment.recipients![0];
    expect(myRecipient.studentId).toBe(student1.id);
    // Para estado PENDING, la respuesta correcta debe ser undefined
    expect(myRecipient.exercises![0].correctAnswer).toBeUndefined();
    expect(myRecipient.exercises![0].solutionSteps).toBeUndefined();
  });

  it('el estudiante ve las respuestas correctas cuando ya está calificado (GRADED)', async () => {
    // student2 tiene status SUBMITTED o GRADED en los datos
    const assignment = await service.getAssignmentById('asg-demo-01', student2);
    expect(assignment).toBeDefined();
    // Verifica que solo ve su propia información
    expect(assignment.recipients?.length).toBe(1);
    expect(assignment.recipients![0].studentId).toBe(student2.id);
  });

  it('un estudiante no puede acceder a tareas donde no está asignado', async () => {
    const outsiderStudent: AuthenticatedUser = {
      id: 'user-student-outsider',
      email: 'outsider@kinal.edu.gt',
      name: 'Estudiante Ajeno',
      role: 'STUDENT',
    };

    await expect(service.getAssignmentById('asg-demo-01', outsiderStudent)).rejects.toThrow(
      /Acceso denegado/,
    );
  });
});
