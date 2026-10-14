import { describe, it, expect } from 'vitest';
import { PhysicsSolverRegistry } from '../src/modules/physics/registry';
import {
  mruCalcularVelocidad,
  mruCalcularDistancia,
  mruCalcularTiempo,
} from '../src/modules/physics/solvers/mruSolvers';
import { newtonSegundaLey } from '../src/modules/physics/solvers/newtonSolvers';

describe('PhysicsSolverRegistry & Resolutores de Cinemática y Dinámica', () => {
  const registry = new PhysicsSolverRegistry();
  registry.register(mruCalcularVelocidad);
  registry.register(mruCalcularDistancia);
  registry.register(mruCalcularTiempo);
  registry.register(newtonSegundaLey);

  it('debe registrar y recuperar los resolutores correctamente', () => {
    expect(registry.has('mru_calcular_velocidad')).toBe(true);
    expect(registry.has('newton_segunda_ley')).toBe(true);
    expect(registry.has('clave_inexistente')).toBe(false);
  });

  it('debe calcular la velocidad en MRU correctamente (v = d / t)', () => {
    const result = registry.solve('mru_calcular_velocidad', {
      distancia: 500,
      tiempo: 25,
    });

    expect(result.value).toBe(20);
    expect(result.unit).toBe('m/s');
    expect(result.formattedAnswer).toBe('20 m/s');
    expect(result.steps.length).toBeGreaterThan(0);
  });

  it('debe calcular la distancia en MRU correctamente (d = v * t)', () => {
    const result = registry.solve('mru_calcular_distancia', {
      velocidad: 15,
      tiempo: 10,
    });

    expect(result.value).toBe(150);
    expect(result.unit).toBe('m');
  });

  it('debe calcular el tiempo en MRU correctamente (t = d / v)', () => {
    const result = registry.solve('mru_calcular_tiempo', {
      distancia: 300,
      velocidad: 30,
    });

    expect(result.value).toBe(10);
    expect(result.unit).toBe('s');
  });

  it('debe calcular la fuerza en la Segunda Ley de Newton (F = m * a)', () => {
    const result = registry.solve('newton_segunda_ley', {
      masa: 12,
      aceleracion: 2.5,
    });

    expect(result.value).toBe(30);
    expect(result.unit).toBe('N');
  });

  it('debe arrojar error si falta una variable requerida', () => {
    expect(() => {
      registry.solve('mru_calcular_velocidad', {
        distancia: 500,
        // Falta tiempo
      });
    }).toThrow(/Variable requerida faltante/);
  });

  it('debe arrojar error al dividir por tiempo cero o negativo en MRU', () => {
    expect(() => {
      registry.solve('mru_calcular_velocidad', {
        distancia: 500,
        tiempo: 0,
      });
    }).toThrow(/El tiempo debe ser mayor que cero/);
  });
});
