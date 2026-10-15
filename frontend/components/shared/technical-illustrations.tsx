"use client"

import React from "react"
import { cn } from "@/lib/utils"

/**
 * Ilustración técnica de Cinemática: Trayectoria parabólica y vectores (v₀, g, θ)
 * Diseñada para el encabezado editorial del Banco de ejercicios.
 */
export function ParabolicTrajectoryIllustration({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center rounded-lg border border-border bg-white px-3 py-2 shadow-2xs select-none",
        className,
      )}
      title="Cinemática · Tiro Parabólico: y(x) = x·tan(θ) - (g·x²)/(2·v₀²·cos²(θ))"
    >
      <svg
        width="180"
        height="64"
        viewBox="0 0 180 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        {/* Retícula técnica milimétrica */}
        <defs>
          <pattern id="grid-parabola" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M 8 0 L 0 0 0 8" fill="none" stroke="#D5CEBF" strokeWidth="0.5" strokeDasharray="1 2" opacity="0.55" />
          </pattern>
        </defs>
        <rect width="180" height="64" fill="url(#grid-parabola)" rx="4" />

        {/* Ejes coordenados X / Y */}
        <line x1="16" y1="52" x2="168" y2="52" stroke="#7077A1" strokeWidth="1" />
        <line x1="16" y1="52" x2="16" y2="8" stroke="#7077A1" strokeWidth="1" />
        <polygon points="168,52 163,49.5 163,54.5" fill="#7077A1" />
        <polygon points="16,8 13.5,13 18.5,13" fill="#7077A1" />
        <text x="170" y="55" fill="#7077A1" fontSize="8" fontFamily="monospace" fontWeight="600">x</text>
        <text x="13" y="6" fill="#7077A1" fontSize="8" fontFamily="monospace" fontWeight="600">y</text>

        {/* Marcas de cota en ejes */}
        <line x1="56" y1="50" x2="56" y2="54" stroke="#7077A1" strokeWidth="0.75" />
        <line x1="96" y1="50" x2="96" y2="54" stroke="#7077A1" strokeWidth="0.75" />
        <line x1="136" y1="50" x2="136" y2="54" stroke="#7077A1" strokeWidth="0.75" />

        {/* Trayectoria Parabólica punteada */}
        <path d="M 16 52 Q 78 4, 148 52" fill="none" stroke="#2D3250" strokeWidth="1.5" strokeDasharray="3 2" />

        {/* Vector de velocidad inicial v₀ en color de acento #F6B17A */}
        <line x1="16" y1="52" x2="54" y2="20" stroke="#F6B17A" strokeWidth="2" strokeLinecap="round" />
        <polygon points="54,20 45,21 48,27" fill="#F6B17A" />
        <text x="44" y="16" fill="#2D3250" fontSize="8.5" fontFamily="serif" fontStyle="italic" fontWeight="bold">v⃗₀</text>

        {/* Arco de ángulo de tiro θ */}
        <path d="M 32 52 A 16 16 0 0 0 28 41" fill="none" stroke="#F6B17A" strokeWidth="1" />
        <text x="33" y="47" fill="#7077A1" fontSize="7.5" fontFamily="serif">θ</text>

        {/* Vector aceleración de la gravedad g */}
        <line x1="102" y1="16" x2="102" y2="34" stroke="#7077A1" strokeWidth="1.25" strokeLinecap="round" />
        <polygon points="102,34 99.5,29 104.5,29" fill="#7077A1" />
        <text x="106" y="27" fill="#7077A1" fontSize="7.5" fontFamily="monospace">g⃗</text>

        {/* Vértice H_max */}
        <circle cx="82" cy="28" r="2" fill="#2D3250" />
        <text x="76" y="23" fill="#7077A1" fontSize="7" fontFamily="monospace">H_max</text>
      </svg>
    </div>
  )
}

/**
 * Ilustración para Estado Vacío: Péndulo simple en reposo y transportador técnico
 */
