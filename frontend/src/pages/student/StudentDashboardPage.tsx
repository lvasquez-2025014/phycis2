import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AssignmentDTO } from '@fisica-tareas/shared';
import { useAuth } from '../../hooks/useAuth';
import { assignmentsService } from '../../services/assignmentsService';
import './StudentDashboardPage.css';

export const StudentDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState<AssignmentDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyAssignments = async () => {
      try {
        const list = await assignmentsService.getAssignments();
        setAssignments(list);
      } catch (err) {
        console.error('Error al cargar tareas asignadas al estudiante:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyAssignments();
  }, [user.id]);

  return (
    <div className="student-dashboard">
      <div className="student-header-box">
        <div className="student-avatar-circle">🎓</div>
        <div className="student-info">
          <h1 className="student-name-title">{user.name}</h1>
          <p className="student-meta">Estudiante • 4to Diversificado • Colegio Kinal</p>
        </div>
        <div className="student-stats">
          <div className="stat-item">
            <span className="stat-number">{assignments.length}</span>
            <span className="stat-label">Tareas Asignadas</span>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Mis Tareas de Física</h2>
          <span className="badge badge-student">Versión Personalizada</span>
        </div>

        {loading ? (
          <p className="loading-text">Cargando tareas asignadas...</p>
        ) : assignments.length === 0 ? (
          <div className="empty-state">
            <p>No tienes tareas pendientes asignadas actualmente.</p>
          </div>
        ) : (
          <div className="assignments-student-grid">
            {assignments.map((asg) => {
              const myRecipient =
                asg.recipients?.find((r) => r.studentId === user.id) || asg.recipients?.[0];
              const isSubmitted =
                myRecipient?.status === 'SUBMITTED' || myRecipient?.status === 'GRADED';

              return (
                <div key={asg.id} className="student-asg-card">
                  <div className="asg-card-top">
                    <span className="asg-topic-badge">{asg.topicName || 'Física Fundamental'}</span>
                    <span
                      className={`status-pill ${isSubmitted ? 'status-submitted' : 'status-pending'}`}
                    >
                      {isSubmitted ? 'Completada' : 'Pendiente'}
                    </span>
                  </div>

                  <h3 className="asg-title">{asg.title}</h3>
                  <p className="asg-teacher">
                    Docente: {asg.teacherName || 'Prof. Carlos Alvarado'}
                  </p>

                  <div className="asg-meta-row">
                    <span className="asg-meta-item">
                      📅 Entrega:{' '}
                      {asg.dueDate ? new Date(asg.dueDate).toLocaleDateString() : 'Sin fecha'}
                    </span>
                    <span className="asg-meta-item">
                      🔢 {asg.exerciseCount || myRecipient?.exercises?.length || 2} Ejercicios
                    </span>
                  </div>

                  <div className="asg-card-footer">
                    <Link
                      to={`/assignments/${asg.id}`}
                      className="btn btn-primary btn-sm btn-block"
                    >
                      {isSubmitted ? 'Ver Resultados' : 'Resolver Tarea'}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
