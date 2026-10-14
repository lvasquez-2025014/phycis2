import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Difficulty, TopicDTO } from '@fisica-tareas/shared';
import { exercisesService } from '../../services/exercisesService';
import { assignmentsService } from '../../services/assignmentsService';
import './GenerateAssignmentPage.css';

export const GenerateAssignmentPage: React.FC = () => {
  const navigate = useNavigate();

  const [topics, setTopics] = useState<TopicDTO[]>([]);
  const [title, setTitle] = useState('Hoja de Trabajo 02 - MRU y Cinemática');
  const [topicId, setTopicId] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>('MEDIUM');
  const [exerciseCount, setExerciseCount] = useState(3);
  const [dueDate, setDueDate] = useState('2026-03-15');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Lista de estudiantes demo seleccionables
  const [students, setStudents] = useState([
    { id: 'user-student-01', name: 'Alejandro Gómez (Carné 2025287)', selected: true },
    { id: 'user-student-02', name: 'María Fernanda López (Carné 2025114)', selected: true },
    { id: 'user-student-03', name: 'José Daniel Martínez (Carné 2025092)', selected: true },
  ]);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const list = await exercisesService.getTopics();
        setTopics(list);
        if (list.length > 0) {
          setTopicId(list[0].id);
        }
      } catch (err) {
        console.error('Error al cargar temas:', err);
      }
    };
    fetchTopics();
  }, []);

  const handleStudentToggle = (id: string) => {
    setStudents((prev) => prev.map((s) => (s.id === id ? { ...s, selected: !s.selected } : s)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const selectedStudentIds = students.filter((s) => s.selected).map((s) => s.id);
    if (selectedStudentIds.length === 0) {
      setError('Debes seleccionar al menos un estudiante destinatario.');
      return;
    }

    setLoading(true);

    try {
      const result = await assignmentsService.generateAssignment({
        title,
        topicId,
        difficulty,
        exerciseCount,
        studentIds: selectedStudentIds,
        dueDate,
      });

      navigate(`/assignments/${result.id}`);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : 'Error al generar la tarea con el motor de física',
      );
    } finally {
      setLoading(false);
    }
  };

  const selectedTopic = topics.find((t) => t.id === topicId);

  return (
    <div className="generate-assignment-page">
      <div className="page-header">
        <div>
          <Link to="/teacher" className="back-link">
            ← Volver al Panel Docente
          </Link>
          <h1 className="page-title">Generar Nueva Tarea de Física</h1>
          <p className="page-subtitle">
            El motor de física calculará variables numéricas aleatorias y soluciones exactas para
            cada alumno.
          </p>
        </div>
      </div>

      <div className="generate-grid">
        {/* Formulario Principal */}
        <div className="card form-card">
          <form onSubmit={handleSubmit}>
            {error && <div className="error-box">{error}</div>}

            <div className="form-group">
              <label className="form-label" htmlFor="title">
                Título o Identificador de la Tarea
              </label>
              <input
                id="title"
                type="text"
                className="form-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej. Hoja de Trabajo 01 - MRU"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="topicId">
                Tema de Física Fundamental
              </label>
              <select
                id="topicId"
                className="form-select"
                value={topicId}
                onChange={(e) => setTopicId(e.target.value)}
                required
              >
                {topics.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.gradeLevel})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <div className="form-group flex-1">
                <label className="form-label">Nivel de Dificultad</label>
                <div className="difficulty-selector">
                  {(['EASY', 'MEDIUM', 'HARD'] as Difficulty[]).map((d) => (
                    <button
                      key={d}
                      type="button"
                      className={`diff-btn ${difficulty === d ? 'active' : ''} diff-${d.toLowerCase()}`}
                      onClick={() => setDifficulty(d)}
                    >
                      {d === 'EASY' ? 'Fácil' : d === 'MEDIUM' ? 'Medio' : 'Difícil'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group flex-1">
                <label className="form-label" htmlFor="exerciseCount">
                  Cantidad de Ejercicios
                </label>
                <input
                  id="exerciseCount"
                  type="number"
                  min={1}
                  max={10}
                  className="form-input"
                  value={exerciseCount}
                  onChange={(e) => setExerciseCount(parseInt(e.target.value) || 1)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="dueDate">
                Fecha Límite de Entrega
              </label>
              <input
                id="dueDate"
                type="date"
                className="form-input"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Estudiantes Destinatarios (Asignación)</label>
              <div className="student-checkbox-list">
                {students.map((student) => (
                  <label key={student.id} className="student-checkbox-item">
                    <input
                      type="checkbox"
                      checked={student.selected}
                      onChange={() => handleStudentToggle(student.id)}
                    />
                    <span>{student.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={loading}>
                {loading
                  ? 'Generando versiones aleatorias...'
                  : '⚙ Generar Tarea con Motor de Física'}
              </button>
            </div>
          </form>
        </div>

        {/* Panel Lateral Informativo */}
        <div className="side-info">
          <div className="card">
            <h3 className="side-title">¿Cómo funciona la generación?</h3>
            <ul className="info-list">
              <li>
                <strong>Valores Únicos:</strong> Cada estudiante recibe un enunciado con valores
                numéricos distintos para evitar copias.
              </li>
              <li>
                <strong>Cálculo Determinista:</strong> El resolutor matemático ejecuta las fórmulas
                correspondientes y almacena la respuesta correcta inmutable.
              </li>
              <li>
                <strong>Privacidad:</strong> Los estudiantes no pueden ver las respuestas ni los
                pasos de solución hasta que el docente califique.
              </li>
            </ul>

            {selectedTopic && (
              <div className="topic-preview-box">
                <span className="topic-preview-badge">Tema seleccionado</span>
                <h4>{selectedTopic.name}</h4>
                <p>{selectedTopic.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
