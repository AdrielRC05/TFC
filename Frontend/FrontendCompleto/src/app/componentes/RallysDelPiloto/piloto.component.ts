import { Component, OnInit } from '@angular/core';
import { ServicioAppService } from '../../servicios/servicio-app.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-piloto',
  standalone: false,
  templateUrl: './piloto.component.html',
  styleUrl: './piloto.component.css'
})
export class PilotoComponent implements OnInit{
  rallys: any[] = [];
  pilotoId: number = 0; // Este es el valor que vamos a actualizar desde la URL

  constructor(
    private servicioService: ServicioAppService,
    private route: ActivatedRoute // Injectamos ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Extraer el parámetro 'pilotoId' de la URL usando ActivatedRoute
    this.route.paramMap.subscribe(params => {
      const id = params.get('pilotoId');  // Obtener 'pilotoId' de la URL
      if (id) {
        this.pilotoId = +id;  // Convertir el id a número
        console.log('Piloto ID extraído de la URL:', this.pilotoId);
        this.obtenerRallysPiloto();  // Llamamos al servicio para obtener los rallys
      } else {
        console.error('No se encontró pilotoId en la URL');
      }
    });
  }

  obtenerRallysPiloto(): void {
    console.log('Haciendo la solicitud para el piloto ID:', this.pilotoId);
    this.servicioService.obtenerRallysPiloto(this.pilotoId).subscribe((data) => {
      console.log('Datos de rallys recibidos:', data);
      this.rallys = data;
    }, (error) => {
      console.error('Error al obtener rallys:', error);
    });
  }
}
