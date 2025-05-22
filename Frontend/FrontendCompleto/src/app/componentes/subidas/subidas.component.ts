import {
  Component,
  OnInit,
  AfterViewInit,
  QueryList,
  ViewChildren,
  ElementRef
} from '@angular/core';
import { ServicioAppService } from '../../servicios/servicio-app.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-subidas',
  standalone: false,
  templateUrl: './subidas.component.html',
  styleUrl: './subidas.component.css'
})
export class SubidasComponent implements OnInit, AfterViewInit {
  subidas: any[] = [];
  subidasFiltradas: any[] = [];
  busqueda: string = '';
  fechaFiltro: string = '';

  mapasInicializados: boolean[] = [];

  @ViewChildren('mapa') mapasRefs!: QueryList<ElementRef>;

  constructor(private servicio: ServicioAppService) { }

  ngOnInit(): void {
    this.obtenerSubidas();
  }

  ngAfterViewInit(): void {
    this.mapasRefs.changes.subscribe(() => {
      this.inicializarTodosLosMapas();
    });
  }

  obtenerSubidas(): void {
    this.servicio.obtenerSubidas().subscribe((data: any) => {
      this.subidas = data;
      this.subidasFiltradas = data;
      this.mapasInicializados = new Array(data.length).fill(false);
    });
  }

  filtrarSubidas(): void {
    this.subidasFiltradas = this.subidas.filter(subida => {
      const coincideNombre = this.busqueda === '' || subida.nombre.toLowerCase().includes(this.busqueda.toLowerCase());
      const coincideFecha = this.fechaFiltro === '' || (
        (subida.fechaInicio && this.formatearFecha(subida.fechaInicio) === this.fechaFiltro) ||
        (subida.fechaFin && this.formatearFecha(subida.fechaFin) === this.fechaFiltro)
      );
      return coincideNombre && coincideFecha;
    });
  }

  formatearFecha(fechaString: string): string {
    const fecha = new Date(fechaString);
    const year = fecha.getFullYear();
    const month = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const day = fecha.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  inicializarTodosLosMapas(): void {
    this.mapasRefs.forEach((mapaRef, index) => {
      if (this.mapasInicializados[index]) return; // Evita reinicializar

      const subida = this.subidasFiltradas[index];
      const rutas = subida.rutas || [];

      const mapa = L.map(mapaRef.nativeElement).setView([42.6, -7.78], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapa);

      rutas.forEach((ruta: { puntos?: { latitud: number; longitud: number; descripcion?: string }[] }) => {
        const puntos = ruta.puntos || [];
        const coordenadas: [number, number][] = puntos.map(p => [p.latitud, p.longitud]);

        coordenadas.forEach((coord, i) => {
          L.marker(coord).addTo(mapa)
            .bindPopup(puntos[i].descripcion || '');
        });

        if (coordenadas.length > 1) {
          const polyline = L.polyline(coordenadas, { color: 'red' }).addTo(mapa);
          mapa.fitBounds(polyline.getBounds());
        }
      });

      setTimeout(() => mapa.invalidateSize(), 200); // Ajusta el tamaño al cargar

      this.mapasInicializados[index] = true;
    });
  }
}
