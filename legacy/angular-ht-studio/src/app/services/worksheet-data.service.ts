import { Injectable, signal } from '@angular/core';
import { WorksheetData, ExerciseItem, WorksheetSection } from '../models/worksheet.model';

const STORAGE_KEY = 'ht_builder_worksheet_data_v4';

export const EXACT_HT01_WORKSHEET: WorksheetData = {
  header: {
    logoUrl: 'assets/image1.jpeg',
    unitTitle: 'Unidad 1',
    sectionCodeLabel: 'Código de sección académica',
    sectionCodeValue: '',
    courseTitle: 'Física II – Quinto',
    htCodeAndTitle: 'HT01: Movimiento Rectilíneo Uniforme (MRU)',
    year: '2026',
  },
  generalInstructionsTitle: 'HT01: MOVIMIENTO RECTILÍNEO UNIFORME (MRU)',
  generalInstructionsText:
    'Instrucciones Generales: a continuación, encontrarás una serie de ejercicios los cuales debes resolver imprimiendo este documento o copiando en hojas adicionales/cuaderno a cuadros tamaño carta. Deja constancia de los procedimientos utilizados si los hubiese. Recuerda que puedes apoyarte con el Material de Apoyo, Bimestre 1, Semana 1 del curso de Física II, que puedes descargar en la plataforma Kinal.Academy.',

  // Página 1: Objetivos
  objectives: [
    {
      id: 'obj-1',
      text: 'Calcular la rapidez, velocidad y tiempo mediante la aplicación de fórmulas del movimiento rectilíneo uniforme en ejercicios numéricos y contextos técnicos.',
    },
    {
      id: 'obj-2',
      text: 'Interpretar gráficas de posición-tiempo y velocidad-tiempo para analizar el comportamiento del movimiento y determinar magnitudes físicas.',
    },
    {
      id: 'obj-3',
      text: 'Resolver problemas prácticos que integren el uso de unidades, conversiones y relaciones entre las magnitudes del movimiento para verificar resultados coherentes.',
    },
  ],
  generalDescriptionInstructions: 'Lee detenidamente las siguientes instrucciones:',
  generalDescriptionPoints: [
    'Para realizar esta hoja de trabajo puedes imprimir este documento, trabajar en hojas adicionales o cuaderno copiando detalladamente y resolviendo cada ejercicio de la actividad.',
    'Es de carácter obligatorio realizar la hoja de trabajo en el salón de clase, siguiendo las indicaciones del docente a cargo del curso.',
    'Realiza la lectura del documento “Movimiento Rectilíneo Uniforme (MRU)”. Este documento lo podrás encontrar disponible en la plataforma Kinal.Academy, específicamente en Material de Apoyo del Bimestre 1 – Semana 1 del curso Física II.',
    'Sigue las instrucciones presentes en cada uno de los ejercicios propuestos en esta hoja de trabajo, deja constancia de los procedimientos matemáticos de ser necesarios.',
    'Crea un documento PDF con imágenes de los ejercicios resueltos. Trata de que cada imagen sea lo más legible posible, con orientación vertical y en secuencia.',
    'Utiliza los ejercicios resueltos en esta hoja de trabajo para realizar la actividad en plataforma HT01: Movimiento Rectilíneo Uniforme (MRU). En esta actividad deberás adjuntar el documento con las evidencias solicitado en la instrucción anterior.',
  ],
  milestones: [
    {
      label: 'Trabajo en clase (entrega presencial)',
      startText: 'Inicio: 31/03/2025',
      endText: 'Cierre: 06/04/2025',
    },
    {
      label: 'Actividad en línea (entrega en plataforma)',
      startText: 'Inicio: 21/04/2025',
      endText: 'Cierre: 27/04/2025',
    },
    {
      label: 'Días Disponibles para realizar le tarea',
      highlightText: '27 días',
    },
    {
      label: 'Punteo',
      highlightText: '2.5 puntos',
    },
  ],
  observations: [
    'No se aceptan entregas de hojas de trabajo fuera de tiempo, debido a que cada actividad tiene como mínimo 5 días para la entrega.',
    'Las entregas en plataforma no tienen reposición, dado que se encuentran habilitadas durante 7 días como mínimo.',
    'Hojas de trabajo presenciales copiadas entre compañeros, serán anuladas.',
    'Las hojas de trabajo presenciales no tienen plan de mejoramiento (PMA).',
    'Entregas en plataforma sin documento PDF con evidencias serán anuladas.',
    'Aproximaciones: Valores Mayores a 1 – usar 2 decimales, Valores Menores a 1: usar 3 decimales.',
  ],
  mode: 'student',
  sections: [
    {
      id: 'sec-1',
      title: 'Forma 1 – PREGUNTAS CONCEPTUALES',
      instructions:
        'Instrucciones: lee con atención cada pregunta y asegúrate de comprender lo que se te solicita. Selecciona la opción que consideres correcta y marca la letra correspondiente. Justifica brevemente tu elección explicando el razonamiento que te llevó a esa respuesta y, cuando sea necesario, realiza los cálculos o conversiones de unidades de forma ordenada, dejando constancia de las operaciones realizadas para sustentar tu decisión.',
      items: [
        {
          id: 'item-1',
          number: 1,
          type: 'multiple_choice',
          prompt:
            'Si la velocidad promedio de un objeto es cero en cierto intervalo de tiempo, ¿qué puede afirmarse acerca del desplazamiento del objeto durante dicho intervalo?',
          options: [
            {
              letter: 'a',
              text: 'El objeto aumentó su velocidad constantemente.',
              isCorrect: false,
            },
            {
              letter: 'b',
              text: 'El objeto recorrió una distancia, pero su posición final fue mayor que la inicial.',
              isCorrect: false,
            },
            { letter: 'c', text: 'El desplazamiento total del objeto es cero.', isCorrect: true },
            {
              letter: 'd',
              text: 'El objeto se movió en línea recta con velocidad constante distinta de cero.',
              isCorrect: false,
            },
          ],
          teacherSolution: 'Vmed = Δx / Δt. Si Vmed = 0 y Δt > 0, entonces necesariamente Δx = 0.',
        },
        {
          id: 'item-2',
          number: 2,
          type: 'multiple_choice',
          prompt: '¿En qué condiciones la velocidad media es igual a la velocidad instantánea?',
          options: [
            {
              letter: 'a',
              text: 'Cuando el objeto se desplaza con aceleración constante.',
              isCorrect: false,
            },
            {
              letter: 'b',
              text: 'Cuando el movimiento es rectilíneo y la velocidad permanece constante.',
              isCorrect: true,
            },
            {
              letter: 'c',
              text: 'Cuando el objeto cambia de dirección, pero mantiene la misma rapidez.',
              isCorrect: false,
            },
            {
              letter: 'd',
              text: 'Cuando el objeto se encuentra en reposo todo el tiempo.',
              isCorrect: false,
            },
          ],
          teacherSolution:
            'En el MRU la velocidad es constante en todo instante, por lo que coincide siempre con la velocidad media.',
        },
        {
          id: 'item-3',
          number: 3,
          type: 'multiple_choice',
          prompt:
            '¿En qué condiciones la magnitud de la velocidad media es igual a la rapidez media?',
          options: [
            {
              letter: 'a',
              text: 'Cuando el movimiento es en línea recta sin cambio de sentido.',
              isCorrect: true,
            },
            {
              letter: 'b',
              text: 'Cuando el objeto cambia de dirección durante su movimiento.',
              isCorrect: false,
            },
            {
              letter: 'c',
              text: 'Cuando el objeto parte del reposo y luego acelera.',
              isCorrect: false,
            },
            {
              letter: 'd',
              text: 'Cuando el desplazamiento total del objeto es cero.',
              isCorrect: false,
            },
          ],
          teacherSolution:
            'La distancia coincide con la magnitud del desplazamiento solo en trayectoria recta y en un único sentido hacia adelante.',
        },
        {
          id: 'item-4',
          number: 4,
          type: 'multiple_choice',
          prompt:
            'En un movimiento en una dimensión, ¿cuándo coinciden el desplazamiento y la distancia recorrida?',
          options: [
            {
              letter: 'a',
              text: 'Cuando el objeto se mueve con aceleración constante, sin importar la trayectoria.',
              isCorrect: false,
            },
            {
              letter: 'b',
              text: 'Cuando el objeto pasa varias veces por el mismo punto en direcciones opuestas.',
              isCorrect: false,
            },
            {
              letter: 'c',
              text: 'Siempre coinciden, independientemente del recorrido del objeto.',
              isCorrect: false,
            },
            {
              letter: 'd',
              text: 'Cuando el objeto se mueve en línea recta sin cambiar de sentido.',
              isCorrect: true,
            },
          ],
          teacherSolution:
            'En 1D la distancia y el desplazamiento son iguales siempre que el objeto no dé marcha atrás.',
        },
        {
          id: 'item-5',
          number: 5,
          type: 'multiple_choice',
          prompt:
            'Dos móviles se desplazan en la misma dirección sobre una línea recta. El móvil A recorre 120 km en 2 horas, y el móvil B recorre 90 km en 1 hora. ¿Cuál de las siguientes afirmaciones es correcta sobre sus velocidades y desplazamientos?',
          options: [
            {
              letter: 'a',
              text: 'La velocidad media de A es mayor que la de B.',
              isCorrect: false,
            },
            {
              letter: 'b',
              text: 'La velocidad media de B es mayor que la de A, pero el desplazamiento de A es mayor.',
              isCorrect: true,
            },
            {
              letter: 'c',
              text: 'Ambos tienen la misma velocidad media y el mismo desplazamiento.',
              isCorrect: false,
            },
            {
              letter: 'd',
              text: 'La velocidad media de B es menor que la de A, y el desplazamiento de B también es menor.',
              isCorrect: false,
            },
          ],
          teacherSolution:
            'v_A = 60 km/h; v_B = 90 km/h. Por ende v_B > v_A y Δx_A (120 km) > Δx_B (90 km).',
        },
      ],
    },
    {
      id: 'sec-2',
      title: 'Forma 2 – PROBLEMAS DE APLICACIÓN',
      instructions:
        'Instrucciones: a continuación, se presenta una serie de problemas de aplicación los cuales debes resolver en hojas adicionales o cuaderno. Deja constancia de los procedimientos utilizados. Trabaje en orden y con limpieza.',
      items: [
        {
          id: 'prob-1',
          number: 1,
          type: 'application_problem',
          prompt:
            'La rapidez de un impulso nervioso en el cuerpo humano es de aproximadamente 100 m/s. Si el dedo del pie de una persona promedio (169 cm) tropieza accidentalmente en la oscuridad, estime el tiempo que tarda el impulso nervioso en viajar a su cerebro.',
          answerSlots: [{ label: 'Resp.', value: '0.017 s' }],
          teacherSolution: 'd = 1.69 m; v = 100 m/s => t = 1.69 / 100 = 0.0169 s ≈ 0.017 s',
        },
        {
          id: 'prob-2',
          number: 2,
          type: 'application_problem',
          prompt:
            'Una persona camina, primero, con rapidez constante de 5.00 m/s a lo largo de una línea recta desde el punto “A” al punto “B” y luego de regreso a lo largo de la recta de “B” a “A” con una rapidez constante de 3.00 m/s.',
          subQuestions: [
            {
              id: 'sub-2a',
              letter: '(a)',
              text: '¿Cuál es su rapidez media durante todo el viaje?',
              answerSlots: [{ label: 'Resp.', value: '3.75 m/s' }],
            },
            {
              id: 'sub-2b',
              letter: '(b)',
              text: '¿Cuál es su velocidad durante todo el viaje?',
              answerSlots: [{ label: 'Resp.', value: '0.00 m/s' }],
            },
          ],
          teacherSolution:
            'vmedia = 2d / (d/5 + d/3) = 30/8 = 3.75 m/s. Vmed = 0 (desplazamiento nulo).',
        },
        {
          id: 'prob-3',
          number: 3,
          type: 'application_problem',
          prompt:
            'Las placas norteamericana y europea de la corteza de la Tierra se estaban separando con un rapidez relativa de aproximadamente 25 mm/año. Considere la rapidez como constante y encuentre cuándo se empezó a abrir la brecha entre ellas, hasta alcanzar el ancho actual de 2.9 × 10³ mi.',
          answerSlots: [{ label: 'Resp.', value: '1.87 × 10⁸ años' }],
          teacherSolution:
            'd = 2900 mi * 1,609,344 mm/mi = 4.67 × 10⁹ mm. t = d / 25 mm/año ≈ 1.87 × 10⁸ años.',
        },
        {
          id: 'prob-4',
          number: 4,
          type: 'application_problem',
          prompt:
            'De acuerdo con una regla empírica, cada cinco segundos entre un relámpago y el siguiente trueno indican la distancia al relámpago en millas. Suponiendo que la luz del relámpago llega instantáneamente, estime la rapidez del sonido en m/s a partir de esta regla. ¿Cuál sería la regla en kilómetros en vez de millas?',
          promptFormula: '5 s → 1 milla',
          answerSlots: [{ label: 'Resp.', value: '321.87 m/s (Regla km: 3.11 s / km)' }],
          teacherSolution:
            'v = 1609.34 m / 5 s = 321.87 m/s. Para 1 km (1000 m): t = 1000 / 321.87 ≈ 3.11 s (aprox. 3 s por km).',
        },
        {
          id: 'prob-5',
          number: 5,
          type: 'application_problem',
          prompt:
            'Usted va conduciendo un automóvil de la escuela a la casa a 95 km/h de manera uniforme a lo largo de 130 km. Empieza a llover, baja la velocidad a 65 km/h y llega a casa después de conducir durante 3 horas y 20 minutos.',
          subQuestions: [
            {
              id: 'sub-5a',
              letter: '(a)',
              text: '¿Qué tan lejos está su casa de la escuela?',
              answerSlots: [{ label: 'Resp.', value: '257.72 km' }],
            },
            {
              id: 'sub-5b',
              letter: '(b)',
              text: '¿Cuál fue la rapidez promedio.',
              answerSlots: [{ label: 'Resp.', value: '77.32 km/h' }],
            },
          ],
          teacherSolution:
            't1 = 130/95 = 1.3684 h. t2 = 3.3333 - 1.3684 = 1.9649 h. d2 = 65*1.9649 = 127.72 km. dtot = 257.72 km. vprom = 257.72 / 3.3333 = 77.32 km/h.',
        },
        {
          id: 'prob-6',
          number: 6,
          type: 'graph_table',
          prompt: 'Observa y analiza el siguiente gráfico:',
          imageUrl: 'assets/image5.jpeg',
          hasRealiceHeading: true,
          subQuestions: [
            {
              id: 'sub-6a',
              letter: '(a)',
              text: 'Determine el desplazamiento en los intervalos de tiempo de (0 – 3) y de (10 – 12) segundos.',
              answerTable: {
                headerCol1: 'Intervalo Tiempo',
                headerCol2: 'Respuesta',
                rows: [
                  { col1: '0 – 3', col2: '90.00 km' },
                  { col1: '10 – 12', col2: '-30.00 km' },
                ],
              },
            },
            {
              id: 'sub-6b',
              letter: '(b)',
              text: 'Determine la velocidad media en el intervalo (6 – 8) segundos.',
              answerSlots: [{ label: 'Resp.', value: '-15.00 km/h' }],
            },
            {
              id: 'sub-6c',
              letter: '(c)',
              text: 'Determine la rapidez media en el intervalo de (12 – 15) segundos.',
              answerSlots: [{ label: 'Resp.', value: '6.67 km/h' }],
            },
            {
              id: 'sub-6d',
              letter: '(d)',
              text: 'Determine el desplazamiento total realizado',
              answerSlots: [{ label: 'Resp.', value: '50.00 km' }],
            },
            {
              id: 'sub-6e',
              letter: '(e)',
              text: 'Determine la distancia total recorrida.',
              answerSlots: [{ label: 'Resp.', value: '170.00 km' }],
            },
          ],
          teacherSolution:
            'Δx(0-3)=90 km. Δx(10-12)=-30 km. Vmed(6-8)=-15 km/h. vmed(12-15)=6.67 km/h. Δxtot=50 km. dtot=170 km.',
        },
        {
          id: 'prob-7',
          number: 7,
          type: 'graph_table',
          prompt: 'Observa y analiza el siguiente gráfico:',
          imageUrl: 'assets/image6.jpeg',
          hasRealiceHeading: true,
          subQuestions: [
            {
              id: 'sub-7a',
              letter: '(a)',
              text: 'Calcula la distancia total recorrida por el móvil. Recuerda que en un gráfico de velocidad vs. tiempo, la distancia se obtiene calculando el área bajo la curva, tomando todos los valores como positivos.',
              answerSlots: [{ label: 'Resp.', value: '175.00 m' }],
            },
            {
              id: 'sub-7b',
              letter: '(b)',
              text: 'Determina el desplazamiento total del móvil al finalizar los 15 segundos. Considera el signo de la velocidad para obtener la suma algebraica de los desplazamientos.',
              answerSlots: [{ label: 'Resp.', value: '145.00 m' }],
            },
            {
              id: 'sub-7c',
              letter: '(c)',
              text: 'Calcula la velocidad y rapidez media de 0 a 7 segundos.',
              answerTable: {
                headerCol1: '',
                headerCol2: '',
                rows: [
                  { col1: 'Vmedia', col2: '20.71 m/s' },
                  { col1: 'vmedia', col2: '20.71 m/s' },
                ],
              },
            },
            {
              id: 'sub-7d',
              letter: '(d)',
              text: 'Calcula la velocidad media del móvil durante los 15 segundos.',
              answerSlots: [{ label: 'Resp.', value: '9.67 m/s' }],
            },
          ],
          teacherSolution:
            'dtot = 100+45+15+15 = 175 m. Δxtot = 100+45-15+15 = 145 m. Vmed(0-7)=20.71 m/s. Vmed(0-15)=9.67 m/s.',
        },
      ],
    },
  ],
};

