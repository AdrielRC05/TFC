# NoticiasComponent

## Descripción

Muestra noticias organizadas por año.

### Funcionalidades:
- Agrupa noticias por año
- Muestra título y resumen de cada noticia
- Opcional: imágenes y enlaces a más información

## Archivos clave

- `noticias.component.ts`: Lógica de agrupación por año
- `noticias.component.html`: Vista estructurada por año

---

## Código completo del componente (`noticias.component.ts`)

```ts
import { Component, OnInit } from '@angular/core';
import { ServicioAppService } from '../../servicios/servicio-app.service';

@Component({
  selector: 'app-noticias',
  standalone: false,
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {

  noticias: any[] = [];
  noticiasFiltradas: any[] = [];
  filtroAno: string = '';
  noticiasPorAnio: { anio: number; noticias: any[] }[] = [];

  constructor(private servicio: ServicioAppService) {}

  ngOnInit(): void {
    this.servicio.obtenerNoticias().subscribe((data: any[]) => {
      this.noticias = data;
      this.noticiasFiltradas = [...data];
      this.agruparPorAnio();
    });
  }

  agruparPorAnio() {
    this.noticiasPorAnio = this.noticiasFiltradas.reduce((acc, noticia) => {
      const anio = new Date(noticia.fecha).getFullYear();
      if (!acc.some(g => g.anio === anio)) {
        acc.push({ anio, noticias: [] });
      }
      acc.find(g => g.anio === anio)?.noticias.push(noticia);
      return acc;
    }, []);
  }

  filtrarPorAnio() {
    const valorFiltro = this.filtroAno?.trim();

    if (!valorFiltro) {
      this.noticiasFiltradas = this.noticias;
    } else {
      const anoBuscado = parseInt(valorFiltro, 10);
      this.noticiasFiltradas = this.noticias.filter(noticia => {
        const anio = new Date(noticia.fecha).getFullYear();
        return anio === anoBuscado;
      });
    }

    this.agruparPorAnio();
  }
}