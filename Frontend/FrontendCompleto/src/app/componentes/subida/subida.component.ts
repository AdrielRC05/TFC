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

  constructor(private ruta: ActivatedRoute, private servicio: ServicioAppService) { }

  ngOnInit(): void {
    const edicionId = this.ruta.snapshot.paramMap.get('edicionId');
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
