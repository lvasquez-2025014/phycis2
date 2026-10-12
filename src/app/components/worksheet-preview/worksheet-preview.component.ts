import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorksheetDataService } from '../../services/worksheet-data.service';

@Component({
  selector: 'app-worksheet-preview',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="pages-viewport">
      <div id="printable-worksheet" class="all-pages-wrapper">

        <!-- ========================================================
             PÁGINA 1: CARÁTULA, DATOS DEL ALUMNO, OBJETIVOS Y NORMAS
             ======================================================== -->
        <div class="ht-page page-1">
          <div class="page-corner-tag no-print">Página 1 de 3</div>
          
          <!-- Encabezado Institucional Oficial Kinal -->
          <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>

          <!-- Tarjeta de Datos del Estudiante (image4.png con overlay milimétrico) -->
          <div class="student-card-container">
            <div class="student-banner-relative">
              <img src="assets/image4.png" alt="Cuadro de Datos del Alumno" class="student-card-img" />
              <span class="student-card-year">{{ ws().header.year }}</span>
              <div class="student-card-sublabels">
                <span class="lbl-part ap">APELLIDOS</span>
                <span class="lbl-part nom">NOMBRES</span>
                <span class="lbl-part car">No. CARNÉ</span>
                <span class="lbl-part fec">FECHA:</span>
              </div>
            </div>
          </div>

          <!-- SECCIÓN: OBJETIVOS -->
          <div class="section-divider-block">
            <div class="section-title-strip">
              <div class="section-title-box">OBJETIVOS</div>
              <div class="dotted-rule-extend"></div>
            </div>
            <ul class="red-triangle-list">
              <li>
                <span class="red-triangle">►</span>
                <span><strong>Calcular</strong> la rapidez, velocidad y tiempo mediante la aplicación de fórmulas del movimiento rectilíneo uniforme en ejercicios numéricos y contextos técnicos.</span>
              </li>
              <li>
                <span class="red-triangle">►</span>
                <span><strong>Interpretar</strong> gráficas de posición-tiempo y velocidad-tiempo para analizar el comportamiento del movimiento y determinar magnitudes físicas.</span>
              </li>
              <li>
                <span class="red-triangle">►</span>
                <span><strong>Resolver</strong> problemas prácticos que integren el uso de unidades, conversiones y relaciones entre las magnitudes del movimiento para verificar resultados coherentes.</span>
              </li>
            </ul>
          </div>

          <!-- SECCIÓN: DESCRIPCIÓN GENERAL DE LA ACTIVIDAD -->
          <div class="section-divider-block">
            <div class="section-title-strip">
              <div class="section-title-box">DESCRIPCIÓN GENERAL DE LA ACTIVIDAD</div>
              <div class="dotted-rule-extend"></div>
            </div>
            <p class="section-intro-text">Lee detenidamente las siguientes instrucciones:</p>
            <ol class="numbered-instruction-list">
              <li>Para realizar esta hoja de trabajo puedes <em><strong>imprimir</strong></em> este documento, trabajar en <em><strong>hojas adicionales o cuaderno</strong></em> copiando detalladamente y resolviendo cada ejercicio de la actividad.</li>
              <li>Es de carácter obligatorio realizar la hoja de trabajo en el salón de clase, siguiendo las indicaciones del docente a cargo del curso.</li>
              <li>Realiza la lectura del documento <em><strong>“Movimiento Rectilíneo Uniforme (MRU)”</strong></em>. Este documento lo podrás encontrar disponible en la plataforma <em><strong>Kinal.Academy</strong></em>, específicamente en <em><strong>Material de Apoyo</strong></em> del <em><strong>Bimestre 1 – Semana 1</strong></em> del curso <em><strong>Física II</strong></em>.</li>
              <li><em><strong>Sigue las instrucciones</strong></em> presentes en cada uno de los ejercicios propuestos en esta hoja de trabajo, deja constancia de los procedimientos matemáticos de ser necesarios.</li>
              <li><em><strong>Crea un documento PDF</strong></em> con imágenes de los ejercicios resueltos. Trata de que cada imagen sea lo más legible posible, con orientación vertical y en secuencia.</li>
              <li>Utiliza los ejercicios resueltos en esta hoja de trabajo para realizar la <em><strong>actividad en plataforma HT01: Movimiento Rectilíneo Uniforme (MRU)</strong></em>. En esta actividad deberás adjuntar el documento con las evidencias solicitado en la instrucción anterior.</li>
            </ol>

            <!-- Tabla de Fechas y Punteo con Texto Rojo y Filas Alternas -->
            <table class="milestones-table">
              <tbody>
                <tr class="row-white">
                  <td class="bullet-cell">•</td>
                  <td class="label-cell">Trabajo en clase (entrega presencial)</td>
                  <td class="date-cell"><span class="text-red">Inicio: 31/03/2025</span></td>
                  <td class="date-cell"><span class="text-red">Cierre: 06/04/2025</span></td>
                </tr>
                <tr class="row-shaded">
                  <td class="bullet-cell">•</td>
                  <td class="label-cell">Actividad en línea (entrega en plataforma)</td>
                  <td class="date-cell"><span class="text-red">Inicio: 21/04/2025</span></td>
                  <td class="date-cell"><span class="text-red">Cierre: 27/04/2025</span></td>
                </tr>
                <tr class="row-white">
                  <td class="bullet-cell">•</td>
                  <td class="label-cell">Días Disponibles para realizar le tarea</td>
                  <td class="date-cell" colspan="2"><span class="text-red-bold">27 días</span></td>
                </tr>
                <tr class="row-shaded">
                  <td class="bullet-cell">•</td>
                  <td class="label-cell">Punteo</td>
                  <td class="date-cell" colspan="2"><span class="text-red-bold">2.5 puntos</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- SECCIÓN: OBSERVACIONES GENERALES -->
          <div class="section-divider-block">
            <div class="section-title-strip">
              <div class="section-title-box">OBSERVACIONES GENERALES</div>
              <div class="dotted-rule-extend"></div>
            </div>
            <ol class="numbered-instruction-list">
              <li><strong>No se aceptan entregas de hojas de trabajo fuera de tiempo</strong>, debido a que cada actividad tiene como mínimo 5 días para la entrega.</li>
              <li><strong>Las entregas en plataforma no tienen reposición</strong>, dado que se encuentran habilitadas durante 7 días como mínimo.</li>
              <li><strong>Hojas de trabajo presenciales copiadas</strong> entre compañeros, serán anuladas.</li>
              <li>Las hojas de trabajo presenciales <strong>no tienen plan de mejoramiento (PMA).</strong></li>
              <li><strong>Entregas en plataforma sin documento PDF</strong> con evidencias serán anuladas.</li>
              <li><strong>Aproximaciones:</strong> Valores Mayores a 1 – usar 2 decimales, Valores Menores a 1: usar 3 decimales.</li>
            </ol>
          </div>

          @if (ws().mode === 'teacher') {
            <div class="teacher-watermark-strip">SOLUCIONARIO DOCENTE / CLAVE DE RESPUESTAS</div>
          }
        </div>

        <!-- ========================================================
             PÁGINA 2: EJERCICIOS (CAJA A 2 COLUMNAS)
             ======================================================== -->
        <div class="ht-page page-2">
          <div class="page-corner-tag no-print">Página 2 de 3</div>
          
          <!-- Encabezado Institucional Oficial Kinal -->
          <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>

          <!-- Título principal con línea punteada azul inferior completa -->
          <div class="page2-title-header">
            <h2 class="ht-bold-title">HT01: MOVIMIENTO RECTILÍNEO UNIFORME (MRU)</h2>
            <div class="page2-title-dotted-line"></div>
          </div>

          <!-- Recuadro Gris con Instrucciones Generales -->
          <div class="general-instructions-box">
            <u><strong>Instrucciones Generales:</strong></u> a continuación, encontrarás una serie de ejercicios los cuales debes resolver imprimiendo este documento o copiando en hojas adicionales/cuaderno a cuadros tamaño carta. Deja constancia de los procedimientos utilizados si los hubiese. Recuerda que puedes apoyarte con el <strong>Material de Apoyo, Bimestre 1, Semana 1 del curso de Física II</strong>, que puedes descargar en la plataforma <strong>Kinal.Academy</strong>.
          </div>

          <!-- CAJA DE EXAMEN ENMARCADA A 2 COLUMNAS (EXACTA DE WORD) -->
          <div class="exam-two-col-box">
            
            <!-- COLUMNA IZQUIERDA PÁGINA 2 -->
            <div class="col-half col-left">
              <div>
                <span class="forma-header-inline">Forma 1 – PREGUNTAS CONCEPTUALES</span>
              </div>
              <p class="forma-instructions">
                <strong>Instrucciones:</strong> lee con atención cada pregunta y asegúrate de comprender lo que se te solicita. Selecciona la opción que consideres correcta y marca la letra correspondiente. Justifica brevemente tu elección explicando el razonamiento que te llevó a esa respuesta y, cuando sea necesario, realiza los cálculos o conversiones de unidades de forma ordenada, dejando constancia de las operaciones realizadas para sustentar tu decisión.
              </p>

              <!-- Pregunta 1 -->
              <div class="exercise-block">
                <p class="ex-statement">
                  <strong>1)</strong> Si la velocidad promedio de un objeto es cero en cierto intervalo de tiempo, ¿qué puede afirmarse acerca del desplazamiento del objeto durante dicho intervalo?
                </p>
                <div class="ex-options">
                  <div class="opt-line"><span class="opt-label">a)</span> <span class="opt-text">El objeto aumentó su velocidad constantemente.</span></div>
                  <div class="opt-line"><span class="opt-label">b)</span> <span class="opt-text">El objeto recorrió una distancia, pero su posición final fue mayor que la inicial.</span></div>
                  <div class="opt-line" [class.teacher-correct]="ws().mode === 'teacher'"><span class="opt-label">c)</span> <span class="opt-text">El desplazamiento total del objeto es cero.</span></div>
                  <div class="opt-line"><span class="opt-label">d)</span> <span class="opt-text">El objeto se movió en línea recta con velocidad constante distinta de cero.</span></div>
                </div>
              </div>

              <!-- Pregunta 2 -->
              <div class="exercise-block">
                <p class="ex-statement">
                  <strong>2)</strong> ¿En qué condiciones la velocidad media es igual a la velocidad instantánea?
                </p>
                <div class="ex-options">
                  <div class="opt-line"><span class="opt-label">a)</span> <span class="opt-text">Cuando el objeto se desplaza con aceleración constante.</span></div>
                  <div class="opt-line" [class.teacher-correct]="ws().mode === 'teacher'"><span class="opt-label">b)</span> <span class="opt-text">Cuando el movimiento es rectilíneo y la velocidad permanece constante.</span></div>
                  <div class="opt-line"><span class="opt-label">c)</span> <span class="opt-text">Cuando el objeto cambia de dirección, pero mantiene la misma rapidez.</span></div>
                  <div class="opt-line"><span class="opt-label">d)</span> <span class="opt-text">Cuando el objeto se encuentra en reposo todo el tiempo.</span></div>
                </div>
              </div>

              <!-- Pregunta 3 -->
              <div class="exercise-block">
                <p class="ex-statement">
                  <strong>3)</strong> ¿En qué condiciones la magnitud de la velocidad media es igual a la rapidez media?
                </p>
                <div class="ex-options">
                  <div class="opt-line" [class.teacher-correct]="ws().mode === 'teacher'"><span class="opt-label">a)</span> <span class="opt-text">Cuando el movimiento es en línea recta sin cambio de sentido.</span></div>
                  <div class="opt-line"><span class="opt-label">b)</span> <span class="opt-text">Cuando el objeto cambia de dirección durante su movimiento.</span></div>
                  <div class="opt-line"><span class="opt-label">c)</span> <span class="opt-text">Cuando el objeto parte del reposo y luego acelera.</span></div>
                  <div class="opt-line"><span class="opt-label">d)</span> <span class="opt-text">Cuando el desplazamiento total del objeto es cero.</span></div>
                </div>
              </div>

              <!-- Pregunta 4 -->
              <div class="exercise-block">
                <p class="ex-statement">
                  <strong>4)</strong> En un movimiento en una dimensión, ¿cuándo coinciden el desplazamiento y la distancia recorrida?
                </p>
                <div class="ex-options">
                  <div class="opt-line"><span class="opt-label">a)</span> <span class="opt-text">Cuando el objeto se mueve con aceleración constante, sin importar la trayectoria.</span></div>
                  <div class="opt-line"><span class="opt-label">b)</span> <span class="opt-text">Cuando el objeto pasa varias veces por el mismo punto en direcciones opuestas.</span></div>
                  <div class="opt-line"><span class="opt-label">c)</span> <span class="opt-text">Siempre coinciden, independientemente del recorrido del objeto.</span></div>
                  <div class="opt-line" [class.teacher-correct]="ws().mode === 'teacher'"><span class="opt-label">d)</span> <span class="opt-text">Cuando el objeto se mueve en línea recta sin cambiar de sentido.</span></div>
                </div>
              </div>

            </div>

            <!-- COLUMNA DERECHA PÁGINA 2 -->
            <div class="col-half col-right">
              
              <!-- Pregunta 5 de Forma 1 -->
              <div class="exercise-block">
                <p class="ex-statement">
                  <strong>5)</strong> Dos móviles se desplazan en la misma dirección sobre una línea recta. El móvil A recorre 120 km en 2 horas, y el móvil B recorre 90 km en 1 hora. ¿Cuál de las siguientes afirmaciones es correcta sobre sus velocidades y desplazamientos?
                </p>
                <div class="ex-options">
                  <div class="opt-line"><span class="opt-label">a)</span> <span class="opt-text">La velocidad media de A es mayor que la de B.</span></div>
                  <div class="opt-line" [class.teacher-correct]="ws().mode === 'teacher'"><span class="opt-label">b)</span> <span class="opt-text">La velocidad media de B es mayor que la de A, pero el desplazamiento de A es mayor.</span></div>
                  <div class="opt-line"><span class="opt-label">c)</span> <span class="opt-text">Ambos tienen la misma velocidad media y el mismo desplazamiento.</span></div>
                  <div class="opt-line"><span class="opt-label">d)</span> <span class="opt-text">La velocidad media de B es menor que la de A, y el desplazamiento de B también es menor.</span></div>
                </div>
              </div>

              <!-- Forma 2 – PROBLEMAS DE APLICACIÓN -->
              <div>
                <span class="forma-header-inline margin-top-forma">Forma 2 – PROBLEMAS DE APLICACIÓN</span>
              </div>
              <p class="forma-instructions">
                <strong>Instrucciones:</strong> a continuación, se presenta una serie de problemas de aplicación los cuales debes resolver en hojas adicionales o cuaderno. Deja constancia de los procedimientos utilizados. Trabaje en orden y con limpieza.
              </p>

              <!-- Problema 1 -->
              <div class="exercise-block">
                <p class="ex-statement">
                  <strong>1)</strong> La rapidez de un impulso nervioso en el cuerpo humano es de aproximadamente 100 m/s. Si el dedo del pie de una persona promedio (169 cm) tropieza accidentalmente en la oscuridad, estime el tiempo que tarda el impulso nervioso en viajar a su cerebro.
                </p>
                <div class="official-resp-row">
                  <div class="resp-label">Resp.</div>
                  <div class="resp-value-box">
                    @if (ws().mode === 'teacher') {
                      <span class="teacher-answer">0.017 s</span>
                    }
                  </div>
                </div>
              </div>

              <!-- Problema 2 -->
              <div class="exercise-block">
                <p class="ex-statement">
                  <strong>2)</strong> Una persona camina, primero, con rapidez constante de 5.00 m/s a lo largo de una línea recta desde el punto “A” al punto “B” y luego de regreso a lo largo de la recta de “B” a “A” con una rapidez constante de 3.00 m/s.
                </p>
                <p class="sub-letter-text"><strong>(a)</strong> ¿Cuál es su rapidez media durante todo el viaje?</p>
                <p class="sub-letter-text"><strong>(b)</strong> ¿Cuál es su velocidad durante todo el viaje?</p>
                
                <div class="resp-stack">
                  <div class="official-resp-row">
                    <div class="resp-label">Resp.</div>
                    <div class="resp-value-box">
                      @if (ws().mode === 'teacher') {
                        <span class="teacher-answer">3.75 m/s</span>
                      }
                    </div>
                  </div>
                  <div class="official-resp-row">
                    <div class="resp-label">Resp.</div>
                    <div class="resp-value-box">
                      @if (ws().mode === 'teacher') {
                        <span class="teacher-answer">0.00 m/s</span>
                      }
                    </div>
                  </div>
                </div>
              </div>

              <!-- Problema 3 -->
              <div class="exercise-block">
                <p class="ex-statement">
                  <strong>3)</strong> Las placas norteamericana y europea de la corteza de la Tierra se estaban separando con un rapidez relativa de aproximadamente 25 mm/año. Considere la rapidez como constante y encuentre cuándo se empezó a abrir la brecha entre ellas, hasta alcanzar el ancho actual de 2.9 × 10³ <em>mi</em>.
                </p>
                <div class="official-resp-row">
                  <div class="resp-label">Resp.</div>
                  <div class="resp-value-box">
                    @if (ws().mode === 'teacher') {
                      <span class="teacher-answer">1.87 × 10⁸ años</span>
                    }
                  </div>
                </div>
              </div>

            </div>

          </div>

          @if (ws().mode === 'teacher') {
            <div class="teacher-watermark-strip">SOLUCIONARIO DOCENTE / CLAVE DE RESPUESTAS</div>
          }
        </div>

        <!-- ========================================================
             PÁGINA 3: EJERCICIOS CON GRÁFICAS (CAJA A 2 COLUMNAS)
             ======================================================== -->
        <div class="ht-page page-3">
          <div class="page-corner-tag no-print">Página 3 de 3</div>
          
          <!-- Encabezado Institucional Oficial Kinal -->
          <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>

          <!-- CAJA DE EXAMEN ENMARCADA A 2 COLUMNAS (EXACTA DE WORD) -->
          <div class="exam-two-col-box">
            
            <!-- COLUMNA IZQUIERDA PÁGINA 3 -->
            <div class="col-half col-left">
              
              <!-- Problema 4 -->
              <div class="exercise-block">
                <p class="ex-statement">
                  <strong>4)</strong> De acuerdo con una regla empírica, cada cinco segundos entre un relámpago y el siguiente trueno indican la distancia al relámpago en millas. Suponiendo que la luz del relámpago llega instantáneamente, estime la rapidez del sonido en m/s a partir de esta regla. ¿Cuál sería la regla en kilómetros en vez de millas?
                </p>
                <p class="formula-line">5 s → 1 milla</p>
                <div class="official-resp-row">
                  <div class="resp-label">Resp.</div>
                  <div class="resp-value-box">
                    @if (ws().mode === 'teacher') {
                      <span class="teacher-answer">321.87 m/s (Regla km: 3.11 s / km)</span>
                    }
                  </div>
                </div>
              </div>

              <!-- Problema 5 -->
              <div class="exercise-block">
                <p class="ex-statement">
                  <strong>5)</strong> Usted va conduciendo un automóvil de la escuela a la casa a 95 km/h de manera uniforme a lo largo de 130 km. Empieza a llover, baja la velocidad a 65 km/h y llega a casa después de conducir durante 3 horas y 20 minutos.
                </p>
                <p class="sub-letter-text"><strong>(a)</strong> ¿Qué tan lejos está su casa de la escuela?</p>
                <p class="sub-letter-text"><strong>(b)</strong> ¿Cuál fue la rapidez promedio.</p>
                <div class="resp-stack">
                  <div class="official-resp-row">
                    <div class="resp-label">Resp.</div>
                    <div class="resp-value-box">
                      @if (ws().mode === 'teacher') {
                        <span class="teacher-answer">257.72 km</span>
                      }
                    </div>
                  </div>
                  <div class="official-resp-row">
                    <div class="resp-label">Resp.</div>
                    <div class="resp-value-box">
                      @if (ws().mode === 'teacher') {
                        <span class="teacher-answer">77.32 km/h</span>
                      }
                    </div>
                  </div>
                </div>
              </div>

              <!-- Problema 6 (Gráfica x vs t) -->
              <div class="exercise-block">
                <p class="ex-statement">
                  <strong>6)</strong> Observa y analiza el siguiente gráfico:
                </p>
                <div class="graph-figure-wrap">
                  <img src="assets/image5.jpeg" alt="Gráfica x vs t" class="graph-img-fit" />
                </div>

                <p class="realice-title"><u><strong>Realice:</strong></u></p>
                <p class="sub-letter-text">
                  <strong>(a)</strong> Determine el desplazamiento en los intervalos de tiempo de (0 – 3) y de (10 – 12) segundos.
                </p>

                <!-- Tabla Intervalo Tiempo | Respuesta -->
                <table class="exam-table-answer">
                  <thead>
                    <tr>
                      <th>Intervalo Tiempo</th>
                      <th>Respuesta</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="tbl-col-key">0 – 3</td>
                      <td class="tbl-col-val">
                        @if (ws().mode === 'teacher') {
                          <span class="teacher-answer">90.00 km</span>
                        }
                      </td>
                    </tr>
                    <tr>
                      <td class="tbl-col-key">10 – 12</td>
                      <td class="tbl-col-val">
                        @if (ws().mode === 'teacher') {
                          <span class="teacher-answer">-30.00 km</span>
                        }
                      </td>
                    </tr>
                  </tbody>
                </table>

                <p class="sub-letter-text">
                  <strong>(b)</strong> Determine la velocidad media en el intervalo (6 – 8) segundos.
                </p>
                <div class="official-resp-row">
                  <div class="resp-label">Resp.</div>
                  <div class="resp-value-box">
                    @if (ws().mode === 'teacher') {
                      <span class="teacher-answer">-15.00 km/h</span>
                    }
                  </div>
                </div>
              </div>

            </div>

            <!-- COLUMNA DERECHA PÁGINA 3 -->
            <div class="col-half col-right">
              
              <!-- Continuación del Problema 6 -->
              <div class="exercise-block">
                <p class="sub-letter-text">
                  <strong>(c)</strong> Determine la rapidez media en el intervalo de (12 – 15) segundos.
                </p>
                <div class="official-resp-row">
                  <div class="resp-label">Resp.</div>
                  <div class="resp-value-box">
                    @if (ws().mode === 'teacher') {
                      <span class="teacher-answer">6.67 km/h</span>
                    }
                  </div>
                </div>

                <p class="sub-letter-text">
                  <strong>(d)</strong> Determine el desplazamiento total realizado
                </p>
                <div class="official-resp-row">
                  <div class="resp-label">Resp.</div>
                  <div class="resp-value-box">
                    @if (ws().mode === 'teacher') {
                      <span class="teacher-answer">50.00 km</span>
                    }
                  </div>
                </div>

                <p class="sub-letter-text">
                  <strong>(e)</strong> Determine la distancia total recorrida.
                </p>
                <div class="official-resp-row">
                  <div class="resp-label">Resp.</div>
                  <div class="resp-value-box">
                    @if (ws().mode === 'teacher') {
                      <span class="teacher-answer">170.00 km</span>
                    }
                  </div>
                </div>
              </div>

              <!-- Problema 7 (Gráfica V vs t) -->
              <div class="exercise-block margin-top-prob7">
                <p class="ex-statement">
                  <strong>7)</strong> Observa y analiza el siguiente gráfico:
                </p>
                <div class="graph-figure-wrap">
                  <img src="assets/image6.jpeg" alt="Gráfica V vs t" class="graph-img-fit" />
                </div>

                <p class="realice-title"><u><strong>Realice:</strong></u></p>
                <p class="sub-letter-text">
                  <strong>(a)</strong> Calcula la distancia total recorrida por el móvil. <strong>Recuerda</strong> que en un gráfico de velocidad vs. tiempo, la distancia se obtiene calculando el área bajo la curva, tomando todos los valores como positivos.
                </p>
                <div class="official-resp-row">
                  <div class="resp-label">Resp.</div>
                  <div class="resp-value-box">
                    @if (ws().mode === 'teacher') {
                      <span class="teacher-answer">175.00 m</span>
                    }
                  </div>
                </div>

                <p class="sub-letter-text">
                  <strong>(b)</strong> Determina el desplazamiento total del móvil al finalizar los 15 segundos. <strong>Considera</strong> el signo de la velocidad para obtener la suma algebraica de los desplazamientos.
                </p>
                <div class="official-resp-row">
                  <div class="resp-label">Resp.</div>
                  <div class="resp-value-box">
                    @if (ws().mode === 'teacher') {
                      <span class="teacher-answer">145.00 m</span>
                    }
                  </div>
                </div>

                <p class="sub-letter-text">
                  <strong>(c)</strong> Calcula la velocidad y rapidez media de 0 a 7 segundos.
                </p>
                <table class="exam-table-answer mini-table">
                  <tbody>
                    <tr>
                      <td class="tbl-col-key-white"><em>V<sub>media</sub></em></td>
                      <td class="tbl-col-val">
                        @if (ws().mode === 'teacher') {
                          <span class="teacher-answer">20.71 m/s</span>
                        }
                      </td>
                    </tr>
                    <tr>
                      <td class="tbl-col-key-white"><em>v<sub>media</sub></em></td>
                      <td class="tbl-col-val">
                        @if (ws().mode === 'teacher') {
                          <span class="teacher-answer">20.71 m/s</span>
                        }
                      </td>
                    </tr>
                  </tbody>
                </table>

                <p class="sub-letter-text">
                  <strong>(d)</strong> Calcula la velocidad media del móvil durante los 15 segundos.
                </p>
                <div class="official-resp-row">
                  <div class="resp-label">Resp.</div>
                  <div class="resp-value-box">
                    @if (ws().mode === 'teacher') {
                      <span class="teacher-answer">9.67 m/s</span>
                    }
                  </div>
                </div>

              </div>

            </div>

          </div>

          @if (ws().mode === 'teacher') {
            <div class="teacher-watermark-strip">SOLUCIONARIO DOCENTE / CLAVE DE RESPUESTAS</div>
          }
        </div>

      </div>
    </div>

    <!-- TEMPLATE DEL ENCABEZADO INSTITUCIONAL OFICIAL (KINAL) -->
    <ng-template #headerTemplate>
      <div class="official-header-row">
        <div class="header-col-left">
          <img src="assets/image1.jpeg" alt="KINAL Diversificado" class="official-kinal-logo" />
        </div>
        
        <div class="header-col-center">
          <div class="header-unit-txt">{{ ws().header.unitTitle }}</div>
          <div class="header-code-subrow">
            <span class="code-txt">{{ ws().header.sectionCodeLabel }}</span>
            <div class="code-empty-box"></div>
          </div>
        </div>

        <div class="header-col-right">
          <div class="header-course-txt">{{ ws().header.courseTitle }}</div>
          <div class="header-ht-txt">{{ ws().header.htCodeAndTitle }}</div>
        </div>
      </div>
    </ng-template>
  `,
  styles: [`
    .pages-viewport {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1.5rem 1rem 3rem;
      background: #0b1120;
      min-height: calc(100vh - 65px);
      overflow-y: auto;
    }

    .all-pages-wrapper {
      display: flex;
      flex-direction: column;
      gap: 28px;
    }

    /* PÁGINAS FÍSICAS EXACTAS (CARTA / LETTER 8.5 x 11 in) */
    .ht-page {
      width: 215.9mm;
      min-height: 279.4mm;
      background: #ffffff;
      color: #000000;
      padding: 7.5mm 10.5mm 8.5mm;
      box-shadow: 0 12px 36px rgba(0, 0, 0, 0.75);
      border-radius: 1px;
      font-family: Calibri, 'Segoe UI', Arial, sans-serif;
      font-size: 8.5pt;
      line-height: 1.30;
      position: relative;
      box-sizing: border-box;
    }

    .page-corner-tag {
      position: absolute;
      top: -20px;
      right: 0;
      font-size: 0.7rem;
      color: #94a3b8;
      font-weight: 600;
    }

    /* ENCABEZADO INSTITUCIONAL OFICIAL (KINAL) */
    .official-header-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 5px;
    }

    .header-col-left {
      flex: 1.1;
    }

    .official-kinal-logo {
      height: 42px;
      max-width: 175px;
      object-fit: contain;
      display: block;
    }

    .header-col-center {
      flex: 1.9;
      text-align: center;
    }

    .header-unit-txt {
      font-size: 18pt;
      font-weight: 800;
      color: #000000;
      line-height: 1.05;
      font-family: Calibri, Arial, sans-serif;
    }

    .header-code-subrow {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 7.5pt;
      font-family: Arial, Calibri, sans-serif;
      color: #000000;
      margin-top: 1px;
    }

    .code-empty-box {
      width: 64px;
      height: 18px;
      border: 1.2px solid #000000;
      border-radius: 5px;
      background: #ffffff;
    }

    .header-col-right {
      flex: 1.9;
      text-align: right;
    }

    .header-course-txt {
      font-size: 17pt;
      font-weight: 800;
      color: #000000;
      line-height: 1.05;
      font-family: Calibri, Arial, sans-serif;
    }

    .header-ht-txt {
      font-size: 8pt;
      font-weight: 700;
      color: #000000;
      margin-top: 2px;
    }

    /* TARJETA DE ESTUDIANTE (image4.png DEL WORD CON OVERLAY DE LABELS Y AÑO) */
    .student-card-container {
      margin-bottom: 8px;
    }

    .student-banner-relative {
      position: relative;
      width: 100%;
    }

    .student-card-img {
      width: 100%;
      height: auto;
      display: block;
    }

    .student-card-year {
      position: absolute;
      top: 31%;
      right: 4.8%;
      transform: translateY(-50%);
      font-size: 13pt;
      font-weight: 800;
      color: #000000;
      font-family: Arial, sans-serif;
    }

    .student-card-sublabels {
      position: absolute;
      bottom: 5px;
      left: 0;
      width: 100%;
      height: 12px;
      font-family: 'Century Gothic', Questrial, Arial, sans-serif;
      font-size: 6.5pt;
      font-weight: 700;
      color: #1e293b;
      text-transform: uppercase;
      pointer-events: none;
    }

    .lbl-part.ap {
      position: absolute;
      left: 0.8%;
      width: 26.2%;
      text-align: center;
    }

    .lbl-part.nom {
      position: absolute;
      left: 27.2%;
      width: 22.7%;
      text-align: center;
    }

    .lbl-part.car {
      position: absolute;
      left: 52.5%;
      width: 25.1%;
      text-align: center;
    }

    .lbl-part.fec {
      position: absolute;
      left: 79.8%;
      width: 10.7%;
      text-align: center;
    }

    /* SECCIONES: CUADRO CON FONDO #DEEAF6, BORDE DISCONTINUO AZUL #006FC0 Y LÍNEA DE PUNTOS */
    .section-divider-block {
      margin-bottom: 9px;
    }

    .section-title-strip {
      display: flex;
      align-items: flex-end;
      margin-bottom: 4px;
      gap: 6px;
    }

    .section-title-box {
      background: #deeaf6;
      border: 1px dashed #006fc0;
      padding: 2px 14px;
      font-size: 9.5pt;
      font-weight: 700;
      color: #000000;
      letter-spacing: 0.03em;
      white-space: nowrap;
      font-family: 'EB Garamond', Garamond, 'Times New Roman', Georgia, serif;
      text-transform: uppercase;
    }

    .dotted-rule-extend {
      flex: 1;
      height: 1px;
      border-bottom: 1.5px dotted #006fc0;
      margin-bottom: 1px;
    }

    .red-triangle-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .red-triangle-list li {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      margin-bottom: 3.5px;
      font-size: 8.5pt;
      line-height: 1.33;
      text-align: justify;
    }

    .red-triangle {
      color: #c00000;
      font-size: 7.5pt;
      line-height: 1.3;
    }

    .section-intro-text {
      font-size: 8.5pt;
      margin: 0 0 3px;
    }

    .numbered-instruction-list {
      padding-left: 18px;
      margin: 0 0 5px;
      font-size: 8pt;
      line-height: 1.33;
      text-align: justify;
    }

    .numbered-instruction-list li {
      margin-bottom: 2.5px;
    }

    /* TABLA DE FECHAS (MILESTONES CON TEXTO ROJO #C00000 Y FILAS ALTERNAS) */
    .milestones-table {
      width: 100%;
      border-collapse: collapse;
      margin: 5px 0;
      font-size: 8pt;
      border-top: 1px solid #cbd5e1;
      border-bottom: 1px solid #cbd5e1;
    }

    .milestones-table tr {
      border-bottom: 1px solid #e2e8f0;
    }

    .milestones-table tr.row-shaded {
      background-color: #f1f5f9;
    }

    .milestones-table tr.row-white {
      background-color: #ffffff;
    }

    .milestones-table td {
      padding: 2.5px 5px;
    }

    .bullet-cell {
      width: 14px;
      font-weight: 800;
      color: #000000;
      padding-right: 0 !important;
    }

    .label-cell {
      font-weight: 700;
      color: #000000;
      width: 44%;
    }

    .date-cell {
      width: 28%;
    }

    .text-red {
      color: #c00000;
      font-weight: 700;
    }

    .text-red-bold {
      color: #c00000;
      font-weight: 800;
    }

    /* PÁGINA 2: TÍTULO Y LÍNEA PUNTEADA AZUL */
    .page2-title-header {
      text-align: center;
      margin-bottom: 4px;
    }

    .ht-bold-title {
      font-size: 10pt;
      font-weight: 800;
      margin: 0 0 2px;
      font-family: 'Century Gothic', Questrial, Calibri, Arial, sans-serif;
      color: #000000;
      letter-spacing: 0.02em;
    }

    .page2-title-dotted-line {
      width: 100%;
      height: 1px;
      border-bottom: 1.5px dotted #006fc0;
      margin-bottom: 5px;
    }

    /* RECUADRO GRIS PARA INSTRUCCIONES GENERALES */
    .general-instructions-box {
      background: #f1f5f9;
      border: 1px solid #e2e8f0;
      padding: 4px 6px;
      font-size: 7.6pt;
      line-height: 1.28;
      text-align: justify;
      margin-bottom: 5px;
      font-family: 'Century Gothic', Questrial, Calibri, Arial, sans-serif;
    }

    /* CAJA DE EXAMEN ENMARCADA A 2 COLUMNAS (EXACTA DE WORD EN CENTURY GOTHIC) */
    .exam-two-col-box {
      border: 1px solid #000000;
      display: grid;
      grid-template-columns: 1fr 1fr;
      min-height: 204mm;
      font-family: 'Century Gothic', Questrial, Calibri, Arial, sans-serif;
    }

    .col-half {
      padding: 5px 8px;
      display: flex;
      flex-direction: column;
    }

    .col-left {
      border-right: 1px solid #000000;
    }

    /* RÓTULOS DE FORMA: TEXTO CON RESALTADO GRIS #E2E8F0 SIN BORDE EXTERIOR */
    .forma-header-inline {
      background: #e2e8f0;
      font-weight: 800;
      font-size: 7.8pt;
      padding: 1px 4px;
      display: inline-block;
      margin-bottom: 3px;
      text-transform: uppercase;
    }

    .forma-instructions {
      font-size: 6.8pt;
      line-height: 1.22;
      text-align: justify;
      margin: 0 0 5px;
    }

    .margin-top-forma {
      margin-top: 6px;
    }

    /* EJERCICIOS */
    .exercise-block {
      margin-bottom: 6px;
      font-size: 7.5pt;
      line-height: 1.26;
    }

    .ex-statement {
      margin: 0 0 2.5px;
      text-align: justify;
    }

    .ex-options {
      padding-left: 6px;
      display: flex;
      flex-direction: column;
      gap: 1.5px;
    }

    .opt-line {
      display: flex;
      gap: 4px;
      align-items: baseline;
      font-size: 7.2pt;
    }

    .opt-label {
      font-weight: 700;
      min-width: 12px;
    }

    .opt-text {
      flex: 1;
    }

    .teacher-correct {
      background: #ecfdf5;
      color: #065f46;
      font-weight: 700;
      border-radius: 2px;
      padding: 0 2px;
    }

    .sub-letter-text {
      margin: 2px 0 2px 4px;
      font-size: 7.2pt;
    }

    .formula-line {
      margin: 2px 0 3px 6px;
      font-weight: 700;
      font-size: 7.5pt;
    }

    .realice-title {
      margin: 3px 0 2px;
      font-size: 7.5pt;
    }

    /* CASILLA OFICIAL DE RESPUESTA [ Resp. ] [ ____________ ] */
    .official-resp-row {
      display: flex;
      border: 1px solid #000000;
      height: 22px;
      margin: 3px 0 4px;
      width: 100%;
    }

    .resp-label {
      background: #deeaf6;
      border-right: 1px solid #000000;
      font-weight: 800;
      font-size: 7.8pt;
      width: 52px;
      display: flex;
      align-items: center;
      justify-content: center;
      user-select: none;
    }

    .resp-value-box {
      flex: 1;
      background: #ffffff;
      display: flex;
      align-items: center;
      padding: 0 8px;
    }

    .resp-stack {
      display: flex;
      flex-direction: column;
      gap: 2.5px;
      margin: 3px 0 4px;
    }

    .teacher-answer {
      font-weight: 700;
      color: #047857;
      font-size: 7.5pt;
    }

    /* TABLA DE RESPUESTAS OFICIAL */
    .exam-table-answer {
      width: 100%;
      border-collapse: collapse;
      margin: 3px 0 4px;
      font-size: 7.2pt;
    }

    .exam-table-answer th,
    .exam-table-answer td {
      border: 1px solid #000000;
      padding: 2.5px 5px;
      text-align: center;
    }

    .exam-table-answer th {
      background: #deeaf6;
      font-weight: 800;
    }

    .tbl-col-key {
      font-weight: 700;
      width: 48%;
      background: #ffffff;
    }

    .tbl-col-key-white {
      font-weight: 700;
      width: 48%;
      background: #ffffff;
      font-style: italic;
    }

    .tbl-col-val {
      height: 18px;
      background: #ffffff;
    }

    .mini-table {
      width: 82%;
      margin: 3px auto 4px;
    }

    /* GRÁFICAS */
    .graph-figure-wrap {
      text-align: center;
      margin: 3px 0;
    }

    .graph-img-fit {
      max-width: 96%;
      max-height: 155px;
      object-fit: contain;
    }

    .margin-top-prob7 {
      margin-top: 5px;
    }

    /* MARCA DE AGUA DOCENTE */
    .teacher-watermark-strip {
      background: #dcfce7;
      color: #15803d;
      border: 1px dashed #22c55e;
      text-align: center;
      font-weight: 800;
      font-size: 7.5pt;
      padding: 3px;
      margin-top: 8px;
      letter-spacing: 0.05em;
    }
  `]
})
export class WorksheetPreviewComponent {
  readonly dataService = inject(WorksheetDataService);
  readonly ws = this.dataService.worksheet;
}
