import {
  Component,
  OnInit,
  QueryList,
  ViewChildren,
  ElementRef,
  HostListener
} from '@angular/core';
import { ServicioAppService } from '../../servicios/servicio-app.service';
import { RutaService } from '../../servicios/ruta.service';
import * as L from 'leaflet';
import { forkJoin, map, of, switchMap } from 'rxjs';

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
export class SubidasComponent implements OnInit {

  subidas: any[] = [];
  subidasFiltradas: any[] = [];
  busqueda: string = '';
  fechaFiltro: string = '';
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
      this.subidasFiltradas = [...data];
      this.mapasInicializados = new Array(data.length).fill(false);
      this.mostrarInfo = new Array(data.length).fill(false);
    });
  }

  filtrarSubidas(): void {
    this.subidasFiltradas = this.subidas.filter(subida => {
      const coincideNombre = this.busqueda === '' ||
        subida.nombre.toLowerCase().includes(this.busqueda.toLowerCase());

      const coincideFecha = this.fechaFiltro === '' || (
        (subida.fechaInicio && this.formatearFecha(subida.fechaInicio) === this.fechaFiltro) ||
        (subida.fechaFin && this.formatearFecha(subida.fechaFin) === this.fechaFiltro)
      );

      return coincideNombre && coincideFecha;
    });

    this.mostrarInfo = new Array(this.subidasFiltradas.length).fill(false);
    this.mapasInicializados = new Array(this.subidasFiltradas.length).fill(false);

    this.subidasFiltradas.forEach((_, index) => this.limpiarMapa(index));
  }

  formatearFecha(fechaString: string): string {
    const fecha = new Date(fechaString);
    const year = fecha.getFullYear();
    const month = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const day = fecha.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  tieneRutasConPuntos(subida: any): boolean {
    return subida.rutas?.some((ruta: any) =>
      ruta.puntos?.length > 0
    ) ?? false;
  }

  limpiarMapa(index: number): void {
  const elementoMapa = this.mapasRefs.toArray()[index]?.nativeElement;
  if (!elementoMapa) return;

  // Elimina completamente el mapa si existe
  if ((elementoMapa as any)._leaflet_map) {
    const mapa = (elementoMapa as any)._leaflet_map;
    mapa.off();
    mapa.remove();
    delete (elementoMapa as any)._leaflet_map;
  }

  // Limpia el contenedor del mapa
  while (elementoMapa.firstChild) {
    elementoMapa.removeChild(elementoMapa.firstChild);
  }
}

  private inicializarMapaIndividual(elementoMapa: HTMLElement, index: number): void {
      const subida = this.subidasFiltradas[index];
      if (!subida || this.mapasInicializados[index]) return;
  
      // Crear el mapa Leaflet
      const mapa = L.map(elementoMapa).setView([42.6, -7.78], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',  {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapa);
  
      setTimeout(() => {
        mapa.invalidateSize();
      }, 200);
  
      const rutas = subida.rutas || [];
      const todasLasCoordenadas: [number, number][] = [];
  
      rutas.forEach((ruta: any) => {
        const puntos = ruta.puntos || [];
        const coordenadas: [number, number][] = puntos.map((p: any) => [
          parseFloat(p.latitud),
          parseFloat(p.longitud)
        ]);
  
        if (coordenadas.length === 2) {
          const origen: [number, number] = coordenadas[0];
          const destino: [number, number] = coordenadas[1];
  
          L.marker(origen, { icon: DefaultIcon }).addTo(mapa).bindPopup('Salida');
          L.marker(destino, { icon: DefaultIcon }).addTo(mapa).bindPopup('Llegada');
  
          // Si ya hay puntos guardados → usamos esos
          this.servicio.obtenerPuntosGuardados(ruta.id).subscribe(puntosGuardados => {
            if (puntosGuardados.length > 2) {
              const coords = puntosGuardados.map((p: any) => [
                p.latitud,
                p.longitud
              ]) as [number, number][];
  
              L.polyline(coords, { color: '#0054a6', weight: 4 }).addTo(mapa);
  
              const bounds = L.latLngBounds(coords);
              mapa.fitBounds(bounds, { padding: [50, 50], maxZoom: 15, animate: true });
  
              todasLasCoordenadas.push(...coords);
            } else {
              // Si no hay puntos guardados → generarlos con ORS
              this.rutaService.getRuta(origen, destino).subscribe(geojson => {
                const coordsFromOR = geojson.features[0].geometry.coordinates.map(
                  (c: [number, number]) => [c[1], c[0]] as [number, number]
                );
  
                L.polyline(coordsFromOR, { color: '#0054a6', weight: 4 }).addTo(mapa);
  
                const bounds = L.latLngBounds(coordsFromOR);
                mapa.fitBounds(bounds, { padding: [50, 50], maxZoom: 15, animate: true });
  
                todasLasCoordenadas.push(...coordsFromOR);
  
                // Guardar en BBDD
                const puntosParaGuardar = coordsFromOR.map((c: any[], i: number) => ({
                  latitud: c[0],
                  longitud: c[1],
                  orden: i + 1,
                  descripcion: i === 0 ? 'Inicio' : i === coordsFromOR.length - 1 ? 'Fin' : ''
                }));
  
                this.servicio.guardarPuntosDeRuta(ruta.id, puntosParaGuardar).subscribe(() => {
                  console.log('Ruta guardada:', ruta.id);
                });
              });
            }
  
            todasLasCoordenadas.push(origen, destino);
          });
  
          todasLasCoordenadas.push(origen, destino);
        } else if (coordenadas.length > 2) {
          L.polyline(coordenadas, { color: 'red' }).addTo(mapa);
  
          const primerPunto = coordenadas[0];
          const ultimoPunto = coordenadas[coordenadas.length - 1];
  
          L.marker(primerPunto, { icon: DefaultIcon }).addTo(mapa).bindPopup('Inicio');
          L.marker(ultimoPunto, { icon: DefaultIcon }).addTo(mapa).bindPopup('Fin');
  
          const bounds = L.latLngBounds(coordenadas);
          setTimeout(() => {
            mapa.fitBounds(bounds, { padding: [50, 50], maxZoom: 15, animate: true });
          }, 300);
  
          todasLasCoordenadas.push(...coordenadas);
        }
      });
  
      if (todasLasCoordenadas.length === 0) {
        setTimeout(() => {
          mapa.setView([42.6, -7.78], 13);
        }, 200);
      }
  
      // Asignamos el mapa al contenedor
  (elementoMapa as any)._leaflet_map = mapa;
  
  // Finalmente forzamos el tamaño
  setTimeout(() => {
    if (elementoMapa && elementoMapa.offsetHeight > 0 && elementoMapa.offsetWidth > 0) {
      mapa.invalidateSize();
    }
  }, 200);
    }

  toggleInfo(index: number): void {
    this.mostrarInfo[index] = !this.mostrarInfo[index];

    if (this.mostrarInfo[index]) {
      const elementoMapa = this.mapasRefs.toArray()[index]?.nativeElement;
      if (!elementoMapa) return;

      const mapaYaExiste = (elementoMapa as any)._leaflet_map;

      if (!mapaYaExiste) {
        // Primera vez: inicializamos el mapa
        this.inicializarMapaIndividual(elementoMapa, index);
      } else {
        // Segunda vez: solo ajustamos el tamaño
        setTimeout(() => {
          const mapa = (elementoMapa as any)._leaflet_map;
          if (mapa && elementoMapa.offsetHeight > 0) {
            mapa.invalidateSize();
          }
        }, 200);
      }
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