export function ScientificPendulumIllustration({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center select-none", className)}>
      <svg width="120" height="90" viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid-pendulum" width="6" height="6" patternUnits="userSpaceOnUse">
            <path d="M 6 0 L 0 0 0 6" fill="none" stroke="#D5CEBF" strokeWidth="0.5" strokeDasharray="1 1" opacity="0.6" />
          </pattern>
        </defs>
        <rect x="10" y="10" width="100" height="70" fill="url(#grid-pendulum)" rx="4" />

        {/* Soporte fijo */}
        <line x1="40" y1="18" x2="80" y2="18" stroke="#2D3250" strokeWidth="2" strokeLinecap="round" />
        <line x1="45" y1="14" x2="50" y2="18" stroke="#7077A1" strokeWidth="1" />
        <line x1="55" y1="14" x2="60" y2="18" stroke="#7077A1" strokeWidth="1" />
        <line x1="65" y1="14" x2="70" y2="18" stroke="#7077A1" strokeWidth="1" />
        <line x1="75" y1="14" x2="80" y2="18" stroke="#7077A1" strokeWidth="1" />

        {/* Punto de pivote */}
        <circle cx="60" cy="18" r="2.5" fill="#2D3250" />

        {/* Cuerda en oscilación con ángulo θ */}
        <line x1="60" y1="18" x2="84" y2="58" stroke="#F6B17A" strokeWidth="1.5" strokeDasharray="2 1" />

        {/* Masa suspendida m */}
        <circle cx="84" cy="58" r="7" fill="#2D3250" stroke="#F6B17A" strokeWidth="1.5" />
        <text x="81.5" y="61" fill="#FFFFFF" fontSize="7" fontFamily="serif" fontStyle="italic">m</text>

        {/* Posición vertical de equilibrio (línea guía) */}
        <line x1="60" y1="18" x2="60" y2="68" stroke="#7077A1" strokeWidth="1" strokeDasharray="2 2" />

        {/* Arco de oscilación */}
        <path d="M 60 42 A 24 24 0 0 1 72 38" fill="none" stroke="#7077A1" strokeWidth="1" />
        <text x="64" y="34" fill="#7077A1" fontSize="7" fontFamily="serif">θ</text>

        {/* Vector de fuerza restauradora / gravedad */}
        <line x1="84" y1="65" x2="84" y2="78" stroke="#7077A1" strokeWidth="1.25" />
        <polygon points="84,78 82,74 86,74" fill="#7077A1" />
        <text x="89" y="76" fill="#7077A1" fontSize="7" fontFamily="monospace">mg</text>
      </svg>
    </div>
  )
}

/**
 * Ilustración técnica de Oscilador Armónico / Onda Senoidal (para Dashboard)
 */
export function HarmonicWaveIllustration({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center rounded-lg border border-border bg-white px-3 py-2 shadow-2xs select-none",
        className,
      )}
      title="Mecánica Ondulatoria · Movimiento Armónico Simple: x(t) = A·cos(ωt + φ)"
    >
      <svg width="170" height="60" viewBox="0 0 170 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid-wave" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M 8 0 L 0 0 0 8" fill="none" stroke="#D5CEBF" strokeWidth="0.5" strokeDasharray="1 2" opacity="0.5" />
          </pattern>
        </defs>
        <rect width="170" height="60" fill="url(#grid-wave)" rx="4" />

        {/* Eje central de tiempo t */}
        <line x1="12" y1="30" x2="160" y2="30" stroke="#7077A1" strokeWidth="1" />
        <line x1="12" y1="50" x2="12" y2="10" stroke="#7077A1" strokeWidth="1" />
        <polygon points="160,30 156,28 156,32" fill="#7077A1" />
        <polygon points="12,10 10,14 14,14" fill="#7077A1" />
        <text x="162" y="33" fill="#7077A1" fontSize="7.5" fontFamily="monospace">t</text>
        <text x="9" y="8" fill="#7077A1" fontSize="7.5" fontFamily="serif" fontStyle="italic">x</text>

        {/* Límites de Amplitud +A y -A */}
        <line x1="12" y1="16" x2="154" y2="16" stroke="#D5CEBF" strokeWidth="0.75" strokeDasharray="2 2" />
        <line x1="12" y1="44" x2="154" y2="44" stroke="#D5CEBF" strokeWidth="0.75" strokeDasharray="2 2" />
        <text x="1" y="19" fill="#7077A1" fontSize="6.5" fontFamily="monospace">+A</text>
        <text x="2" y="47" fill="#7077A1" fontSize="6.5" fontFamily="monospace">-A</text>

        {/* Curva sinusoidal armónica */}
        <path
          d="M 12 30 Q 30 2, 48 30 T 84 30 T 120 30 T 154 30"
          fill="none"
          stroke="#2D3250"
          strokeWidth="1.5"
        />

        {/* Período T */}
        <line x1="48" y1="30" x2="120" y2="30" stroke="#F6B17A" strokeWidth="1.5" />
        <circle cx="48" cy="30" r="2" fill="#F6B17A" />
        <circle cx="120" cy="30" r="2" fill="#F6B17A" />
        <text x="80" y="26" fill="#F6B17A" fontSize="7.5" fontFamily="serif" fontStyle="italic" fontWeight="bold">T = 2π/ω</text>
      </svg>
    </div>
  )
}