@Injectable({
  providedIn: 'root',
})
export class WorksheetDataService {
  readonly worksheet = signal<WorksheetData>(this.loadInitial());

  private loadInitial(): WorksheetData {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Usar plantilla exacta
    }
    return JSON.parse(JSON.stringify(EXACT_HT01_WORKSHEET));
  }

  saveToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.worksheet()));
    } catch (e) {
      console.warn('Error saving to localStorage', e);
    }
  }

  resetToDefault() {
    const fresh = JSON.parse(JSON.stringify(EXACT_HT01_WORKSHEET));
    this.worksheet.set(fresh);
    this.saveToStorage();
  }

  createBlank() {
    const blank: WorksheetData = {
      header: {
        logoUrl: '/assets/image1.jpeg',
        unitTitle: 'Unidad 1',
        sectionCodeLabel: 'Código de sección académica',
        sectionCodeValue: '',
        courseTitle: 'Física II – Quinto',
        htCodeAndTitle: 'HT01: Nueva Hoja de Trabajo',
        year: new Date().getFullYear().toString(),
      },
      generalInstructionsTitle: 'HT01: TÍTULO DE LA HOJA DE TRABAJO',
      generalInstructionsText:
        'Instrucciones Generales: resuelva los siguientes ejercicios con orden y limpieza.',
      objectives: [{ id: 'obj-1', text: 'Objetivo de aprendizaje 1...' }],
      generalDescriptionInstructions: 'Lee detenidamente las siguientes instrucciones:',
      generalDescriptionPoints: [
        'Resuelve detalladamente cada problema en tu cuaderno o en hojas adicionales.',
        'Deje constancia de todos los procedimientos utilizados.',
      ],
      milestones: [
        {
          label: 'Trabajo en clase (entrega presencial)',
          startText: 'Inicio: --/--/----',
          endText: 'Cierre: --/--/----',
        },
        {
          label: 'Actividad en línea (entrega en plataforma)',
          startText: 'Inicio: --/--/----',
          endText: 'Cierre: --/--/----',
        },
        { label: 'Días Disponibles para realizar le tarea', highlightText: '7 días' },
        { label: 'Punteo', highlightText: '10 puntos' },
      ],
      observations: [
        'No se aceptan entregas fuera de tiempo.',
        'Aproximaciones: Valores Mayores a 1 – usar 2 decimales, Valores Menores a 1: usar 3 decimales.',
      ],
      mode: 'student',
      sections: [
        {
          id: 'sec-' + Date.now(),
          title: 'Forma 1 – PROBLEMAS DE APLICACIÓN',
          instructions: 'Instrucciones: resuelva los siguientes ejercicios...',
          items: [
            {
              id: 'item-' + Date.now(),
              number: 1,
              type: 'application_problem',
              prompt: 'Redacta tu problema aquí...',
              answerSlots: [{ label: 'Resp.', value: '' }],
            },
          ],
        },
      ],
    };
    this.worksheet.set(blank);
    this.saveToStorage();
  }

  setMode(mode: 'student' | 'teacher') {
    this.worksheet.update((ws) => ({ ...ws, mode }));
    this.saveToStorage();
  }

  // Modificadores de secciones y ejercicios
  addSection(title = 'Forma X – NUEVA SECCIÓN') {
    const newSection: WorksheetSection = {
      id: 'sec-' + Date.now(),
      title,
      instructions: 'Instrucciones de la sección...',
      items: [],
    };
    this.worksheet.update((ws) => ({
      ...ws,
      sections: [...ws.sections, newSection],
    }));
    this.saveToStorage();
  }

  removeSection(sectionId: string) {
    this.worksheet.update((ws) => ({
      ...ws,
      sections: ws.sections.filter((s) => s.id !== sectionId),
    }));
    this.saveToStorage();
  }

  addExercise(sectionId: string, type: 'multiple_choice' | 'application_problem' | 'graph_table') {
    const current = this.worksheet();
    const sec = current.sections.find((s) => s.id === sectionId);
    if (!sec) return;

    const nextNumber = sec.items.length + 1;
    let newItem: ExerciseItem;

    if (type === 'multiple_choice') {
      newItem = {
        id: 'item-' + Date.now(),
        number: nextNumber,
        type: 'multiple_choice',
        prompt: 'Pregunta conceptual...',
        options: [
          { letter: 'a', text: 'Opción a', isCorrect: false },
          { letter: 'b', text: 'Opción b', isCorrect: true },
          { letter: 'c', text: 'Opción c', isCorrect: false },
          { letter: 'd', text: 'Opción d', isCorrect: false },
        ],
      };
    } else if (type === 'graph_table') {
      newItem = {
        id: 'item-' + Date.now(),
        number: nextNumber,
        type: 'graph_table',
        prompt: 'Observa y analiza el siguiente gráfico:',
        imageUrl: '/assets/image5.jpeg',
        hasRealiceHeading: true,
        subQuestions: [
          {
            id: 'sub-' + Date.now(),
            letter: '(a)',
            text: 'Determine la magnitud solicitada:',
            answerSlots: [{ label: 'Resp.', value: '' }],
          },
        ],
      };
    } else {
      newItem = {
        id: 'item-' + Date.now(),
        number: nextNumber,
        type: 'application_problem',
        prompt: 'Redacta aquí el problema...',
        answerSlots: [{ label: 'Resp.', value: '' }],
      };
    }

    this.worksheet.update((ws) => ({
      ...ws,
      sections: ws.sections.map((s) =>
        s.id === sectionId ? { ...s, items: [...s.items, newItem] } : s,
      ),
    }));
    this.saveToStorage();
  }

  removeExercise(sectionId: string, itemId: string) {
    this.worksheet.update((ws) => ({
      ...ws,
      sections: ws.sections.map((s) => {
        if (s.id !== sectionId) return s;
        const filtered = s.items.filter((it) => it.id !== itemId);
        return {
          ...s,
          items: filtered.map((it, idx) => ({ ...it, number: idx + 1 })),
        };
      }),
    }));
    this.saveToStorage();
  }

  duplicateExercise(sectionId: string, item: ExerciseItem) {
    const copy: ExerciseItem = JSON.parse(JSON.stringify(item));
    copy.id = 'item-' + Date.now();
    this.worksheet.update((ws) => ({
      ...ws,
      sections: ws.sections.map((s) => {
        if (s.id !== sectionId) return s;
        const idx = s.items.findIndex((it) => it.id === item.id);
        const newItems = [...s.items];
        newItems.splice(idx + 1, 0, copy);
        return {
          ...s,
          items: newItems.map((it, i) => ({ ...it, number: i + 1 })),
        };
      }),
    }));
    this.saveToStorage();
  }

  exportToJson(): string {
    return JSON.stringify(this.worksheet(), null, 2);
  }

  importFromJson(jsonStr: string): boolean {
    try {
      const parsed = JSON.parse(jsonStr) as WorksheetData;
      if (parsed && parsed.header && parsed.sections) {
        this.worksheet.set(parsed);
        this.saveToStorage();
        return true;
      }
    } catch (e) {
      console.error('Invalid JSON', e);
    }
    return false;
  }
}
