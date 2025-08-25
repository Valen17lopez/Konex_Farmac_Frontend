import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interfaz para ventas básicas
export interface Venta {
  idMedicamento: number;
  cantidad: number;
  valorUnitario: number;
  valorTotal: number;
  fechaHora: string; // Usamos string para evitar errores de tipo al enviar/recibir
}

// Interfaz para ventas con nombre de medicamento
export interface VentaConNombre {
  idVenta: number;
  fechaHora: string;
  nombreMedicamento: string;
  cantidad: number;
  valorUnitario: number;
  valorTotal: number;
}

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  private baseUrl = 'http://localhost:8080/api/ventas'; // URL del backend

  constructor(private http: HttpClient) { }

  // Crear una venta
  create(venta: Venta): Observable<Venta> {
    return this.http.post<Venta>(this.baseUrl, venta);
  }

  // Obtener todas las ventas
  getAll(): Observable<Venta[]> {
    return this.http.get<Venta[]>(this.baseUrl);
  }

 // Trae todas las ventas con los datos del medicamento
  getAllConMedicamento(): Observable<VentaConNombre[]> {
    return this.http.get<VentaConNombre[]>(`${this.baseUrl}/con-nombre`);
  }
}
