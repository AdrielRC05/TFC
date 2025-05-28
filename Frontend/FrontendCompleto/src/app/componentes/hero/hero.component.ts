import { Component, OnInit } from '@angular/core';
import { ServicioAppService } from '../../servicios/servicio-app.service';

interface EventoCalendario {
  nombre: string;
  localizacion: string;
  fecha_inicio: string;
}

@Component({
  selector: 'app-hero',
  standalone: false,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})

export class HeroComponent implements OnInit {

  eventosCalendario: EventoCalendario[] = [];
  mostrarTodas = false;

  top3Subidas: any[] = [];
  top3Ediciones: any[] = [];

  constructor(private servicio: ServicioAppService) {}

  ngOnInit(): void {
    this.servicio.getTop3Subidas().subscribe(data => {
      this.top3Subidas = data;
    });

    this.servicio.getTop3Ediciones().subscribe(data => {
      this.top3Ediciones = data;
    });

    this.servicio.getSubidasByEdicion(37).subscribe(data => {
      this.eventosCalendario = data;
    });
  }
}
