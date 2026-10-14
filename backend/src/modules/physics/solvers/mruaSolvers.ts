import { ExerciseSolverDefinition } from '../types';

/**
 * Resolutor: Velocidad final en MRUA (vf = v0 + a * t)
 */
export const mruaVelocidadFinal: ExerciseSolverDefinition = {
  key: 'mrua_velocidad_final',
  name: 'MRUA - Velocidad Final',
  topicSlug: 'movimiento-rectilineo-uniformemente-acelerado',
  description: 'Calcula la velocidad final de un móvil que acelera uniformemente.',
  requiredVariables: ['v0', 'aceleracion', 'tiempo'],
  solve: (vars) => {
    const { v0, aceleracion, tiempo } = vars;
    if (tiempo < 0) {
      throw new Error('El tiempo no puede ser negativo.');
    }
    const vf = Number((v0 + aceleracion * tiempo).toFixed(2));
    return {
      value: vf,
      unit: 'm/s',
      formattedAnswer: `${vf} m/s`,
      steps: [
        `Ecuación de la velocidad final: vf = v0 + a * t`,
        `Sustitución: vf = ${v0} m/s + (${aceleracion} m/s²) * (${tiempo} s)`,
        `Resultado: vf = ${vf} m/s`,
      ],
    };
  },
};

/**
 * Resolutor: Distancia recorrida en MRUA (d = v0 * t + 0.5 * a * t^2)
 */
export const mruaDistancia: ExerciseSolverDefinition = {
  key: 'mrua_distancia',
  name: 'MRUA - Distancia Recorrida',
  topicSlug: 'movimiento-rectilineo-uniformemente-acelerado',
  description: 'Calcula la distancia recorrida bajo aceleración constante.',
  requiredVariables: ['v0', 'aceleracion', 'tiempo'],
  solve: (vars) => {
    const { v0, aceleracion, tiempo } = vars;
    if (tiempo < 0) {
      throw new Error('El tiempo no puede ser negativo.');
    }
    const d = Number((v0 * tiempo + 0.5 * aceleracion * Math.pow(tiempo, 2)).toFixed(2));
    return {
      value: d,
      unit: 'm',
      formattedAnswer: `${d} m`,
      steps: [
        `Ecuación de posición: d = v0 * t + (1/2) * a * t²`,
        `Sustitución: d = (${v0} m/s * ${tiempo} s) + 0.5 * (${aceleracion} m/s²) * (${tiempo} s)²`,
        `Resultado: d = ${d} m`,
      ],
    };
  },
};
