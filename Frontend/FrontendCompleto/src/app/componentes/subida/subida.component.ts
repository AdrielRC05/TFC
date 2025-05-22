import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicioAppService } from '../../servicios/servicio-app.service';
import * as L from 'leaflet';
import 'leaflet/dist/images/marker-icon.png';
import 'leaflet/dist/images/marker-shadow.png';
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'assets/marker-icon-2x.png',
  iconUrl: 'assets/marker-icon.png',
  shadowUrl: 'assets/marker-shadow.png',
});

@Component({
  selector: 'app-subida',
  standalone: false,
  templateUrl: './subida.component.html',
  styleUrl: './subida.component.css'
})
export class SubidaComponent implements OnInit {
  subidas: any[] = [];  // Lista original de subidas
  subidasFiltradas: any[] = [];  // Lista de subidas filtradas
  edicion: any = {};  // Datos del campeonato
  busqueda: string = '';  // Texto de búsqueda
  fechaFiltro: string = '';  // Filtro de fecha

  constructor(private ruta: ActivatedRoute, private servicio: ServicioAppService) { }

  ngOnInit(): void {
    const edicionId = this.ruta.snapshot.paramMap.get('edicionId');

    if (edicionId) {
      this.servicio.obtenerEdicionPorId(edicionId).subscribe(
      (edicionData: any) => {
        this.edicion = edicionData;
      },
      (error: any) => {
        console.error('Error al cargar la edición', error);
      }
      );
    } else {
      console.error('edicionId is null');
    }

    this.servicio.obtenerSubidasPorEdicion(String(edicionId)).subscribe(
      (data: any) => {
        if (data && Array.isArray(data)) {
          this.subidas = data;
          this.subidasFiltradas = data;
        } else {
          console.error('Datos no encontrados', data);
        }
      }
    );
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
  }  
  
  formatearFecha(fechaString: string): string {
    const fecha = new Date(fechaString);
    const year = fecha.getFullYear();
    const month = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const day = fecha.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;  // mismo formato que devuelve <input type="date">
  }  

  // Función para generar las opciones del mapa con puntos
  getMapaOptions(rutas: any[] = []): L.MapOptions | null {
    if (!Array.isArray(rutas) || rutas.length === 0) {
      return null;
    }
  
    const puntos = rutas[0].puntos;
  
    if (!Array.isArray(puntos) || puntos.length === 0) {
      return null;
    }
  
    const center = [puntos[0].latitud, puntos[0].longitud];
    const markers = puntos.map(p =>
      L.marker([p.latitud, p.longitud]).bindPopup(p.descripcion)
    );
  
    const polyline = puntos.length >= 2
      ? L.polyline(puntos.map(p => [p.latitud, p.longitud]), { color: 'blue' })
      : null;
  
    return {
      layers: [
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }),
        ...markers,
        ...(polyline ? [polyline] : [])
      ],
      zoom: 13,
      center: L.latLng(center[0], center[1])
    };
  }  
  
}
