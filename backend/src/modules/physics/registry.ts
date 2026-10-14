import { ExerciseSolverDefinition, SolverOutput } from './types';

/**
 * Registro en memoria de funciones de resolución de ejercicios de física
 * Permite registrar y ejecutar resolutores de manera segura, tipada y sin eval().
 */
export class PhysicsSolverRegistry {
  private solvers = new Map<string, ExerciseSolverDefinition>();

  /**
   * Registra una función matemática de resolución
   */
  public register(definition: ExerciseSolverDefinition): void {
    if (this.solvers.has(definition.key)) {
      throw new Error(`El resolutor de física con clave '${definition.key}' ya está registrado.`);
    }
    this.solvers.set(definition.key, definition);
  }

  /**
   * Obtiene la definición de un resolutor por su clave
   */
  public get(key: string): ExerciseSolverDefinition | undefined {
    return this.solvers.get(key);
  }

  /**
   * Comprueba si una clave de resolutor existe
   */
  public has(key: string): boolean {
    return this.solvers.has(key);
  }

  /**
   * Resuelve un ejercicio usando los valores numéricos dados
   */
  public solve(key: string, variables: Record<string, number>): SolverOutput {
    const solver = this.get(key);
    if (!solver) {
      throw new Error(`No existe un resolutor registrado para la clave: '${key}'`);
    }

    // Validar que todas las variables requeridas estén presentes
    for (const varName of solver.requiredVariables) {
      if (typeof variables[varName] !== 'number' || isNaN(variables[varName])) {
        throw new Error(
          `Variable requerida faltante o inválida para el resolutor '${key}': '${varName}'`,
        );
      }
    }

    return solver.solve(variables);
  }

  /**
   * Lista todos los resolutores registrados
   */
  public list(): Omit<ExerciseSolverDefinition, 'solve'>[] {
    return Array.from(this.solvers.values()).map(
      ({ key, name, topicSlug, description, requiredVariables }) => ({
        key,
        name,
        topicSlug,
        description,
        requiredVariables,
      }),
    );
  }
}
