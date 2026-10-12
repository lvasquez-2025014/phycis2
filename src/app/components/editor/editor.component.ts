import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorksheetDataService } from '../../services/worksheet-data.service';
import { ExerciseItem, SubQuestion } from '../../models/worksheet.model';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <aside class="editor-sidebar no-print">
      <div class="sidebar-header">
        <h2>Editor de Hoja de Trabajo</h2>
        <span class="badge">Estructura Kinal HT</span>
      </div>

      <!-- PESTAÑAS DEL EDITOR -->
      <nav class="editor-tabs">
        <button 
          type="button" 
          class="tab-btn" 
          [class.active]="activeTab === 'exercises'" 
          (click)="activeTab = 'exercises'">
          📝 Ejercicios
        </button>
        <button 
          type="button" 
          class="tab-btn" 
          [class.active]="activeTab === 'page1'" 
          (click)="activeTab = 'page1'">
          📄 Portada & Normas
        </button>
        <button 
          type="button" 
          class="tab-btn" 
          [class.active]="activeTab === 'header'" 
          (click)="activeTab = 'header'">
          🏫 Encabezado
        </button>
      </nav>

      <div class="sidebar-body">
        
        <!-- ==========================================
             PESTAÑA 1: EJERCICIOS Y SECCIONES
             ========================================== -->
        @if (activeTab === 'exercises') {
          <div class="tab-content">
            
            <div class="section-actions-top">
              <button type="button" class="btn-action-primary" (click)="dataService.addSection()">
                + Nueva Sección
              </button>
            </div>

            @for (sec of ws().sections; track sec.id; let sIdx = $index) {
              <div class="editor-card section-card">
                <div class="card-header section-card-header">
                  <div class="section-title-edit">
                    <span class="sec-badge">Sección {{ sIdx + 1 }}</span>
                    <input 
                      type="text" 
                      class="input-title" 
                      [(ngModel)]="sec.title" 
                      (ngModelChange)="onModelChange()"
                      placeholder="Título de la sección (ej: Forma 1...)" />
                  </div>
                  <button 
                    type="button" 
                    class="btn-icon danger" 
                    (click)="dataService.removeSection(sec.id)"
                    title="Eliminar sección">
                    ✕
                  </button>
                </div>

                <div class="card-body">
                  <div class="form-group">
                    <label>Instrucciones de la sección:</label>
                    <textarea 
                      rows="2" 
                      class="input-textarea" 
                      [(ngModel)]="sec.instructions" 
                      (ngModelChange)="onModelChange()"
                      placeholder="Instrucciones para los alumnos..."></textarea>
                  </div>

                  <!-- BOTONES PARA AÑADIR EJERCICIOS -->
                  <div class="add-exercise-buttons">
                    <button 
                      type="button" 
                      class="btn-chip" 
                      (click)="dataService.addExercise(sec.id, 'multiple_choice')">
                      + Opción Múltiple
                    </button>
                    <button 
                      type="button" 
                      class="btn-chip" 
                      (click)="dataService.addExercise(sec.id, 'application_problem')">
                      + Problema con Resp.
                    </button>
                    <button 
                      type="button" 
                      class="btn-chip" 
                      (click)="dataService.addExercise(sec.id, 'graph_table')">
                      + Con Gráfica / Tabla
                    </button>
                  </div>

                  <!-- LISTA DE EJERCICIOS -->
                  <div class="exercises-wrapper">
                    @for (item of sec.items; track item.id; let iIdx = $index) {
                      <div class="exercise-item-editor">
                        <div class="item-editor-header">
                          <div class="item-badge-group">
                            <span class="item-num">#{{ item.number }}</span>
                            <span class="item-type-badge">{{ item.type }}</span>
                          </div>
                          <div class="item-actions">
                            <button 
                              type="button" 
                              class="btn-icon" 
                              (click)="dataService.duplicateExercise(sec.id, item)"
                              title="Duplicar">
                              📋
                            </button>
                            <button 
                              type="button" 
                              class="btn-icon danger" 
                              (click)="dataService.removeExercise(sec.id, item.id)"
                              title="Eliminar">
                              🗑️
                            </button>
                          </div>
                        </div>

                        <!-- REDACCIÓN DEL PROBLEMA -->
                        <div class="form-group">
                          <label>Enunciado del problema:</label>
                          <textarea 
                            rows="3" 
                            class="input-textarea" 
                            [(ngModel)]="item.prompt" 
                            (ngModelChange)="onModelChange()"
                            placeholder="Redacta detalladamente el problema..."></textarea>
                        </div>

                        <!-- FÓRMULA O DATO RESALTADO -->
                        <div class="form-group">
                          <label>Dato o regla resaltada (opcional, ej: 5 s → 1 milla):</label>
                          <input 
                            type="text" 
                            class="input-text" 
                            [(ngModel)]="item.promptFormula" 
                            (ngModelChange)="onModelChange()"
                            placeholder="ej: 5 s → 1 milla" />
                        </div>

                        <!-- IMAGEN / GRÁFICA -->
                        <div class="image-upload-box">
                          <label>Gráfica del ejercicio:</label>
                          <div class="image-controls">
                            <input 
                              type="text" 
                              class="input-text" 
                              [(ngModel)]="item.imageUrl" 
                              (ngModelChange)="onModelChange()"
                              placeholder="URL de la imagen (/assets/image5.jpeg)..." />
                            <label class="btn-file-upload">
                              📁 Subir imagen
                              <input 
                                type="file" 
                                accept="image/*" 
                                (change)="onImageFileSelected($event, item)" 
                                style="display: none;" />
                            </label>
                          </div>
                          @if (item.imageUrl) {
                            <div class="img-preview-mini">
                              <img [src]="item.imageUrl" alt="Preview" />
                            </div>
                          }
                        </div>

                        <!-- OPCIONES DE OPCIÓN MÚLTIPLE -->
                        @if (item.type === 'multiple_choice' && item.options) {
                          <div class="options-editor">
                            <label>Opciones (marca la respuesta correcta):</label>
                            @for (opt of item.options; track opt.letter) {
                              <div class="option-row-edit">
                                <label class="radio-correct-label">
                                  <input 
                                    type="radio" 
                                    [name]="'correct_' + item.id" 
                                    [checked]="opt.isCorrect" 
                                    (change)="setCorrectOption(item, opt.letter)" />
                                  <span class="letter-badge">{{ opt.letter }})</span>
                                </label>
                                <input 
                                  type="text" 
                                  class="input-text" 
                                  [(ngModel)]="opt.text" 
                                  (ngModelChange)="onModelChange()" />
                              </div>
                            }
                          </div>
                        }

                        <!-- SUBPREGUNTAS / INCISOS -->
                        @if (item.subQuestions && item.subQuestions.length > 0) {
                          <div class="subquestions-editor">
                            <div class="sub-header-row">
                              <label>Incisos (a, b, c...):</label>
                              <button type="button" class="btn-link" (click)="addSubQuestion(item)">+ Añadir Inciso</button>
                            </div>
                            @for (sub of item.subQuestions; track sub.id; let subIdx = $index) {
                              <div class="subquestion-edit-card">
                                <div class="sub-row-1">
                                  <input 
                                    type="text" 
                                    class="input-text letter-input" 
                                    [(ngModel)]="sub.letter" 
                                    (ngModelChange)="onModelChange()"
                                    placeholder="(a)" />
                                  <input 
                                    type="text" 
                                    class="input-text flex-1" 
                                    [(ngModel)]="sub.text" 
                                    (ngModelChange)="onModelChange()"
                                    placeholder="Enunciado del inciso..." />
                                  <button type="button" class="btn-icon danger-small" (click)="removeSubQuestion(item, subIdx)">✕</button>
                                </div>
                                
                                <!-- Respuesta para el inciso -->
                                @if (sub.answerSlots && sub.answerSlots.length > 0) {
                                  <div class="sub-ans-row">
                                    <span class="badge-mini">Resp.</span>
                                    <input 
                                      type="text" 
                                      class="input-text teacher-val-input" 
                                      [(ngModel)]="sub.answerSlots[0].value" 
                                      (ngModelChange)="onModelChange()"
                                      placeholder="Solución para clave docente..." />
                                  </div>
                                }
                              </div>
                            }
                          </div>
                        } @else if (item.type !== 'multiple_choice') {
                          <div class="add-sub-prompt">
                            <button type="button" class="btn-link" (click)="addSubQuestion(item)">+ Dividir en incisos (a, b, c...)</button>
                          </div>
                        }

                        <!-- CAJAS DE RESPUESTA DIRECTA [ Resp. ] -->
                        @if (item.answerSlots && item.answerSlots.length > 0) {
                          <div class="answerslots-editor">
                            <div class="sub-header-row">
                              <label>Casilla de respuesta oficial [ Resp. ]:</label>
                              <button type="button" class="btn-link" (click)="addAnswerSlot(item)">+ Otra casilla Resp.</button>
                            </div>
                            @for (ans of item.answerSlots; track $index; let aIdx = $index) {
                              <div class="answerslot-row-edit">
                                <span class="badge-mini">{{ ans.label }}</span>
                                <input 
                                  type="text" 
                                  class="input-text teacher-val-input" 
                                  [(ngModel)]="ans.value" 
                                  (ngModelChange)="onModelChange()"
                                  placeholder="Valor de respuesta para solucionario..." />
                                <button type="button" class="btn-icon danger-small" (click)="removeAnswerSlot(item, aIdx)">✕</button>
                              </div>
                            }
                          </div>
                        }

                        <!-- SOLUCIÓN DOCENTE / EXPLICACIÓN -->
                        <div class="teacher-sol-field">
                          <label>Solución o Justificación Docente:</label>
                          <textarea 
                            rows="2" 
                            class="input-textarea teacher-textarea" 
                            [(ngModel)]="item.teacherSolution" 
                            (ngModelChange)="onModelChange()"
                            placeholder="Cálculos, justificación y resultado final..."></textarea>
                        </div>

                      </div>
                    }
                  </div>
                </div>
              </div>
            }
          </div>
        }

        <!-- ==========================================
             PESTAÑA 2: PORTADA, OBJETIVOS Y NORMAS
             ========================================== -->
        @if (activeTab === 'page1') {
          <div class="tab-content">
            
            <!-- OBJETIVOS -->
            <div class="editor-card">
              <div class="card-header">
                <h3>Objetivos de Aprendizaje (Página 1)</h3>
              </div>
              <div class="card-body">
                @for (obj of ws().objectives; track obj.id; let oIdx = $index) {
                  <div class="item-row-edit">
                    <span class="red-triangle">►</span>
                    <textarea 
                      rows="2" 
                      class="input-textarea" 
                      [(ngModel)]="obj.text" 
                      (ngModelChange)="onModelChange()"></textarea>
                    <button type="button" class="btn-icon danger-small" (click)="removeObjective(oIdx)">✕</button>
                  </div>
                }
                <button type="button" class="btn-chip" (click)="addObjective()">+ Añadir Objetivo</button>
              </div>
            </div>

            <!-- INSTRUCCIONES GENERALES -->
            <div class="editor-card">
              <div class="card-header">
                <h3>Descripción General de la Actividad</h3>
              </div>
              <div class="card-body">
                @for (pt of ws().generalDescriptionPoints; track $index; let pIdx = $index) {
                  <div class="item-row-edit">
                    <textarea 
                      rows="2" 
                      class="input-textarea" 
                      [(ngModel)]="ws().generalDescriptionPoints[pIdx]" 
                      (ngModelChange)="onModelChange()"></textarea>
                    <button type="button" class="btn-icon danger-small" (click)="removeDescriptionPoint(pIdx)">✕</button>
                  </div>
                }
                <button type="button" class="btn-chip" (click)="addDescriptionPoint()">+ Añadir Punto</button>
              </div>
            </div>

            <!-- HITOS Y FECHAS DE ENTREGA -->
            <div class="editor-card">
              <div class="card-header">
                <h3>Cronograma de Entrega y Punteo (Texto Rojo)</h3>
              </div>
              <div class="card-body">
                @for (m of ws().milestones; track $index; let mIdx = $index) {
                  <div class="milestone-edit-card">
                    <input 
                      type="text" 
                      class="input-text font-bold" 
                      [(ngModel)]="m.label" 
                      (ngModelChange)="onModelChange()"
                      placeholder="Etiqueta (ej: Trabajo en clase...)" />
                    @if (m.startText !== undefined) {
                      <div class="form-row-2">
                        <input 
                          type="text" 
                          class="input-text red-input" 
                          [(ngModel)]="m.startText" 
                          (ngModelChange)="onModelChange()"
                          placeholder="Inicio: dd/mm/aaaa" />
                        <input 
                          type="text" 
                          class="input-text red-input" 
                          [(ngModel)]="m.endText" 
                          (ngModelChange)="onModelChange()"
                          placeholder="Cierre: dd/mm/aaaa" />
                      </div>
                    } @else {
                      <input 
                        type="text" 
                        class="input-text red-input" 
                        [(ngModel)]="m.highlightText" 
                        (ngModelChange)="onModelChange()"
                        placeholder="Texto resaltado en rojo (ej: 2.5 puntos)" />
                    }
                  </div>
                }
              </div>
            </div>

            <!-- OBSERVACIONES GENERALES -->
            <div class="editor-card">
              <div class="card-header">
                <h3>Observaciones Generales</h3>
              </div>
              <div class="card-body">
                @for (obs of ws().observations; track $index; let oIdx = $index) {
                  <div class="item-row-edit">
                    <input 
                      type="text" 
                      class="input-text" 
                      [(ngModel)]="ws().observations[oIdx]" 
                      (ngModelChange)="onModelChange()" />
                    <button type="button" class="btn-icon danger-small" (click)="removeObservation(oIdx)">✕</button>
                  </div>
                }
                <button type="button" class="btn-chip" (click)="addObservation()">+ Añadir Observación</button>
              </div>
            </div>

          </div>
        }

        <!-- ==========================================
             PESTAÑA 3: ENCABEZADO INSTITUCIONAL
             ========================================== -->
        @if (activeTab === 'header') {
          <div class="tab-content">
            <div class="editor-card">
              <div class="card-header">
                <h3>Membrete Institucional (Todas las páginas)</h3>
              </div>
              <div class="card-body">
                <div class="form-group">
                  <label>Título Central (ej: Unidad 1):</label>
                  <input 
                    type="text" 
                    class="input-text" 
                    [(ngModel)]="ws().header.unitTitle" 
                    (ngModelChange)="onModelChange()" />
                </div>

                <div class="form-group">
                  <label>Materia / Nivel (ej: Física II – Quinto):</label>
                  <input 
                    type="text" 
                    class="input-text" 
                    [(ngModel)]="ws().header.courseTitle" 
                    (ngModelChange)="onModelChange()" />
                </div>

                <div class="form-group">
                  <label>Código y Título de Tarea (ej: HT01: Movimiento Rectilíneo Uniforme):</label>
                  <input 
                    type="text" 
                    class="input-text" 
                    [(ngModel)]="ws().header.htCodeAndTitle" 
                    (ngModelChange)="onModelChange()" />
                </div>

                <div class="form-row-2">
                  <div class="form-group">
                    <label>Año (Tarjeta del carné):</label>
                    <input 
                      type="text" 
                      class="input-text" 
                      [(ngModel)]="ws().header.year" 
                      (ngModelChange)="onModelChange()" />
                  </div>
                  <div class="form-group">
                    <label>Etiqueta Sección:</label>
                    <input 
                      type="text" 
                      class="input-text" 
                      [(ngModel)]="ws().header.sectionCodeLabel" 
                      (ngModelChange)="onModelChange()" />
                  </div>
                </div>

                <div class="form-group">
                  <label>Instrucciones Generales de la Hoja (Página 2):</label>
                  <textarea 
                    rows="4" 
                    class="input-textarea" 
                    [(ngModel)]="ws().generalInstructionsText" 
                    (ngModelChange)="onModelChange()"></textarea>
                </div>
              </div>
            </div>
          </div>
        }

      </div>
    </aside>
  `,
  styles: [`
    .editor-sidebar {
      width: 440px;
      min-width: 400px;
      background: #111827;
      border-right: 1px solid #1f2937;
      display: flex;
      flex-direction: column;
      height: calc(100vh - 65px);
      overflow: hidden;
    }

    .sidebar-header {
      padding: 1rem 1.25rem 0.75rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #1f2937;
    }

    .sidebar-header h2 {
      font-size: 1rem;
      font-weight: 700;
      color: white;
    }

    .badge {
      font-size: 0.7rem;
      background: rgba(56, 189, 248, 0.15);
      color: #38bdf8;
      padding: 2px 8px;
      border-radius: 9999px;
      border: 1px solid rgba(56, 189, 248, 0.3);
      font-weight: 600;
    }

    .editor-tabs {
      display: flex;
      background: #090e17;
      border-bottom: 1px solid #1f2937;
      padding: 4px 8px;
      gap: 4px;
    }

    .tab-btn {
      flex: 1;
      padding: 8px 6px;
      background: transparent;
      border: none;
      color: #94a3b8;
      font-size: 0.8rem;
      font-weight: 600;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .tab-btn:hover {
      color: white;
    }

    .tab-btn.active {
      background: #1e293b;
      color: #38bdf8;
    }

    .sidebar-body {
      flex: 1;
      overflow-y: auto;
      padding: 1rem;
    }

    .tab-content {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .section-actions-top {
      display: flex;
      justify-content: flex-end;
    }

    .btn-action-primary {
      background: #4f46e5;
      color: white;
      border: none;
      padding: 8px 14px;
      font-size: 0.8rem;
      font-weight: 600;
      border-radius: 8px;
      cursor: pointer;
    }

    .btn-action-primary:hover {
      background: #4338ca;
    }

    .editor-card {
      background: #0b1120;
      border: 1px solid #1f2937;
      border-radius: 10px;
      overflow: hidden;
    }

    .card-header {
      padding: 10px 14px;
      background: #1e293b;
      border-bottom: 1px solid #1f2937;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .card-header h3 {
      font-size: 0.85rem;
      font-weight: 700;
      color: #f1f5f9;
    }

    .sec-badge {
      font-size: 0.7rem;
      background: #312e81;
      color: #c7d2fe;
      padding: 3px 8px;
      border-radius: 4px;
      font-weight: 600;
    }

    .input-title {
      background: transparent;
      border: 1px solid transparent;
      color: white;
      font-weight: 700;
      font-size: 0.85rem;
      padding: 4px 6px;
      border-radius: 4px;
      flex: 1;
    }

    .card-body {
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .form-group label {
      font-size: 0.75rem;
      font-weight: 600;
      color: #94a3b8;
    }

    .form-row-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }

    .input-text,
    .input-textarea {
      background: #030712;
      border: 1px solid #374151;
      color: #f9fafb;
      padding: 7px 10px;
      font-size: 0.8rem;
      border-radius: 6px;
      width: 100%;
    }

    .input-text:focus,
    .input-textarea:focus {
      outline: none;
      border-color: #6366f1;
    }

    .red-input {
      color: #f87171 !important;
      border-color: rgba(239, 68, 68, 0.4) !important;
    }

    .font-bold {
      font-weight: 700;
    }

    .add-exercise-buttons {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
    }

    .btn-chip {
      background: #1e293b;
      border: 1px solid #374151;
      color: #cbd5e1;
      font-size: 0.75rem;
      font-weight: 600;
      padding: 5px 10px;
      border-radius: 6px;
      cursor: pointer;
    }

    .btn-chip:hover {
      background: #334155;
      color: white;
    }

    .exercises-wrapper {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .exercise-item-editor {
      background: #030712;
      border: 1px solid #1f2937;
      border-radius: 8px;
      padding: 10px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .item-editor-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .item-num {
      background: #4f46e5;
      color: white;
      font-weight: 800;
      font-size: 0.75rem;
      padding: 2px 7px;
      border-radius: 4px;
      margin-right: 6px;
    }

    .item-type-badge {
      font-size: 0.7rem;
      color: #9ca3af;
    }

    .btn-icon {
      background: transparent;
      border: 1px solid #374151;
      color: #cbd5e1;
      border-radius: 4px;
      width: 26px;
      height: 26px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 0.75rem;
    }

    .btn-icon.danger-small {
      width: 22px;
      height: 22px;
      font-size: 0.7rem;
    }

    .image-upload-box {
      background: #090e17;
      border: 1px dashed #374151;
      padding: 8px;
      border-radius: 6px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .image-controls {
      display: flex;
      gap: 6px;
    }

    .btn-file-upload {
      background: #1e293b;
      border: 1px solid #475569;
      color: #e2e8f0;
      padding: 6px 10px;
      font-size: 0.75rem;
      border-radius: 6px;
      cursor: pointer;
      white-space: nowrap;
    }

    .img-preview-mini img {
      max-height: 80px;
      border-radius: 4px;
      margin-top: 4px;
    }

    .options-editor,
    .subquestions-editor,
    .answerslots-editor {
      background: #090e17;
      padding: 8px;
      border-radius: 6px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .option-row-edit {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .letter-badge {
      font-weight: 700;
      color: #9ca3af;
    }

    .subquestion-edit-card {
      background: #111827;
      border: 1px solid #1f2937;
      border-radius: 6px;
      padding: 6px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .sub-row-1 {
      display: flex;
      gap: 6px;
      align-items: center;
    }

    .letter-input {
      width: 45px;
      text-align: center;
    }

    .sub-ans-row {
      display: flex;
      gap: 6px;
      align-items: center;
      padding-left: 10px;
    }

    .badge-mini {
      background: #cfe2f3;
      color: #000;
      font-weight: 800;
      font-size: 0.7rem;
      padding: 3px 6px;
      border-radius: 3px;
    }

    .answerslot-row-edit {
      display: flex;
      gap: 6px;
      align-items: center;
    }

    .teacher-val-input {
      color: #34d399 !important;
      border-color: rgba(16, 185, 129, 0.4) !important;
    }

    .teacher-sol-field {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .teacher-textarea {
      border-color: rgba(16, 185, 129, 0.4);
      color: #86efac;
      font-family: monospace;
      font-size: 0.75rem;
    }

    .item-row-edit {
      display: flex;
      gap: 6px;
      align-items: center;
      margin-bottom: 6px;
    }

    .red-triangle {
      color: #ef4444;
    }

    .milestone-edit-card {
      background: #090e17;
      border: 1px solid #1f2937;
      border-radius: 6px;
      padding: 8px;
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-bottom: 6px;
    }

    .flex-1 { flex: 1; }
    .btn-link {
      background: none;
      border: none;
      color: #38bdf8;
      font-size: 0.75rem;
      cursor: pointer;
      font-weight: 600;
    }
  `]
})
export class EditorComponent {
  readonly dataService = inject(WorksheetDataService);
  readonly ws = this.dataService.worksheet;

  activeTab: 'exercises' | 'page1' | 'header' = 'exercises';

  onModelChange() {
    this.dataService.saveToStorage();
  }

  setCorrectOption(item: ExerciseItem, letter: string) {
    if (!item.options) return;
    item.options.forEach((opt) => {
      opt.isCorrect = opt.letter === letter;
    });
    this.onModelChange();
  }

  addSubQuestion(item: ExerciseItem) {
    if (!item.subQuestions) item.subQuestions = [];
    const letters = ['(a)', '(b)', '(c)', '(d)', '(e)', '(f)'];
    const letter = letters[item.subQuestions.length] || `(${item.subQuestions.length + 1})`;
    item.subQuestions.push({
      id: 'sub-' + Date.now(),
      letter,
      text: 'Nuevo inciso...',
      answerSlots: [{ label: 'Resp.', value: '' }]
    });
    this.onModelChange();
  }

  removeSubQuestion(item: ExerciseItem, index: number) {
    if (!item.subQuestions) return;
    item.subQuestions.splice(index, 1);
    this.onModelChange();
  }

  addAnswerSlot(item: ExerciseItem) {
    if (!item.answerSlots) item.answerSlots = [];
    item.answerSlots.push({
      label: 'Resp.',
      value: ''
    });
    this.onModelChange();
  }

  removeAnswerSlot(item: ExerciseItem, index: number) {
    if (!item.answerSlots) return;
    item.answerSlots.splice(index, 1);
    this.onModelChange();
  }

  onImageFileSelected(event: Event, item: ExerciseItem) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        item.imageUrl = e.target?.result as string;
        this.onModelChange();
      };
      reader.readAsDataURL(file);
    }
  }

  addObjective() {
    this.ws().objectives.push({
      id: 'obj-' + Date.now(),
      text: 'Nuevo objetivo de aprendizaje...'
    });
    this.onModelChange();
  }

  removeObjective(index: number) {
    this.ws().objectives.splice(index, 1);
    this.onModelChange();
  }

  addDescriptionPoint() {
    this.ws().generalDescriptionPoints.push('Nueva instrucción...');
    this.onModelChange();
  }

  removeDescriptionPoint(index: number) {
    this.ws().generalDescriptionPoints.splice(index, 1);
    this.onModelChange();
  }

  addObservation() {
    this.ws().observations.push('Nueva observación...');
    this.onModelChange();
  }

  removeObservation(index: number) {
    this.ws().observations.splice(index, 1);
    this.onModelChange();
  }
}
