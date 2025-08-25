import { Component, OnInit } from '@angular/core';
import { Medicamento, MedicamentoService } from '../../servicios/medicamento';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table-container',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './table-container.html',
  styleUrls: ['./table-container.css']
})
export class TableContainer implements OnInit {

  medicamentos: Medicamento[] = [];
  cargando: boolean = false;
  error: string = '';

  // Para modal de edición
  modalEditarVisible = false;
  medicamentoAEditar: Medicamento | null = null;

  constructor(private medicamentoService: MedicamentoService) { }

  ngOnInit(): void {
    this.cargarMedicamentos();

    // Escuchar evento global de creación
    window.addEventListener('medicamentoCreado', () => this.cargarMedicamentos());
    // Escuchar evento global de filtrado
    window.addEventListener('medicamentoFiltrado', (event: any) => {
      this.medicamentos = event.detail;
    });
  }

  cargarMedicamentos() {
    this.cargando = true;
    this.medicamentoService.getAll().subscribe({
      next: (data) => { this.medicamentos = data; this.cargando = false; },
      error: (err) => { this.error = 'No se pudieron cargar los medicamentos'; this.cargando = false; }
    });
  }

  venderMedicamento(med: Medicamento) {
    console.log('Vender medicamento:', med);
  }

  abrirModalEditar(med: Medicamento) {
    this.medicamentoAEditar = { ...med };
    this.modalEditarVisible = true;
  }

  cancelarEditar() {
    this.modalEditarVisible = false;
    this.medicamentoAEditar = null;
  }

  guardarEdicion() {
    if (!this.medicamentoAEditar || !this.medicamentoAEditar.id) return;

    this.medicamentoService.update(this.medicamentoAEditar.id, this.medicamentoAEditar).subscribe({
      next: () => {
        this.cargarMedicamentos();
        this.cancelarEditar();
      },
      error: (err) => console.error('Error al editar medicamento:', err)
    });
  }

  eliminarMedicamento(med: Medicamento) {
    if (!med.id) return;
    if (!confirm(`¿Deseas eliminar "${med.nombre}"?`)) return;

    this.medicamentoService.delete(med.id).subscribe({
      next: () => this.medicamentos = this.medicamentos.filter(m => m.id !== med.id),
      error: (err) => alert('No se pudo eliminar el medicamento.')
    });
  }
}
