import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // ✅ Importar HttpClientModule
import { Medicamento, MedicamentoService } from '../../servicios/medicamento';
import { VentaComponent } from '../venta/venta';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-container',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule, // ✅ Agregado para que funcione HttpClient
    VentaComponent
  ],
  templateUrl: './table-container.html',
  styleUrls: ['./table-container.css']
})
export class TableContainer implements OnInit {

  medicamentos: Medicamento[] = [];
  cargando: boolean = false;
  error: string = '';

  // Modal de edición
  modalEditarVisible = false;
  medicamentoAEditar: Medicamento | null = null;

  // Referencia al componente de venta
  @ViewChild(VentaComponent) ventaComponent!: VentaComponent;

  constructor(
    private medicamentoService: MedicamentoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarMedicamentos();

    // Escuchar eventos globales
    window.addEventListener('medicamentoCreado', () => this.cargarMedicamentos());
    window.addEventListener('medicamentoFiltrado', (event: any) => {
      this.medicamentos = event.detail;
    });
  }

  cargarMedicamentos() {
    this.cargando = true;
    this.medicamentoService.getAll().subscribe({
      next: (data) => { 
        this.medicamentos = data; 
        this.cargando = false; 
      },
      error: () => { 
        this.error = 'No se pudieron cargar los medicamentos'; 
        this.cargando = false; 
      }
    });
  }

  // Abrir modal de venta
  venderMedicamento(med: Medicamento) {
    this.ventaComponent?.abrirModal(med);
  }

  // Modal edición
  abrirModalEditar(med: Medicamento) {
    this.medicamentoAEditar = { ...med };
    this.modalEditarVisible = true;
  }

  cancelarEditar() {
    this.modalEditarVisible = false;
    this.medicamentoAEditar = null;
  }

  guardarEdicion() {
    if (!this.medicamentoAEditar?.id) return;
    this.medicamentoService.update(this.medicamentoAEditar.id, this.medicamentoAEditar).subscribe({
      next: () => { 
        this.cargarMedicamentos(); 
        this.cancelarEditar(); 
      },
      error: (err) => console.error('Error al editar medicamento:', err)
    });
  }

  // Eliminar medicamento
  eliminarMedicamento(med: Medicamento) {
    if (!med.id) return;
    if (!confirm(`¿Deseas eliminar "${med.nombre}"?`)) return;
    this.medicamentoService.delete(med.id).subscribe({
      next: () => this.medicamentos = this.medicamentos.filter(m => m.id !== med.id),
      error: () => alert('No se pudo eliminar el medicamento.')
    });
  }


}