/**
 * Ilustración técnica de Calibrador / Layout de Impresión (para Generador PDF)
 */
export function DocumentBlueprintIllustration({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center rounded-lg border border-border bg-white px-3 py-2 shadow-2xs select-none",
        className,
      )}
      title="Metrología Gráfica · Formato Editorial y Calibración de Hoja de Trabajo"
    >
      <svg width="170" height="60" viewBox="0 0 170 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid-doc" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M 8 0 L 0 0 0 8" fill="none" stroke="#D5CEBF" strokeWidth="0.5" strokeDasharray="1 2" opacity="0.5" />
          </pattern>
        </defs>
        <rect width="170" height="60" fill="url(#grid-doc)" rx="4" />

        {/* Representación de Hoja Carta con marcas de corte */}
        <rect x="45" y="8" width="80" height="44" rx="2" fill="#FDFBF7" stroke="#2D3250" strokeWidth="1" />
        
        {/* Marcas de registro en las esquinas */}
        <line x1="40" y1="8" x2="44" y2="8" stroke="#7077A1" strokeWidth="0.75" />
        <line x1="45" y1="3" x2="45" y2="7" stroke="#7077A1" strokeWidth="0.75" />
        <line x1="126" y1="8" x2="130" y2="8" stroke="#7077A1" strokeWidth="0.75" />
        <line x1="125" y1="3" x2="125" y2="7" stroke="#7077A1" strokeWidth="0.75" />

        {/* Líneas simuladas de reactivos */}
        <line x1="52" y1="16" x2="95" y2="16" stroke="#2D3250" strokeWidth="1.5" />
        <line x1="52" y1="22" x2="118" y2="22" stroke="#7077A1" strokeWidth="0.75" strokeDasharray="2 1" />
        <line x1="52" y1="27" x2="110" y2="27" stroke="#7077A1" strokeWidth="0.75" strokeDasharray="2 1" />

        {/* Cajas de opciones simuladas */}
        <rect x="52" y="34" width="12" height="7" rx="1" fill="#FFFFFF" stroke="#D5CEBF" strokeWidth="0.75" />
        <rect x="68" y="34" width="12" height="7" rx="1" fill="#F6B17A" fillOpacity="0.25" stroke="#F6B17A" strokeWidth="0.75" />
        <rect x="84" y="34" width="12" height="7" rx="1" fill="#FFFFFF" stroke="#D5CEBF" strokeWidth="0.75" />
        <rect x="100" y="34" width="12" height="7" rx="1" fill="#FFFFFF" stroke="#D5CEBF" strokeWidth="0.75" />

        {/* Cota de dimensión lateral */}
        <line x1="133" y1="8" x2="133" y2="52" stroke="#F6B17A" strokeWidth="1" />
        <polyline points="131,11 133,8 135,11" fill="none" stroke="#F6B17A" strokeWidth="0.75" />
        <polyline points="131,49 133,52 135,49" fill="none" stroke="#F6B17A" strokeWidth="0.75" />
        <text x="138" y="33" fill="#2D3250" fontSize="7" fontFamily="monospace">DIN/US</text>
      </svg>
    </div>
  )
}

/**
 * Ilustración técnica de Bohr / Orbitales Cuánticos (para Estudiantes)
 */
