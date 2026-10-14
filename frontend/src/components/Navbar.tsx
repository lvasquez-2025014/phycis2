import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './Navbar.css';

export const Navbar: React.FC = () => {
  const { user, switchRole, logout } = useAuth();
  const navigate = useNavigate();

  const isTeacher = user.role === 'TEACHER';

  const handleRoleToggle = () => {
    const nextRole = isTeacher ? 'STUDENT' : 'TEACHER';
    switchRole(nextRole);
    if (nextRole === 'TEACHER') {
      navigate('/teacher');
    } else {
      navigate('/student');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="container navbar-container">
        <div className="navbar-brand">
          <Link to={isTeacher ? '/teacher' : '/student'} className="brand-logo">
            <span className="brand-symbol">⚛</span>
            <span className="brand-text">Física Fundamental</span>
          </Link>
          <span className="brand-badge">Kinal Diversificado</span>
        </div>

        <nav className="navbar-nav">
          {isTeacher ? (
            <>
              <Link to="/teacher" className="nav-link">
                Panel Docente
              </Link>
              <Link to="/teacher/generate" className="nav-link nav-btn-highlight">
                + Generar Tarea
              </Link>
            </>
          ) : (
            <>
              <Link to="/student" className="nav-link">
                Mis Tareas Asignadas
              </Link>
            </>
          )}
        </nav>

        <div className="navbar-user">
          <div className="user-profile-info">
            <span className="user-name">{user.name}</span>
            <span className={`badge ${isTeacher ? 'badge-teacher' : 'badge-student'}`}>
              {isTeacher ? 'Docente' : 'Estudiante'}
            </span>
          </div>

          <button
            onClick={handleRoleToggle}
            className="btn btn-secondary btn-sm switch-btn"
            title="Cambiar entre perfil de Docente y Estudiante para probar ambas experiencias"
          >
            Cambiar a {isTeacher ? 'Estudiante' : 'Docente'}
          </button>

          <button onClick={handleLogout} className="btn-logout" title="Cerrar sesión">
            Salir
          </button>
        </div>
      </div>
    </header>
  );
};
