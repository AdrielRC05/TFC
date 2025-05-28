import { Component, HostListener, OnInit } from '@angular/core';
import { ServicioAppService } from '../../servicios/servicio-app.service';

@Component({
  selector: 'app-inicio',
  standalone: false,
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent{

  constructor(private servicio: ServicioAppService) {}

  generarRanking(subidas: any[]): any[] {
    const map = new Map();

    subidas.forEach(s => {
      const nombreLimpio = this.limpiarNombre(s.nombre);

      if (map.has(nombreLimpio)) {
        map.get(nombreLimpio).repeticiones += 1;
        map.get(nombreLimpio).años.push(new Date(s.fecha_inicio).getFullYear());
      } else {
        map.set(nombreLimpio, {
          nombre: nombreLimpio,
          repeticiones: 1,
          años: [new Date(s.fecha_inicio).getFullYear()],
          longitud: s.longitud || 5.8, // si está en BBDD → cámbialo por dato real
          desnivel: s.desnivel || 300, // lo mismo
          descripcion: s.descripcion || 'Descripción no disponible'
        });
      }
    });

    return Array.from(map.values()).sort((a, b) => b.repeticiones - a.repeticiones);
  }

  limpiarNombre(nombre: string): string {
    return nombre.split(',')[0].split('(')[0].trim(); // Limpia nombres tipo "Subida a Chantada (Poio)"
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

