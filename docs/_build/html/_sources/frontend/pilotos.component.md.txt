# PilotosComponent

## Descripción

Muestra información sobre los pilotos del campeonato, incluyendo:
- Nombre
- Edad
- Títulos ganados
- Coches utilizados

## Archivos clave

- `pilotos.component.ts`: Lógica de carga y visualización
- `pilotos.component.html`: Vista
- `pilotos.component.css`: Estilos personalizados

---

## Código completo del componente (`pilotos.component.ts`)

```ts
import { Component, OnInit } from '@angular/core';
import { ServicioAppService } from '../../servicios/servicio-app.service';

@Component({
  selector: 'app-pilotos',
  standalone: false,
  templateUrl: './pilotos.component.html',
  styleUrls: ['./pilotos.component.css']
})
export class PilotosComponent implements OnInit {

  pilotos: any[] = [];
  filtroNombre: string = '';
  pilotoSeleccionado: any = null;

  constructor(private servicio: ServicioAppService) {}

  ngOnInit(): void {
    this.cargarPilotos();
  }

  cargarPilotos() {
    this.servicio.obtenerPilotos().subscribe((data: any[]) => {
      this.pilotos = data;
    });
  }

  filtrarPilotos() {
    const texto = this.filtroNombre.trim().toLowerCase();

    if (!texto) {
      this.cargarPilotos();
      return;
    }

    this.pilotos = this.pilotos.filter(piloto =>
      piloto.nombre.toLowerCase().includes(texto)
    );
  }

  seleccionarPiloto(piloto: any) {
    this.pilotoSeleccionado = piloto;
  }
}