import React from 'react';
import './DemoBanner.css';

export const DemoBanner: React.FC = () => {
  return (
    <div className="demo-banner">
      <div className="demo-banner-content">
        <span className="demo-pill">MODO DEMOSTRACIÓN</span>
        <span>
          Esta es la versión inicial del prototipo de Física Fundamental. Los datos mostrados
          corresponden a simulaciones y datos de prueba.
        </span>
      </div>
    </div>
  );
};
