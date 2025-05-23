import {
  Component,
  OnInit,
  AfterViewInit,
  QueryList,
  ViewChildren,
  ElementRef
} from '@angular/core';
import { ServicioAppService } from '../../servicios/servicio-app.service';
import { RutaService } from '../../servicios/ruta.service'; // ✅ Importa el nuevo servicio
import * as L from 'leaflet';

// Icono por defecto
const DefaultIcon = L.icon({
  iconUrl: '/marker-icon.png',
  shadowUrl: '/marker-shadow.png',
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

  constructor(
    private servicio: ServicioAppService,
    private rutaService: RutaService
  ) {}

  ngOnInit(): void {
    this.obtenerSubidas();
  }

  obtenerSubidas(): void {
    this.servicio.obtenerSubidas().subscribe((data: any) => {
      this.subidas = data;
      this.subidasFiltradas = data;
      this.mapasInicializados = new Array(data.length).fill(false);
      this.mostrarInfo = new Array(data.length).fill(false);
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

    this.mostrarInfo = new Array(this.subidasFiltradas.length).fill(false);
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
  
      // Crear el mapa
      const mapa = L.map(elementoMapa).setView([42.6, -7.78], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapa);
  
      const todasLasCoordenadas: [number, number][] = [];
  
      rutas.forEach((ruta: any) => {
        const puntos = ruta.puntos || [];
        const coordenadas: [number, number][] = puntos.map((p: any) => [p.latitud, p.longitud]);
  
        if (coordenadas.length === 2) {
          const origen: [number, number] = coordenadas[0];
          const destino: [number, number] = coordenadas[1];
  
          L.marker(origen).addTo(mapa).bindPopup(puntos[0].descripcion || 'Inicio');
          L.marker(destino).addTo(mapa).bindPopup(puntos[1].descripcion || 'Fin');
  
          // 👇 Intentamos obtener la ruta desde nuestro backend
          this.servicio.obtenerPuntosGuardados(ruta.id).subscribe(puntosGuardados => {
            if (puntosGuardados && puntosGuardados.length > 2) {
              // Usamos los puntos guardados
              const coords = puntosGuardados.map((p: any) => [p.latitud, p.longitud]);
              L.polyline(coords, { color: '#0054a6', weight: 4 }).addTo(mapa);
              mapa.fitBounds(L.latLngBounds(coords as [number, number][]));
            } else {
              // No hay ruta guardada → llamamos a OpenRouteService
              const rutaActual = subida.rutas.find((r: any) => r.id === ruta.id);
              if (!rutaActual) return;
  
              this.rutaService.getRuta(origen, destino).subscribe(data => {
                // Recibimos TODAS las coordenadas de la API
                const coords: [number, number][] = data.features[0].geometry.coordinates.map(
                  (c: [number, number]) => [c[1], c[0]]
                );
  
                // Convertimos a formato para guardar
                const puntosParaGuardar = coords.map(([lat, lng], i) => ({
                  latitud: lat,
                  longitud: lng,
                  descripcion: i === 0 ? 'Salida' : i === coords.length - 1 ? 'Llegada' : ''
                }));
  
                // Guardamos en nuestro backend
                this.servicio.guardarPuntosDeRuta(ruta.id, puntosParaGuardar).subscribe(() => {
                  // Dibujamos la línea azul gallego
                  L.polyline(coords, { color: '#0054a6', weight: 4 }).addTo(mapa);
                  mapa.fitBounds(L.latLngBounds(coords));
                });
              });
            }
          });
  
          todasLasCoordenadas.push(origen, destino);
  
        } else if (coordenadas.length > 2) {
          // Ruta con muchos puntos → dibuja directamente
          coordenadas.forEach((coord, i) => {
            L.marker(coord).addTo(mapa)
              .bindPopup(puntos[i]?.descripcion || '');
          });
  
          const polyline = L.polyline(coordenadas, { color: 'red' }).addTo(mapa);
          mapa.fitBounds(polyline.getBounds());
  
          todasLasCoordenadas.push(...coordenadas);
        }
      });
  
      setTimeout(() => {
        if (mapa) mapa.invalidateSize();
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