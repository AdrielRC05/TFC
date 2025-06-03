# EdicionComponent

## Descripción

Muestra una lista de ediciones del Campeonato Gallego de Montaña.  
Permite filtrar por año y navegar a las subidas asociadas a cada edición.

## Archivos clave

- `edicion.component.ts`: Lógica de carga y filtro
- `edicion.component.html`: Vista principal
- `edicion.component.css`: Estilos personalizados

---

## Código completo del componente (`edicion.component.ts`)

```ts
import { Component, HostListener, OnInit } from '@angular/core';
import { ServicioAppService } from '../../servicios/servicio-app.service';

@Component({
  selector: 'app-edicion',
  standalone: false,
  templateUrl: './edicion.component.html',
  styleUrls: ['./edicion.component.css']
})
export class EdicionComponent implements OnInit {

  ediciones: any[] = [];
  edicionesFiltradas: any[] = [];
  filtroAno: string = '';

  constructor(private servicio: ServicioAppService) {}

  ngOnInit(): void {
    this.servicio.obtenerEdiciones().subscribe((data: any[]) => {
      this.ediciones = data;
      this.edicionesFiltradas = data;
    });
  }

  filtrarEdiciones() {
    // Aseguramos que filtroAno sea string antes de usar trim()
    const valorFiltro = this.filtroAno?.toString().trim();

    // Si está vacío → mostramos todas las ediciones
    if (!valorFiltro) {
      this.edicionesFiltradas = this.ediciones;
      return;
    }

    const anoBuscado = parseInt(valorFiltro, 10);

    // Si no es un año válido → mostramos vacío
    if (isNaN(anoBuscado)) {
      this.edicionesFiltradas = [];
      return;
    }

    // Filtramos por año (campo 'año' en edición)
    this.edicionesFiltradas = this.ediciones.filter((edicion: any) => {
      return edicion.año === anoBuscado;
    });
  }

  showBackToTop = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const pos = window.scrollY || document.documentElement.scrollTop;
    this.showBackToTop = pos > 300;
  }

  goToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}