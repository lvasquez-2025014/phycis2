# HT Studio | Creador de Hojas de Trabajo de Física (Física II - Kinal)

Aplicación web desarrollada en **Angular** con diseño fiel a las hojas de trabajo académicas oficiales de Kinal (Diversificado). Permite diseñar, personalizar ejercicios, redactar problemas con casillas oficiales de respuesta (`[ Resp. ] [   ]`), preguntas de opción múltiple, tablas de intervalos y gráficas analíticas, con exportación nativa a **PDF** de alta resolución.

## 🚀 Características

- **Diseño Idéntico al Formato Word/PDF Oficial:**
  - Encabezado institucional con logotipo oficial de Kinal, unidad y sección académica.
  - Tarjeta de datos del estudiante con casilla de año, carné por dígitos, apellidos, nombres y fecha.
  - Secciones con diseño de títulos en pastilla azul (`#DEEAF6`), líneas punteadas extendidas y viñetas triangulares rojas (`►`).
  - Marco de examen en 2 columnas con tipografía *Century Gothic* y encabezados *Forma 1* / *Forma 2*.
  - Casillas oficiales de respuesta `[ Resp. ] [       ]` y tablas de análisis de gráficas.
- **Modos de Visualización:**
  - **Modo Alumno:** Espacios limpios en blanco listos para imprimir o resolver.
  - **Modo Docente:** Clave de respuestas y soluciones visibles en verde para el profesor.
- **Editor en Tiempo Real:**
  - Editor interactivo para modificar objetivos, normas, fechas de entrega, enunciados y opciones.
  - Posibilidad de añadir preguntas conceptuales, problemas con respuesta numérica o problemas con gráficas.
  - Almacenamiento local automático (`localStorage`) y exportación/importación en formato JSON.
- **Exportación a PDF & Impresión:**
  - Descarga directa en formato PDF tamaño Carta (*Letter*) con `jsPDF` y `html2canvas`.
  - Impresión vectorial de alta nitidez vía `@media print`.

## 🛠️ Tecnologías

- **Angular 22** (Componentes Standalone, Signals reactivos)
- **TypeScript**
- **Vanilla CSS** con diseño fiel al sistema gráfico del documento
- **jsPDF** & **html2canvas**
- **pnpm** como gestor de paquetes

## 💻 Instalación y Ejecución

```bash
# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm start
# o
ng serve
```

Abre [http://localhost:4200/](http://localhost:4200/) en tu navegador.

## 📦 Compilación para Producción

```bash
pnpm run build
```
Los artefactos se generarán en la carpeta `dist/`.
