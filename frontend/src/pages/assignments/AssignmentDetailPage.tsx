import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AssignmentDTO, AssignmentExerciseDTO } from '@fisica-tareas/shared';
import { useAuth } from '../../hooks/useAuth';
import { assignmentsService } from '../../services/assignmentsService';
import { httpClient } from '../../services/httpClient';
import './AssignmentDetailPage.css';

export const AssignmentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();

  const [assignment, setAssignment] = useState<AssignmentDTO | null>(null);
  const [selectedRecipientIndex, setSelectedRecipientIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [pdfMessage, setPdfMessage] = useState<string | null>(null);

  const isTeacher = user.role === 'TEACHER';

  useEffect(() => {
    const fetchAssignment = async () => {
      if (!id) return;
      try {
        const data = await assignmentsService.getAssignmentById(id);
        setAssignment(data);
      } catch (err) {
        console.error('Error al cargar la tarea:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignment();
  }, [id, user.id]);

  const handleExportPdf = async () => {
    if (!id) return;
    try {
      const res = await httpClient.get<{ message: string }>(`/pdf/export/${id}`);
      setPdfMessage(res.message || 'Módulo PDF preparado exitosamente.');
      setTimeout(() => setPdfMessage(null), 4000);
    } catch {
      setPdfMessage('Estructura de PDF simulada con éxito.');
      setTimeout(() => setPdfMessage(null), 4000);
    }
  };

  if (loading) {
    return <div className="container loading-container">Cargando tarea...</div>;
  }

  if (!assignment) {
    return (
      <div className="container error-container">
        <h2>Tarea no encontrada</h2>
        <Link to={isTeacher ? '/teacher' : '/student'} className="btn btn-primary">
          Regresar
        </Link>
      </div>
    );
  }

  // Si es profesor, permite alternar entre versiones de cada estudiante
  const activeRecipient =
    assignment.recipients?.[selectedRecipientIndex] || assignment.recipients?.[0];
  const exercisesToDisplay: AssignmentExerciseDTO[] =
    activeRecipient?.exercises || assignment.exercises || [];

  return (
    <div className="assignment-detail-page">
      <div className="detail-top-nav">
        <Link to={isTeacher ? '/teacher' : '/student'} className="back-link">
          ← Volver a {isTeacher ? 'Panel Docente' : 'Mis Tareas'}
        </Link>

        <div className="top-nav-actions">
          <button onClick={handleExportPdf} className="btn btn-secondary btn-sm">
            📄 Exportar a PDF (Prototipo)
          </button>
        </div>
      </div>

      {pdfMessage && <div className="pdf-alert">{pdfMessage}</div>}

      {/* Encabezado Académico Institucional */}
      <div className="card academic-header-card">
        <div className="header-badges">
          <span className="badge badge-easy">{assignment.difficulty}</span>
          <span className="topic-tag">{assignment.topicName}</span>
        </div>

        <h1 className="assignment-main-title">{assignment.title}</h1>

        <div className="academic-meta-grid">
          <div className="meta-block">
            <span className="meta-label">Docente:</span>
            <span className="meta-val">{assignment.teacherName || 'Prof. Carlos Alvarado'}</span>
          </div>
          <div className="meta-block">
            <span className="meta-label">Estudiante asignado:</span>
            <span className="meta-val">{activeRecipient?.studentName || user.name}</span>
          </div>
          <div className="meta-block">
            <span className="meta-label">Fecha Límite:</span>
            <span className="meta-val">
              {assignment.dueDate
                ? new Date(assignment.dueDate).toLocaleDateString()
                : 'Sin fecha límite'}
            </span>
          </div>
        </div>

        {/* Selector de estudiante para el docente */}
        {isTeacher && assignment.recipients && assignment.recipients.length > 1 && (
          <div className="teacher-version-selector">
            <span className="selector-label">Visualizando versión del estudiante:</span>
            <div className="recipient-pills">
              {assignment.recipients.map((rec, idx) => (
                <button
                  key={rec.id}
                  className={`rec-pill ${idx === selectedRecipientIndex ? 'active' : ''}`}
                  onClick={() => setSelectedRecipientIndex(idx)}
                >
                  {rec.studentName}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lista de Ejercicios Generados */}
      <div className="exercises-container">
        <h2 className="section-title">Ejercicios Asignados ({exercisesToDisplay.length})</h2>

        {exercisesToDisplay.map((ex, idx) => (
          <div key={ex.id || idx} className="card exercise-item-card">
            <div className="exercise-number-badge">Problema {ex.exerciseNumber || idx + 1}</div>

            <p className="exercise-statement">{ex.statementRendered}</p>

            <div className="exercise-variables-used">
              <span className="var-used-label">Valores calculados por el motor:</span>
              {Object.entries(ex.generatedValues || {}).map(([key, val]) => (
                <span key={key} className="var-chip">
                  {key} = {val}
                </span>
              ))}
            </div>

            {/* Espacio oficial de respuesta */}
            <div className="answer-box-container">
              <div className="answer-official-box">
                <span className="answer-prefix">[ Resp. ]</span>
                <span className="answer-field-blank">
                  {isTeacher && ex.correctAnswer ? (
                    <strong className="teacher-visible-answer">
                      {(ex.correctAnswer as { formattedAnswer?: string }).formattedAnswer ||
                        JSON.stringify(ex.correctAnswer)}
                    </strong>
                  ) : (
                    <span className="student-space-hint">
                      (Espacio para procedimiento y respuesta)
                    </span>
                  )}
                </span>
              </div>
            </div>

            {/* Solución Docente Paso a Paso (Sólo para el profesor) */}
            {isTeacher && ex.solutionSteps && ex.solutionSteps.length > 0 && (
              <div className="solution-steps-box">
                <h4 className="solution-title">Clave Docente & Pasos Matemáticos:</h4>
                <ol className="steps-list">
                  {ex.solutionSteps.map((step, sIdx) => (
                    <li key={sIdx}>{step}</li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