export function AtomicOrbitalsIllustration({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center rounded-lg border border-border bg-white px-3 py-2 shadow-2xs select-none",
        className,
      )}
      title="Física Cuántica · Modelo de Bohr: Niveles discretos de energía E_n y transición hν"
    >
      <svg width="170" height="60" viewBox="0 0 170 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid-orbit" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M 8 0 L 0 0 0 8" fill="none" stroke="#D5CEBF" strokeWidth="0.5" strokeDasharray="1 2" opacity="0.5" />
          </pattern>
        </defs>
        <rect width="170" height="60" fill="url(#grid-orbit)" rx="4" />

        {/* Núcleo atómico central */}
        <circle cx="50" cy="30" r="4.5" fill="#2D3250" />
        <circle cx="50" cy="30" r="6.5" stroke="#7077A1" strokeWidth="0.75" strokeDasharray="2 1" />
        <text x="47" y="32.5" fill="#FFFFFF" fontSize="6" fontFamily="monospace" fontWeight="bold">+e</text>

        {/* Órbita n=1 */}
        <ellipse cx="50" cy="30" rx="18" ry="12" stroke="#7077A1" strokeWidth="0.75" strokeDasharray="2 2" />
        {/* Órbita n=2 */}
        <ellipse cx="50" cy="30" rx="34" ry="20" stroke="#7077A1" strokeWidth="1" strokeDasharray="3 2" />
        {/* Órbita n=3 */}
        <ellipse cx="50" cy="30" rx="46" ry="26" stroke="#D5CEBF" strokeWidth="0.75" />

        {/* Electrón en órbita n=2 */}
        <circle cx="78" cy="22" r="3" fill="#F6B17A" stroke="#2D3250" strokeWidth="1" />
        <text x="83" y="24" fill="#2D3250" fontSize="6.5" fontFamily="serif" fontStyle="italic">e⁻</text>

        {/* Transición cuántica: fotón emitido hν */}
        <path d="M 76 25 Q 92 34 108 26 T 132 30" fill="none" stroke="#F6B17A" strokeWidth="1.25" strokeLinecap="round" />
        <polygon points="134,30 128,27 129,32" fill="#F6B17A" />
        <text x="104" y="20" fill="#F6B17A" fontSize="7.5" fontFamily="serif" fontStyle="italic" fontWeight="bold">hν = ΔE</text>

        {/* Etiquetas de estado cuántico n */}
        <text x="140" y="44" fill="#7077A1" fontSize="7" fontFamily="monospace">n=1,2,3...</text>
      </svg>
    </div>
  )
}

/**
 * Ilustración técnica de Diagrama de Cuerpo Libre DCL (para Asignaciones)
 */
export function FreeBodyDiagramIllustration({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center rounded-lg border border-border bg-white px-3 py-2 shadow-2xs select-none",
        className,
      )}
      title="Dinámica Clásica · Diagrama de Cuerpo Libre (DCL): ΣF = m·a"
    >
      <svg width="170" height="60" viewBox="0 0 170 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid-fbd" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M 8 0 L 0 0 0 8" fill="none" stroke="#D5CEBF" strokeWidth="0.5" strokeDasharray="1 2" opacity="0.5" />
          </pattern>
        </defs>
        <rect width="170" height="60" fill="url(#grid-fbd)" rx="4" />

        {/* Plano inclinado */}
        <polygon points="18,48 135,48 135,16" fill="#FDFBF7" stroke="#7077A1" strokeWidth="1" />
        
        {/* Ángulo α */}
        <path d="M 38 48 A 20 20 0 0 0 35 43" fill="none" stroke="#7077A1" strokeWidth="1" />
        <text x="40" y="45" fill="#7077A1" fontSize="7" fontFamily="serif">α</text>

        {/* Masa m sobre el plano */}
        <g transform="translate(75, 32) rotate(-15.3)">
          <rect x="-12" y="-10" width="24" height="18" rx="1.5" fill="#2D3250" />
          <text x="-4" y="3" fill="#FFFFFF" fontSize="7" fontFamily="serif" fontStyle="italic">m</text>

          {/* Fuerza Normal N */}
          <line x1="0" y1="-10" x2="0" y2="-28" stroke="#7077A1" strokeWidth="1.25" strokeLinecap="round" />
          <polygon points="0,-28 -2.5,-23 2.5,-23" fill="#7077A1" />
          <text x="3" y="-22" fill="#7077A1" fontSize="7" fontFamily="serif">N⃗</text>

          {/* Tensión / Fuerza aplicada T */}
          <line x1="12" y1="-1" x2="30" y2="-1" stroke="#F6B17A" strokeWidth="1.75" strokeLinecap="round" />
          <polygon points="30,-1 25,-3.5 25,1.5" fill="#F6B17A" />
          <text x="24" y="-5" fill="#F6B17A" fontSize="7.5" fontFamily="serif" fontStyle="italic" fontWeight="bold">T⃗</text>

          {/* Fricción fr */}
          <line x1="-12" y1="-1" x2="-26" y2="-1" stroke="#7077A1" strokeWidth="1.25" strokeLinecap="round" />
          <polygon points="-26,-1 -22,-3.5 -22,1.5" fill="#7077A1" />
          <text x="-29" y="-5" fill="#7077A1" fontSize="6.5" fontFamily="serif">f⃗_r</text>
        </g>

        {/* Peso P = mg vertical */}
        <line x1="75" y1="34" x2="75" y2="54" stroke="#2D3250" strokeWidth="1.5" strokeLinecap="round" />
        <polygon points="75,54 72.5,49 77.5,49" fill="#2D3250" />
        <text x="79" y="52" fill="#2D3250" fontSize="7" fontFamily="monospace">P⃗ = mg</text>

        {/* Ecuación sumatoria */}
        <text x="122" y="14" fill="#7077A1" fontSize="6.5" fontFamily="monospace">ΣF = m·a</text>
      </svg>
    </div>
  )
}

