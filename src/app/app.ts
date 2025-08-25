import { Component } from '@angular/core';
import { Header } from './components/header/header';
import { TableContainer } from './components/table-container/table-container';
import { RouterModule } from '@angular/router';
import { Seccion } from './components/seccion/seccion';
import { Inventario } from './components/inventario/inventario';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Header, TableContainer, RouterModule, Seccion, Inventario],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {}
