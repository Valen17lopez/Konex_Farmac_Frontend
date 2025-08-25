import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Header } from './components/header/header';
import { Seccion } from './components/seccion/seccion';
import { TableContainer } from './components/table-container/table-container';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    Header,
    Seccion,
    TableContainer,
    FormsModule,
    HttpClientModule // <-- Esto es clave
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('CRUD-Drogueria');
}
