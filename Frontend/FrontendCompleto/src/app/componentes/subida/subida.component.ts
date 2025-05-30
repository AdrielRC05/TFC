import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  ViewChildren,
  QueryList,
  HostListener
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as L from 'leaflet';
import { ServicioAppService } from '../../servicios/servicio-app.service';

// Iconos personalizados
const DefaultIcon = L.icon({
  iconUrl: '/marker-icon.png',
  shadowUrl: '/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

@Component({
  selector: 'app-subida',
  standalone: false,
  templateUrl: './subida.component.html',
  styleUrls: ['./subida.component.css']
})
export class SubidaComponent implements OnInit, AfterViewInit {

  subidas: any[] = [];
  subidasFiltradas: any[] = [];
  edicion: any = {};
  busqueda: string = '';
  fechaFiltro: string = '';
  mostrarInfo: boolean[] = [];

  @ViewChildren('mapa') mapasRefs!: QueryList<ElementRef>;
  mapasInicializados: boolean[] = [];

  constructor(
    private ruta: ActivatedRoute,
    private servicio: ServicioAppService
  ) {}

  ngOnInit(): void {
    const edicionId = this.ruta.snapshot.paramMap.get('edicionId');
  
    if (edicionId) {
      // Obtener datos de la edición
      this.servicio.obtenerEdicionPorId(edicionId).subscribe(
        (data: any) => {
          this.edicion = data;
        },
        error => console.error('Error al cargar la edición', error)
      );
  
      // Obtener subidas de la edición
      this.servicio.obtenerSubidasPorEdicion(String(edicionId)).subscribe((data: any) => {
        this.subidas = data;
        this.subidasFiltradas = data;
        this.mapasInicializados = new Array(data.length).fill(false);
        this.mostrarInfo = new Array(data.length).fill(false);
  
        setTimeout(() => {
          this.inicializarTodosLosMapas();
        }, 0);
      });
    }
  }

  ngAfterViewInit(): void {
    this.mapasRefs.changes.subscribe(() => {
      this.inicializarTodosLosMapas();
    });
  }

  filtrarSubidas() {
    this.subidasFiltradas = this.subidas.filter(subida => {
      const coincideNombre = this.busqueda === '' || subida.nombre.toLowerCase().includes(this.busqueda.toLowerCase());
      const coincideFecha = this.fechaFiltro === '' || (
        (subida.fechaInicio && this.formatearFecha(subida.fechaInicio) === this.fechaFiltro) ||
        (subida.fechaFin && this.formatearFecha(subida.fechaFin) === this.fechaFiltro)
      );
      return coincideNombre && coincideFecha;
    });

    this.mapasInicializados = new Array(this.subidasFiltradas.length).fill(false);

    setTimeout(() => {
      this.inicializarTodosLosMapas();
    }, 0);
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
      const subida = this.subidasFiltradas[index];
      if (!subida || this.mapasInicializados[index]) return;
  
      const elementoMapa = mapaRef.nativeElement;
      if (!elementoMapa || elementoMapa._leaflet_map) return;
  
      // Crear el mapa
      const mapa = L.map(elementoMapa).setView([42.6, -7.78], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapa);
  
      setTimeout(() => {
        mapa.invalidateSize();
      }, 200);
  
      const rutas = subida.rutas || [];
  
      const todasLasCoordenadas: [number, number][] = [];
  
      rutas.forEach((ruta: any) => {
        const puntos = ruta.puntos || [];
        const coordenadas: [number, number][] = puntos.map((p: any) => [p.latitud, p.longitud]);
  
        if (coordenadas.length > 2) {
          const coords = coordenadas;
  
          L.polyline(coords, { color: '#0054a6', weight: 4 }).addTo(mapa);
  
          const primerPunto = coords[0];
          const ultimoPunto = coords[coords.length - 1];
  
          L.marker(primerPunto, { icon: DefaultIcon }).addTo(mapa).bindPopup('Salida');
          L.marker(ultimoPunto, { icon: DefaultIcon }).addTo(mapa).bindPopup('Llegada');
  
          const bounds = L.latLngBounds(coords as L.LatLngExpression[]);
  
          setTimeout(() => {
            mapa.fitBounds(bounds, {
              padding: [50, 50],
              maxZoom: 15,
              animate: true
            });
          }, 300);
  
          todasLasCoordenadas.push(...coords);
        } else if (coordenadas.length === 2) {
          const coords = coordenadas;
  
          L.polyline(coords, { color: '#0054a6', weight: 4 }).addTo(mapa);
  
          const primerPunto = coords[0];
          const ultimoPunto = coords[coords.length - 1];
  
          L.marker(primerPunto, { icon: DefaultIcon }).addTo(mapa).bindPopup('Salida');
          L.marker(ultimoPunto, { icon: DefaultIcon }).addTo(mapa).bindPopup('Llegada');
  
          const bounds = L.latLngBounds(coords as L.LatLngExpression[]);
  
          setTimeout(() => {
            mapa.fitBounds(bounds, {
              padding: [50, 50],
              maxZoom: 15,
              animate: true
            });
          }, 300);
  
          todasLasCoordenadas.push(...coords);
        }
      });
  
      // Si no hay coordenadas, centrar en Galicia
      if (todasLasCoordenadas.length === 0) {
        setTimeout(() => {
          mapa.setView([42.6, -7.78], 13);
        }, 200);
      }
  
      elementoMapa._leaflet_map = mapa;
      this.mapasInicializados[index] = true;
    });
  }

  toggleInfo(index: number): void {
    this.mostrarInfo[index] = !this.mostrarInfo[index];

    if (this.mostrarInfo[index]) {
      setTimeout(() => {
        const mapaElement = this.mapasRefs.toArray()[index]?.nativeElement;
        if (mapaElement && mapaElement._leaflet_map) {
          mapaElement._leaflet_map.invalidateSize();
        }
      }, 100); // Pequeño delay para asegurar que el mapa es visible
    }
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