import { PhysicsSolverRegistry } from './registry';
import {
  mruCalcularVelocidad,
  mruCalcularDistancia,
  mruCalcularTiempo,
} from './solvers/mruSolvers';
import { mruaVelocidadFinal, mruaDistancia } from './solvers/mruaSolvers';
import { newtonSegundaLey } from './solvers/newtonSolvers';

export * from './types';
export * from './registry';

/**
 * Instancia singleton del registro de resolutores de física
 */
export const physicsRegistry = new PhysicsSolverRegistry();

// Registro estático y seguro de funciones matemáticas
physicsRegistry.register(mruCalcularVelocidad);
physicsRegistry.register(mruCalcularDistancia);
physicsRegistry.register(mruCalcularTiempo);
physicsRegistry.register(mruaVelocidadFinal);
physicsRegistry.register(mruaDistancia);
physicsRegistry.register(newtonSegundaLey);
