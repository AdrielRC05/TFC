import { Component } from '@angular/core';
import { ServicioAppService } from '../../servicios/servicio-app.service';

@Component({
  selector: 'app-pilotos',
  standalone: false,
  templateUrl: './pilotos.component.html',
  styleUrl: './pilotos.component.css'
})
export class PilotosComponent {
  pilotos: any[] = [];  // Lista original de pilotos
  pilotosFiltrados: any[] = [];  // Lista de pilotos filtrados
  busqueda: string = '';  // Texto de búsqueda

  constructor(private servicio: ServicioAppService) { }

  ngOnInit(): void {
    this.obtenerPilotos();  // Llamamos a la función para cargar los pilotos
  }

  obtenerPilotos(): void {
    this.servicio.obtenerParticipantes().subscribe((data: any) => {
      this.pilotos = data;  // Asumimos que la respuesta es directamente la lista de pilotos
      this.pilotosFiltrados = data;  // Inicializamos los pilotos filtrados con todos los pilotos
    });
  }

  // Función para filtrar los pilotos
  filtrarPilotos(): void {
    if (this.busqueda.trim() === '') {
      this.pilotosFiltrados = this.pilotos;  // Si no hay texto de búsqueda, mostramos todos los pilotos
    } else {
      this.pilotosFiltrados = this.pilotos.filter(piloto =>
        piloto.nombre.toLowerCase().includes(this.busqueda.toLowerCase())  // Filtra por nombre
      );
    }
  }
}
