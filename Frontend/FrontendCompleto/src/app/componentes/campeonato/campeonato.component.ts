import { Component } from '@angular/core';
import { ServicioAppService } from '../../servicios/servicio-app.service';

@Component({
  selector: 'app-campeonato',
  standalone: false,
  templateUrl: './campeonato.component.html',
  styleUrl: './campeonato.component.css'
})
export class CampeonatoComponent {
  campeonatos: any[] = [];

  constructor(private servicio: ServicioAppService) { }

  ngOnInit(): void {
    this.servicio.obtenerCampeonatos().subscribe((data: any) => {
      this.campeonatos = data;
    });
  }
}
