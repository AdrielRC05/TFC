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

  constructor(private servicio: ServicioAppService) { }

  ngOnInit(): void {
    this.obtenerSubidas();  // Llamamos a la función para cargar los rallys
  }

  obtenerSubidas(): void {
    this.servicio.obtenerSubidas().subscribe((data: any) => {
      this.subidas = data;  // Asumimos que la respuesta es directamente la lista de rallys
      this.subidasFiltradas = data;  // Inicializamos los rallys filtrados con todos los rallys
    });
  }

  // Función para filtrar los rallys
  filtrarSubidas(): void {
    if (this.busqueda.trim() === '') {
      this.subidasFiltradas = this.subidas;  // Si no hay texto de búsqueda, mostramos todos los rallys
    } else {
      this.subidasFiltradas = this.subidas.filter(subida =>
        subida.nombre.toLowerCase().includes(this.busqueda.toLowerCase())  // Filtra por nombre
      );
    }
  }
}
