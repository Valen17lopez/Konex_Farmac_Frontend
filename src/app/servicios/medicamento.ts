import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Medicamento {
  id?: number;
  nombre: string;
  laboratorio: string;
  fechaFabricacion: string;
  fechaVencimiento: string;
  cantidadStock: number;
  valorUnitario: number;
}

@Injectable({
  providedIn: 'root'
})
export class MedicamentoService {
  private apiUrl = 'http://localhost:8080/api/medicamentos';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Medicamento[]> {
    return this.http.get<Medicamento[]>(this.apiUrl);
  }

  getById(id: number): Observable<Medicamento> {
    return this.http.get<Medicamento>(`${this.apiUrl}/${id}`);
  }

  create(medicamento: Medicamento): Observable<Medicamento> {
    return this.http.post<Medicamento>(this.apiUrl, medicamento);
  }

  update(id: number, medicamento: Medicamento): Observable<Medicamento> {
    return this.http.put<Medicamento>(`${this.apiUrl}/${id}`, medicamento);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
