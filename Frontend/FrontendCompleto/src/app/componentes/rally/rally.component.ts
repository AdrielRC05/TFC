import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicioAppService } from '../../servicios/servicio-app.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-rally',
  standalone: false,
  templateUrl: './rally.component.html',
  styleUrl: './rally.component.css'
})
export class RallyComponent {
  subidas: any[] = [];  // Lista original de subidas
  subidasFiltradas: any[] = [];  // Lista de subidas filtradas
  campeonato: any = {};  // Datos del campeonato
  busqueda: string = '';  // Texto de búsqueda

  constructor(private ruta: ActivatedRoute, private servicio: ServicioAppService) { }

  ngOnInit(): void {
    const campeonatoId = this.ruta.snapshot.paramMap.get('id');
    this.servicio.obtenerSubidasPorCampeonato(String(campeonatoId)).subscribe(
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

  filtrarRallys(): void {
    if (this.busqueda.trim() === '') {
      this.subidasFiltradas = this.subidas;
    } else {
      this.subidasFiltradas = this.subidas.filter(subida =>
        subida.nombre.toLowerCase().includes(this.busqueda.toLowerCase())
      );
    }
  }

  // Función para generar las opciones del mapa con puntos
  getMapaOptions(puntos: any[] = []): L.MapOptions {
    const center = puntos.length ? [puntos[0].latitud, puntos[0].longitud] : [42.5, -7.5];

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
