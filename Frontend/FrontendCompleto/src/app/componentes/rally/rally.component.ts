import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicioAppService } from '../../servicios/servicio-app.service';

@Component({
  selector: 'app-rally',
  standalone: false,
  templateUrl: './rally.component.html',
  styleUrl: './rally.component.css'
})
export class RallyComponent {
  rallys: any[] = [];  // Lista original de rallys
  rallysFiltrados: any[] = [];  // Lista de rallys filtrados
  campeonato: any = {};  // Datos del campeonato
  busqueda: string = '';  // Texto de búsqueda

  constructor(private ruta: ActivatedRoute, private servicio: ServicioAppService) { }

  ngOnInit(): void {
    const campeonatoId = this.ruta.snapshot.paramMap.get('id');
    this.servicio.obtenerRallysPorCampeonato(String(campeonatoId)).subscribe(
      (data: any) => {
        if (data && Array.isArray(data)) {
          this.rallys = data;
          this.rallysFiltrados = data;  // Inicializamos los rallys filtrados con todos los rallys
        } else {
          console.error('Datos no encontrados', data);
        }
      },
      (error) => {
        console.error('Error al obtener los rallys:', error);
      }
    );
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
