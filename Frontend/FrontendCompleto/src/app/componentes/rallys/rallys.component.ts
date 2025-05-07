import { Component, OnInit } from '@angular/core';
import { ServicioAppService } from '../../servicios/servicio-app.service';

@Component({
  selector: 'app-rallys',
  standalone: false,
  templateUrl: './rallys.component.html',
  styleUrl: './rallys.component.css'
})
export class RallysComponent implements OnInit {
  rallys: any[] = [];  // Almacena la lista de rallys
  rallysFiltrados: any[] = [];  // Lista de rallys filtrados
  busqueda: string = '';  // Variable para la búsqueda

  constructor(private servicio: ServicioAppService) { }

  ngOnInit(): void {
    this.obtenerRallys();  // Llamamos a la función para cargar los rallys
  }

  obtenerRallys(): void {
    this.servicio.obtenerRallys().subscribe((data: any) => {
      this.rallys = data;  // Asumimos que la respuesta es directamente la lista de rallys
      this.rallysFiltrados = data;  // Inicializamos los rallys filtrados con todos los rallys
    });
  }

  // Función para filtrar los rallys
  filtrarRallys(): void {
    if (this.busqueda.trim() === '') {
      this.rallysFiltrados = this.rallys;  // Si no hay texto de búsqueda, mostramos todos los rallys
    } else {
      this.rallysFiltrados = this.rallys.filter(rally =>
        rally.nombre.toLowerCase().includes(this.busqueda.toLowerCase())  // Filtra por nombre
      );
    }
  }
}
