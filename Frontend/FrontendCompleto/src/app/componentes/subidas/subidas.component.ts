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

const DefaultIcon = L.icon({
  iconUrl: 'assets/marker-icon.png',
  shadowUrl: 'assets/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

@Component({
  selector: 'app-subidas',
  standalone: false,
  templateUrl: './subidas.component.html',
  styleUrls: ['./subidas.component.css']
})
export class SubidasComponent implements OnInit, AfterViewInit {
  subidas: any[] = [];
  subidasFiltradas: any[] = [];
  busqueda: string = '';
  fechaFiltro: string = '';
  mapas = new Map<number, L.Map>(); // Almacena mapas por ID de subida
  mapasInicializados: boolean[] = [];
  mostrarInfo: boolean[] = []; // Controla qué información se muestra

  @ViewChildren('mapa') mapasRefs!: QueryList<ElementRef>;

  constructor(private servicio: ServicioAppService) {}

  ngOnInit(): void {
    this.obtenerSubidas();
  }

  obtenerSubidas(): void {
    this.servicio.obtenerSubidas().subscribe((data: any) => {
      this.subidas = data;
      this.subidasFiltradas = data;
      this.mapasInicializados = new Array(data.length).fill(false);
      this.mostrarInfo = new Array(data.length).fill(false); // Inicializa mostrarInfo
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
  
    // Reiniciar mostrarInfo y mapasInicializados
    this.mostrarInfo = new Array(this.subidasFiltradas.length).fill(false);
    this.mapasInicializados = new Array(this.subidasFiltradas.length).fill(false);
  
    // Llamar a inicializarTodosLosMapas después de actualizar los datos
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

  ngAfterViewInit(): void {
    this.mapasRefs.changes.subscribe(() => {
      this.inicializarTodosLosMapas();
    });
  }

  tieneRutasConPuntos(subida: any): boolean {
    return subida.rutas?.some((ruta: any) => 
      ruta.puntos?.length > 0
    ) ?? false;
  }

  inicializarTodosLosMapas(): void {
    this.mapasRefs.forEach((mapaRef, index) => {
      const subida = this.subidasFiltradas[index];
      if (!subida || this.mapasInicializados[index]) return;
  
      const rutas = subida.rutas || [];
      const tienePuntos = rutas.some((r: { puntos: any[] }) => r.puntos?.length > 0);
  
      if (!tienePuntos) {
        this.mapasInicializados[index] = true;
        return;
      }
  
      const elementoMapa = mapaRef.nativeElement;
      if (!elementoMapa || elementoMapa._leaflet_map) return;
  
      // ✅ Crear el mapa ANTES de usarlo
      const mapa = L.map(elementoMapa);
  
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapa);
  
      // Colectar todas las coordenadas
      const todasLasCoordenadas: [number, number][] = [];
  
      rutas.forEach((ruta: { puntos?: { latitud: number; longitud: number; descripcion?: string }[] }) => {
        const puntos = ruta.puntos || [];
        const coordenadas: [number, number][] = puntos.map(p => [p.latitud, p.longitud]);
        todasLasCoordenadas.push(...coordenadas);
  
        // Añadir marcadores
        coordenadas.forEach((coord, i) => {
          L.marker(coord).addTo(mapa)
            .bindPopup(puntos[i].descripcion || '');
        });
  
        // Añadir línea si hay más de un punto
        if (coordenadas.length > 1) {
          L.polyline(coordenadas, { color: 'red' }).addTo(mapa);
        }
      });
  
      // ✅ Invalidar tamaño y ajustar vista después de un breve delay
      setTimeout(() => {
        mapa.invalidateSize();
  
        if (todasLasCoordenadas.length > 0) {
          const bounds = L.latLngBounds(todasLasCoordenadas as L.LatLngExpression[]);
          mapa.fitBounds(bounds, {
            padding: [50, 50], // Ajuste visual extra
            maxZoom: 15,       // Limitar zoom máximo si es necesario
            animate: true      // Animación suave
          });
        } else {
          mapa.setView([42.6, -7.78], 13); // Fallback centro Galicia
        }
      }, 200);
  
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

  
}