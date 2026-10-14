import { ExerciseSolverDefinition } from '../types';

/**
 * Resolutor: Calcular velocidad en MRU (v = d / t)
 */
export const mruCalcularVelocidad: ExerciseSolverDefinition = {
  key: 'mru_calcular_velocidad',
  name: 'MRU - Cálculo de Velocidad',
  topicSlug: 'movimiento-rectilineo-uniforme',
  description:
    'Calcula la velocidad constante a partir de la distancia recorrida y el tiempo transcurrido.',
  requiredVariables: ['distancia', 'tiempo'],
  solve: (vars) => {
    const { distancia, tiempo } = vars;
    if (tiempo <= 0) {
      throw new Error('El tiempo debe ser mayor que cero.');
    }
    const velocidad = Number((distancia / tiempo).toFixed(2));
    return {
      value: velocidad,
      unit: 'm/s',
      formattedAnswer: `${velocidad} m/s`,
      steps: [
        `Fórmula fundamental del MRU: v = d / t`,
        `Sustitución de valores: v = ${distancia} m / ${tiempo} s`,
        `Resultado: v = ${velocidad} m/s`,
      ],
    };
  },
};

/**
 * Resolutor: Calcular distancia en MRU (d = v * t)
 */
export const mruCalcularDistancia: ExerciseSolverDefinition = {
  key: 'mru_calcular_distancia',
  name: 'MRU - Cálculo de Distancia',
  topicSlug: 'movimiento-rectilineo-uniforme',
  description: 'Calcula la distancia recorrida a partir de velocidad constante y tiempo.',
  requiredVariables: ['velocidad', 'tiempo'],
  solve: (vars) => {
    const { velocidad, tiempo } = vars;
    const distancia = Number((velocidad * tiempo).toFixed(2));
    return {
      value: distancia,
      unit: 'm',
      formattedAnswer: `${distancia} m`,
      steps: [
        `Fórmula de distancia en MRU: d = v * t`,
        `Sustitución: d = ${velocidad} m/s * ${tiempo} s`,
        `Resultado: d = ${distancia} m`,
      ],
    };
  },
};

/**
 * Resolutor: Calcular tiempo en MRU (t = d / v)
 */
export const mruCalcularTiempo: ExerciseSolverDefinition = {
  key: 'mru_calcular_tiempo',
  name: 'MRU - Cálculo de Tiempo',
  topicSlug: 'movimiento-rectilineo-uniforme',
  description: 'Calcula el tiempo necesario para recorrer una distancia a velocidad constante.',
  requiredVariables: ['distancia', 'velocidad'],
  solve: (vars) => {
    const { distancia, velocidad } = vars;
    if (velocidad <= 0) {
      throw new Error('La velocidad debe ser mayor que cero.');
    }
    const tiempo = Number((distancia / velocidad).toFixed(2));
    return {
      value: tiempo,
      unit: 's',
      formattedAnswer: `${tiempo} s`,
      steps: [
        `Despeje del tiempo en MRU: t = d / v`,
        `Sustitución: t = ${distancia} m / ${velocidad} m/s`,
        `Resultado: t = ${tiempo} s`,
      ],
    };
  },
};