/**
 * Ilustración técnica de Nonio / Calibrador Vernier (para Historial de Documentos)
 */
export function VernierCaliperIllustration({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center rounded-lg border border-border bg-white px-3 py-2 shadow-2xs select-none",
        className,
      )}
      title="Metrología · Calibrador Vernier: Registro de resolución y control milimétrico"
    >
      <svg width="170" height="60" viewBox="0 0 170 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid-vernier" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M 8 0 L 0 0 0 8" fill="none" stroke="#D5CEBF" strokeWidth="0.5" strokeDasharray="1 2" opacity="0.5" />
          </pattern>
        </defs>
        <rect width="170" height="60" fill="url(#grid-vernier)" rx="4" />

        {/* Regla principal (escala fija en mm) */}
        <rect x="10" y="14" width="150" height="16" fill="#FDFBF7" stroke="#2D3250" strokeWidth="1" rx="1" />
        
        {/* Graduaciones de la regla fija */}
        {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140].map((x, i) => (
          <g key={i}>
            <line x1={15 + x} y1="14" x2={15 + x} y2={i % 5 === 0 ? "24" : "19"} stroke="#2D3250" strokeWidth={i % 5 === 0 ? "1" : "0.5"} />
            {i % 5 === 0 && (
              <text x={12 + x} y="28" fill="#7077A1" fontSize="6" fontFamily="monospace">{i / 5}</text>
            )}
          </g>
        ))}

        {/* Corredera del Nonio (escala móvil) */}
        <rect x="52" y="32" width="60" height="18" fill="#FFFFFF" stroke="#F6B17A" strokeWidth="1.25" rx="1" />
        
        {/* Graduaciones del Nonio */}
        {[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50].map((x, i) => (
          <line
            key={i}
            x1={56 + x}
            y1="32"
            x2={56 + x}
            y2={i % 5 === 0 ? "40" : "36"}
            stroke={i === 5 ? "#F6B17A" : "#2D3250"}
            strokeWidth={i === 5 ? "1.5" : "0.75"}
          />
        ))}

        {/* Coincidencia exacta (indicador de lectura) */}
        <circle cx="81" cy="32" r="2" fill="#F6B17A" />
        <text x="116" y="44" fill="#2D3250" fontSize="7" fontFamily="monospace" fontWeight="bold">±0.05 mm</text>
        <text x="56" y="47" fill="#7077A1" fontSize="5.5" fontFamily="monospace">NONIUS</text>
      </svg>
    </div>
  )
}

/**
 * Ilustración técnica de Comparador de Ondas / Verificación de Respuesta (para Validación)
 */
