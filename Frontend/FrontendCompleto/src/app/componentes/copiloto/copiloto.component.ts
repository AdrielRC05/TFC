import { Component } from '@angular/core';
import { ServicioAppService } from '../../servicios/servicio-app.service';

@Component({
  selector: 'app-copiloto',
  standalone: false,
  templateUrl: './copiloto.component.html',
  styleUrl: './copiloto.component.css'
})
export class CopilotoComponent {
  copilotos: any[] = [];  // Lista original de copilotos
  copilotosFiltrados: any[] = [];  // Lista de copilotos filtrados
  busqueda: string = '';  // Texto de búsqueda

  constructor(private servicio: ServicioAppService) { }

  ngOnInit(): void {
    this.obtenerCopilotos();  // Llamamos a la función para cargar los copilotos
  }

  obtenerCopilotos(): void {
    this.servicio.obtenerCopilotos().subscribe((data: any) => {
      this.copilotos = data;  // Asumimos que la respuesta es directamente la lista de copilotos
      this.copilotosFiltrados = data;  // Inicializamos los copilotos filtrados con todos los copilotos
    });
  }

  // Función para filtrar los copilotos
  filtrarCopilotos(): void {
    if (this.busqueda.trim() === '') {
      this.copilotosFiltrados = this.copilotos;  // Si no hay texto de búsqueda, mostramos todos los copilotos
    } else {
      this.copilotosFiltrados = this.copilotos.filter(copiloto =>
        copiloto.nombre.toLowerCase().includes(this.busqueda.toLowerCase())  // Filtra por nombre
      );
    }
  }
}
