// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { App } from './app/app'; // Ajusta la ruta si tu app.ts está en otra carpeta

bootstrapApplication(App, {
  providers: [
    importProvidersFrom(HttpClientModule) // Esto permite que tu MedicamentoService use HttpClient
  ]
}).catch(err => console.error(err));