export function SignalComparatorIllustration({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center rounded-lg border border-border bg-white px-3 py-2 shadow-2xs select-none",
        className,
      )}
      title="Cotejo de Señal · Comparador de Umbral: Verificación de coincidencia de reactivos"
    >
      <svg width="170" height="60" viewBox="0 0 170 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid-signal" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M 8 0 L 0 0 0 8" fill="none" stroke="#D5CEBF" strokeWidth="0.5" strokeDasharray="1 2" opacity="0.5" />
          </pattern>
        </defs>
        <rect width="170" height="60" fill="url(#grid-signal)" rx="4" />

        {/* Ejes de osciloscopio */}
        <line x1="12" y1="30" x2="158" y2="30" stroke="#D5CEBF" strokeWidth="0.75" />
        <line x1="12" y1="52" x2="12" y2="8" stroke="#7077A1" strokeWidth="1" />

        {/* Señal de entrada analógica (procedimiento del estudiante) */}
        <path
          d="M 12 40 C 30 15, 45 45, 65 20 C 80 5, 95 35, 115 18 L 125 30"
          fill="none"
          stroke="#7077A1"
          strokeWidth="1.25"
          strokeDasharray="2 1.5"
        />

        {/* Umbral de referencia V_ref (clave de respuesta) */}
        <line x1="12" y1="22" x2="130" y2="22" stroke="#D5CEBF" strokeWidth="1" strokeDasharray="3 2" />
        <text x="14" y="18" fill="#7077A1" fontSize="6.5" fontFamily="monospace">V_ref</text>

        {/* Señal comparada digitalizada (Aprobado/Validado) */}
        <path
          d="M 65 48 L 65 24 L 95 24 L 95 48 L 130 48"
          fill="none"
          stroke="#F6B17A"
          strokeWidth="2"
        />

        {/* Sello de coincidencia / checkmark técnico */}
        <circle cx="145" cy="30" r="10" fill="#EAF3EA" stroke="#1E5631" strokeWidth="1" />
        <path d="M 140 30 L 143.5 33.5 L 150 26.5" fill="none" stroke="#1E5631" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <text x="136" y="47" fill="#1E5631" fontSize="5.5" fontFamily="monospace" fontWeight="bold">MATCH</text>
      </svg>
    </div>
  )
}

/**
 * Ilustración técnica de Micrómetro Palmer / Calibración (para Configuración)
 */
export function MicrometerCalibrationIllustration({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center rounded-lg border border-border bg-white px-3 py-2 shadow-2xs select-none",
        className,
      )}
      title="Calibración y Ajuste · Tornillo Micrométrico Palmer: Ajuste fino del sistema"
    >
      <svg width="170" height="60" viewBox="0 0 170 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid-micro" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M 8 0 L 0 0 0 8" fill="none" stroke="#D5CEBF" strokeWidth="0.5" strokeDasharray="1 2" opacity="0.5" />
          </pattern>
        </defs>
        <rect width="170" height="60" fill="url(#grid-micro)" rx="4" />

        {/* Arco de la herradura (Cuerpo del micrómetro) */}
        <path
          d="M 45 16 C 15 16, 15 48, 45 48 L 65 48 C 65 48, 40 45, 40 32 C 40 19, 65 16, 65 16 Z"
          fill="#2D3250"
        />

        {/* Yunque fijo y husillo móvil */}
        <rect x="42" y="28" width="6" height="8" fill="#7077A1" />
        <rect x="56" y="29.5" width="22" height="5" fill="#7077A1" />

        {/* Cilindro graduado fijo */}
        <rect x="78" y="26" width="36" height="12" fill="#FDFBF7" stroke="#2D3250" strokeWidth="1" />
        <line x1="82" y1="32" x2="114" y2="32" stroke="#2D3250" strokeWidth="0.75" />
        {[0, 5, 10, 15, 20, 25].map((x) => (
          <line key={x} x1={85 + x} y1="28" x2={85 + x} y2="32" stroke="#7077A1" strokeWidth="0.5" />
        ))}

        {/* Tambor móvil graduado */}
        <rect x="114" y="24" width="26" height="16" rx="1" fill="#FFFFFF" stroke="#F6B17A" strokeWidth="1.25" />
        {[0, 4, 8, 12, 16, 20].map((x) => (
          <line key={x} x1={118 + x} y1="24" x2={118 + x} y2="40" stroke="#F6B17A" strokeWidth="0.75" strokeDasharray="2 1" />
        ))}

        {/* Carraca de trinquete */}
        <rect x="140" y="28" width="16" height="8" rx="1" fill="#2D3250" />
        <text x="116" y="47" fill="#2D3250" fontSize="6.5" fontFamily="monospace" fontWeight="bold">0.01 mm</text>
      </svg>
    </div>
  )
}

/**
 * Mapeo de unidades SI canónicas por tema de física
 */
export const TOPIC_SI_UNITS: Record<string, string> = {
  Cinemática: "SI: m · s · m/s²",
  Dinámica: "SI: N · kg · μ",
  "Leyes de Newton": "SI: N · kg·m/s²",
  "Trabajo y energía": "SI: J · W · N·m",
  "Cantidad de movimiento": "SI: kg·m/s · N·s",
  Electricidad: "SI: V · A · Ω · C",
  "Movimiento circular": "SI: rad/s · m/s² · N",
  Termodinámica: "SI: J · K · cal · Pa",
  "Fluidos y presión": "SI: Pa · N/m² · kg/m³",
  "Ondas y sonido": "SI: Hz · m · dB · m/s",
}
