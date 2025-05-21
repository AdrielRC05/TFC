import { Component, OnInit } from '@angular/core';
import { ServicioAppService } from '../../servicios/servicio-app.service';

@Component({
  selector: 'app-subidas',
  standalone: false,
  templateUrl: './subidas.component.html',
  styleUrl: './subidas.component.css'
})
export class SubidasComponent implements OnInit {
  subidas: any[] = [];  // Almacena la lista de rallys
  subidasFiltradas: any[] = [];  // Lista de rallys filtrados
  busqueda: string = '';  // Variable para la búsqueda
  fechaFiltro: string = '';  // Variable para el filtro de fecha

  constructor(private servicio: ServicioAppService) { }

  ngOnInit(): void {
    this.obtenerSubidas();  // Llamamos a la función para cargar los rallys
    this.filtrarSubidas(); // Llamamos a la función para filtrar los rallys
  }

  obtenerSubidas(): void {
    this.servicio.obtenerSubidas().subscribe((data: any) => {
      this.subidas = data;  // Asumimos que la respuesta es directamente la lista de rallys
      this.subidasFiltradas = data;  // Inicializamos los rallys filtrados con todos los rallys
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
  }  
  
  formatearFecha(fechaString: string): string {
    const fecha = new Date(fechaString);
    const year = fecha.getFullYear();
    const month = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const day = fecha.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;  // mismo formato que devuelve <input type="date">
  } 
}
