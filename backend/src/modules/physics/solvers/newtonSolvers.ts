import { ExerciseSolverDefinition } from '../types';

/**
 * Resolutor: Segunda Ley de Newton (F = m * a)
 */
export const newtonSegundaLey: ExerciseSolverDefinition = {
  key: 'newton_segunda_ley',
  name: 'Dinámica - Segunda Ley de Newton',
  topicSlug: 'leyes-de-newton',
  description:
    'Calcula la fuerza neta que actúa sobre un cuerpo a partir de su masa y aceleración.',
  requiredVariables: ['masa', 'aceleracion'],
  solve: (vars) => {
    const { masa, aceleracion } = vars;
    if (masa <= 0) {
      throw new Error('La masa debe ser estrictamente mayor que cero.');
    }
    const fuerza = Number((masa * aceleracion).toFixed(2));
    return {
      value: fuerza,
      unit: 'N',
      formattedAnswer: `${fuerza} N`,
      steps: [
        `Segunda Ley de Newton: F = m * a`,
        `Sustitución de variables: F = ${masa} kg * ${aceleracion} m/s²`,
        `Resultado: F = ${fuerza} N`,
      ],
    };
  },
};
