import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './LoginPage.css';

export const LoginPage: React.FC = () => {
  const { login, switchRole } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('profesor@kinal.edu.gt');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email, password);
      if (email.includes('profesor')) {
        navigate('/teacher');
      } else {
        navigate('/student');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = (role: 'TEACHER' | 'STUDENT') => {
    switchRole(role);
    if (role === 'TEACHER') {
      navigate('/teacher');
    } else {
      navigate('/student');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo-circle">⚛</div>
          <h1 className="login-title">Física Fundamental</h1>
          <p className="login-subtitle">Generador de Tareas y Hojas de Trabajo</p>
        </div>

        <div className="demo-notice-box">
          <strong>Acceso de Demostración:</strong>
          <p>Puedes ingresar directamente haciendo clic en uno de los siguientes perfiles:</p>
          <div className="demo-action-buttons">
            <button
              type="button"
              onClick={() => handleQuickLogin('TEACHER')}
              className="btn btn-primary btn-sm demo-btn"
            >
              👨‍🏫 Ingresar como Docente
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('STUDENT')}
              className="btn btn-secondary btn-sm demo-btn"
            >
              👨‍🎓 Ingresar como Estudiante
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="login-error-alert">{error}</div>}

          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Correo Electrónico
            </label>
            <input
              id="email"
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="profesor@kinal.edu.gt"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? 'Accediendo...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="login-footer">
          <p className="text-muted">Colegio Kinal • Física Fundamental Diversificado</p>
        </div>
      </div>
    </div>
  );
};
