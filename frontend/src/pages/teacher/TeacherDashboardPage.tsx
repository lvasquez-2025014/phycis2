import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AssignmentDTO, ExerciseTemplateDTO, TopicDTO } from '@fisica-tareas/shared';
import { assignmentsService } from '../../services/assignmentsService';
import { exercisesService } from '../../services/exercisesService';
import './TeacherDashboardPage.css';

export const TeacherDashboardPage: React.FC = () => {
  const [assignments, setAssignments] = useState<AssignmentDTO[]>([]);
  const [exercises, setExercises] = useState<ExerciseTemplateDTO[]>([]);
  const [topics, setTopics] = useState<TopicDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [asgs, exs, tops] = await Promise.all([
          assignmentsService.getAssignments(),
          exercisesService.getExercises(),
          exercisesService.getTopics(),
        ]);
        setAssignments(asgs);
        setExercises(exs);
        setTopics(tops);
      } catch (err) {
        console.error('Error al cargar datos del panel docente:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="teacher-dashboard">
      <div className="dashboard-header-bar">
        <div>
          <h1 className="page-title">Panel del Docente</h1>
          <p className="page-subtitle">
            Gestión de ejercicios de física, generación aleatoria y seguimiento de tareas
          </p>
        </div>
        <Link to="/teacher/generate" className="btn btn-primary">
          <span>+</span> Generar Nueva Tarea
        </Link>
      </div>

      {/* Tarjetas de Accesos Rápidos */}
      <div className="quick-access-grid">
        <div className="quick-card">
          <div className="quick-card-icon">📚</div>
          <div className="quick-card-info">
            <span className="quick-card-number">{topics.length}</span>
            <span className="quick-card-label">Temas Registrados</span>
          </div>
        </div>

        <div className="quick-card">
          <div className="quick-card-icon">⚡</div>
          <div className="quick-card-info">
            <span className="quick-card-number">{exercises.length}</span>
            <span className="quick-card-label">Plantillas de Ejercicios</span>
          </div>
        </div>

        <div className="quick-card">
          <div className="quick-card-icon">📝</div>
          <div className="quick-card-info">
            <span className="quick-card-number">{assignments.length}</span>
            <span className="quick-card-label">Tareas Generadas</span>
          </div>
        </div>
      </div>

      {/* Historial de Tareas */}
      <div className="card dashboard-section">
        <div className="card-header">
          <h2 className="card-title">Historial de Tareas Asignadas</h2>
          <span className="badge badge-teacher">Persistencia Inmutable</span>
        </div>

        {loading ? (
          <p className="loading-text">Cargando tareas...</p>
        ) : assignments.length === 0 ? (
          <div className="empty-state">
            <p>Aún no has generado ninguna tarea.</p>
            <Link to="/teacher/generate" className="btn btn-primary btn-sm">
              Generar la primera tarea
            </Link>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Título de la Tarea</th>
                  <th>Tema</th>
                  <th>Dificultad</th>
                  <th>Estudiantes</th>
                  <th>Fecha de Creación</th>
                  <th>Estado</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {assignments.map((asg) => (
                  <tr key={asg.id}>
                    <td>
                      <strong>{asg.title}</strong>
                    </td>
                    <td>{asg.topicName || 'Física'}</td>
                    <td>
                      <span className={`badge badge-${asg.difficulty.toLowerCase()}`}>
                        {asg.difficulty}
                      </span>
                    </td>
                    <td>{asg.recipients?.length || 1} asignados</td>
                    <td>{new Date(asg.createdAt).toLocaleDateString()}</td>
                    <td>
                      <span className="status-pill status-published">Publicada</span>
                    </td>
                    <td>
                      <Link to={`/assignments/${asg.id}`} className="btn btn-secondary btn-sm">
                        Ver Ejercicios
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Banco de Plantillas de Ejercicios */}
      <div className="card dashboard-section">
        <div className="card-header">
          <h2 className="card-title">Banco de Plantillas y Fórmulas Matemáticas</h2>
          <span className="text-muted" style={{ fontSize: '0.85rem' }}>
            Desacoplado de base de datos • Ejecución matemática pura
          </span>
        </div>

        <div className="exercise-templates-list">
          {exercises.map((ex) => (
            <div key={ex.id} className="exercise-template-item">
              <div className="template-top">
                <span className="template-title">{ex.title}</span>
                <span className="template-solver-tag">Resolutor: {ex.solverKey}</span>
              </div>
              <p className="template-statement">{ex.statementTemplate}</p>
              <div className="template-variables">
                <span className="vars-label">Variables aleatorias:</span>
                {ex.variablesSchema.map((v) => (
                  <span key={v.name} className="variable-pill">
                    {v.name} ({v.min} a {v.max} {v.unit})
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
