import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Medicamento, MedicamentoService } from '../../servicios/medicamento';

interface Venta {
  fechaHora: string;
  idMedicamento: number;
  cantidad: number;
  valorUnitario: number;
  valorTotal: number;
}

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, CurrencyPipe],
  templateUrl: './inventario.html',
  styleUrls: ['./inventario.css']
})
export class Inventario implements OnInit {
  ventas: Venta[] = [];
  ventasFiltradas: Venta[] = [];
  medicamentos: Medicamento[] = [];
  modalVisible = false;
  cargando = false;
  error: string = '';

  // Variables para el filtro de fechas
  fechaInicio: string = '';
  fechaFin: string = '';

  constructor(
    private http: HttpClient,
    private medicamentoService: MedicamentoService
  ) {}

  ngOnInit(): void {}

  abrirModal() {
    this.modalVisible = true;
    this.cargando = true;
    this.error = '';

    // Primero cargamos los medicamentos
    this.medicamentoService.getAll().subscribe({
      next: (meds) => {
        this.medicamentos = meds;
        this.cargarVentas();
      },
      error: (err) => {
        console.error('Error al cargar medicamentos:', err);
        this.error = 'No se pudieron cargar los medicamentos.';
        this.cargando = false;
      }
    });
  }

  cerrarModal() {
    this.modalVisible = false;
    this.ventasFiltradas = [];
    this.fechaInicio = '';
    this.fechaFin = '';
  }

  cargarVentas() {
    this.http.get<Venta[]>('http://localhost:8080/api/ventas').subscribe({
      next: (data) => {
        this.ventas = data;
        this.ventasFiltradas = [...this.ventas];
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar ventas:', err);
        this.error = 'No se pudieron cargar las ventas. Verifica que el backend esté corriendo.';
        this.cargando = false;
      }
    });
  }

  getNombreMedicamento(id: number): string {
    const med = this.medicamentos.find(m => m.id === id);
    return med ? med.nombre : 'Desconocido';
  }

  // Filtrar ventas por rango de fecha
  filtrarPorFechas() {
    if (!this.fechaInicio || !this.fechaFin) return;
    const inicio = new Date(this.fechaInicio);
    const fin = new Date(this.fechaFin);

    this.ventasFiltradas = this.ventas.filter(v => {
      const fechaVenta = new Date(v.fechaHora);
      return fechaVenta >= inicio && fechaVenta <= fin;
    });
  }

  limpiarFiltro() {
    this.fechaInicio = '';
    this.fechaFin = '';
    this.ventasFiltradas = [...this.ventas];
  }
}
