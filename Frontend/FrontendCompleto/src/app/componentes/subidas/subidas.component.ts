import {
  Component,
  OnInit,
  AfterViewInit,
  QueryList,
  ViewChildren,
  ElementRef
} from '@angular/core';
import { ServicioAppService } from '../../servicios/servicio-app.service';
import { RutaService } from '../../servicios/ruta.service';
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
  mapas = new Map<number, L.Map>();
  mapasInicializados: boolean[] = [];
  mostrarInfo: boolean[] = [];

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
  
      const elementoMapa = mapaRef.nativeElement;
      if (!elementoMapa || elementoMapa._leaflet_map) return;
  
      // Crear el mapa
      const mapa = L.map(elementoMapa).setView([42.6, -7.78], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapa);
  
      setTimeout(() => {
        mapa.invalidateSize();
      }, 200); // Asegura tamaño real del mapa
  
      const rutas = subida.rutas || [];
      const todasLasCoordenadas: [number, number][] = [];
  
      rutas.forEach((ruta: any) => {
        const puntos = ruta.puntos || [];
        const coordenadas: [number, number][] = puntos.map((p: any) => [p.latitud, p.longitud]);
  
        if (coordenadas.length === 2) {
          const origen: [number, number] = coordenadas[0];
          const destino: [number, number] = coordenadas[1];
  
          // Mostrar marcadores iniciales
          L.marker(origen, { icon: DefaultIcon }).addTo(mapa).bindPopup(puntos[0]?.descripcion || 'Salida');
          L.marker(destino, { icon: DefaultIcon }).addTo(mapa).bindPopup(puntos[1]?.descripcion || 'Llegada');
  
          // ✅ Llamada a OpenRouteService para generar ruta
          this.rutaService.getRuta(origen, destino).subscribe(geojson => {
            // Extraer coordenadas de la respuesta de ORS
            const coordsFromOR = geojson.features[0].geometry.coordinates.map(
              (c: [number, number]) => [c[1], c[0]] as [number, number]
            );
  
            // Dibujar línea azul gallega
            L.polyline(coordsFromOR, { color: '#0054a6', weight: 4 }).addTo(mapa);
  
            // Guardar puntos generados en BBDD
            const puntosParaGuardar = coordsFromOR.map((c: any[], i: number) => ({
              latitud: c[0],
              longitud: c[1],
              orden: i + 1,
              descripcion: i === 0 ? 'Inicio' : i === coordsFromOR.length - 1 ? 'Fin' : ''
            }));
  
            // ✅ Guardamos la ruta generada en el backend
            this.servicio.guardarPuntosDeRuta(ruta.id, puntosParaGuardar).subscribe(() => {
              console.log('Ruta guardada:', ruta.id);
            });
  
            // Ajustar vista al recorrido
            const bounds = L.latLngBounds(coordsFromOR as L.LatLngExpression[]);
            mapa.fitBounds(bounds, { padding: [50, 50], maxZoom: 15, animate: true });
            todasLasCoordenadas.push(...coordsFromOR);
          });
        }
  
        // Si ya hay más de 2 puntos → usamos los de la BBDD
        else if (coordenadas.length > 10) {
          const coords = coordenadas;
          L.polyline(coords, { color: 'red' }).addTo(mapa);
  
          const primerPunto = coords[0];
          const ultimoPunto = coords[coords.length - 1];
  
          L.marker(primerPunto, { icon: DefaultIcon }).addTo(mapa).bindPopup(puntos[0]?.descripcion || 'Inicio');
          L.marker(ultimoPunto, { icon: DefaultIcon }).addTo(mapa).bindPopup(puntos[puntos.length - 1]?.descripcion || 'Fin');
  
          const bounds = L.latLngBounds(coords as L.LatLngExpression[]);
          setTimeout(() => {
            mapa.fitBounds(bounds, { padding: [50, 50], maxZoom: 15, animate: true });
          }, 300);
  
          todasLasCoordenadas.push(...coords);
        }
      });
  
      // Fallback si no hay coordenadas
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

}