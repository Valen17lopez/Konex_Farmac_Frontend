import { Component } from '@angular/core';
import { Medicamento, MedicamentoService } from '../../servicios/medicamento';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seccion',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './seccion.html',
  styleUrls: ['./seccion.css']
})
export class Seccion {

  modalVisible = false;
  nuevoMedicamento: Partial<Medicamento> = {};
  busqueda: string = '';

  constructor(private medicamentoService: MedicamentoService) {}

  abrirModal() {
    this.modalVisible = true;
    this.nuevoMedicamento = {};
  }

  cerrarModal() {
    this.modalVisible = false;
  }

  guardarMedicamento() {
    if (!this.nuevoMedicamento.nombre || !this.nuevoMedicamento.laboratorio) return;

    this.medicamentoService.create(this.nuevoMedicamento as Medicamento).subscribe({
      next: (med) => {
        const event = new CustomEvent('medicamentoCreado', { detail: med });
        window.dispatchEvent(event);
        this.cerrarModal();
      },
      error: (err) => console.error('Error al crear medicamento:', err)
    });
  }

  // Filtra los medicamentos por nombre y emite evento global
  buscarMedicamento() {
    this.medicamentoService.getAll().subscribe({
      next: (meds) => {
        const filtrados = meds.filter(m => m.nombre.toLowerCase().includes(this.busqueda.toLowerCase()));
        const event = new CustomEvent('medicamentoFiltrado', { detail: filtrados });
        window.dispatchEvent(event);
      },
      error: (err) => console.error('Error al filtrar medicamentos:', err)
    });
  }
}
