import { Component, HostListener, OnInit } from '@angular/core';
import { ServicioAppService } from '../../servicios/servicio-app.service';

@Component({
  selector: 'app-pilotos',
  standalone: false,
  templateUrl: './pilotos.component.html',
  styleUrls: ['./pilotos.component.css']
})
export class PilotosComponent implements OnInit {

  pilotos: any[] = [];
  pilotosFiltrados: any[] = [];
  busqueda: string = '';
  filtroCoche: string = '';
  mostrarInfo: boolean[] = [];
  cargando = false;
  filtroActivo: string = 'nombre';
  orden: string = 'asc';
  mostrarPanelFiltro: boolean = false;
  filtrosDisponibles = ['nombre', 'titulos'];

  constructor(private servicio: ServicioAppService) {}

  ngOnInit(): void {
    this.cargando = true;

    this.servicio.obtenerParticipantes().subscribe(data => {
      this.pilotos = data;
      this.pilotosFiltrados = [...this.pilotos];
      this.cargando = false;
    });
  }

  filtrarPilotos() {
    let resultados = [...this.pilotos];
  
    // Filtrar por nombre si hay texto
    if (this.busqueda.trim()) {
      const filtroNombre = this.busqueda.toLowerCase();
      resultados = resultados.filter(p => 
        p.nombre?.toLowerCase().includes(filtroNombre)
      );
    }
  
    // Filtrar por coche si hay texto
    if (this.filtroCoche.trim()) {
      const filtroVehiculo = this.filtroCoche.toLowerCase();
      resultados = resultados.filter(p => 
        p.coche?.toLowerCase().includes(filtroVehiculo)
      );
    }
  
    // Aplicar ordenamiento
    if (this.filtroActivo === 'nombre') {
      resultados.sort((a, b) => {
        return this.orden === 'asc' 
          ? a.nombre.localeCompare(b.nombre)
          : b.nombre.localeCompare(a.nombre);
      });
    } else if (this.filtroActivo === 'titulos') {
      resultados.sort((a, b) => {
        const titulosA = a.titulos || 0;
        const titulosB = b.titulos || 0;
  
        return this.orden === 'asc' ? titulosA - titulosB : titulosB - titulosA;
      });
    }
  
    this.pilotosFiltrados = resultados;
  }

  toggleInfo(index: number) {
    this.mostrarInfo[index] = !this.mostrarInfo[index];
  }

  toggleFiltro() {
    this.mostrarPanelFiltro = !this.mostrarPanelFiltro;
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