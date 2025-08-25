import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Medicamento } from '../../servicios/medicamento';
import { VentaService, Venta } from '../../servicios/venta';

@Component({
  selector: 'app-venta',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencyPipe],
  templateUrl: './venta.html',
  styleUrls: ['./venta.css']
})
export class VentaComponent {

  medicamentoSeleccionado?: Medicamento;
  cantidadVenta: number = 1;
  valorTotal: number = 0;

  constructor(private ventaService: VentaService) {}

  // Abrir modal de venta
  abrirModal(med: Medicamento) {
    this.medicamentoSeleccionado = med;
    this.cantidadVenta = 1;
    this.calcularTotal();
  }

  // Cerrar modal
  cerrarModal() {
    this.medicamentoSeleccionado = undefined;
  }

  // Incrementar cantidad
  incrementar() {
    this.cantidadVenta++;
    this.calcularTotal();
  }

  // Decrementar cantidad
  decrementar() {
    if (this.cantidadVenta > 1) {
      this.cantidadVenta--;
      this.calcularTotal();
    }
  }

  // Calcular valor total
  calcularTotal() {
    if (this.medicamentoSeleccionado) {
      this.valorTotal = this.medicamentoSeleccionado.valorUnitario * this.cantidadVenta;
    }
  }

  // Confirmar venta y enviarla al backend
  confirmarVenta() {
    if (!this.medicamentoSeleccionado) return;

    const nuevaVenta: Venta = {
      idMedicamento: this.medicamentoSeleccionado.id!,
      cantidad: this.cantidadVenta,
      valorUnitario: this.medicamentoSeleccionado.valorUnitario,
      valorTotal: this.valorTotal,
      fechaHora: new Date().toISOString() // Convertimos a string ISO para evitar errores de tipo
    };

    this.ventaService.create(nuevaVenta).subscribe({
      next: () => {
        alert('Venta registrada correctamente');
        this.cerrarModal();
      },
      error: (err) => {
        console.error('Error al registrar venta:', err);
        alert('No se pudo registrar la venta');
      }
    });
  }
}
