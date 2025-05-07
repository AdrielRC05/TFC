import { Component, OnInit } from '@angular/core';
import { ServicioAppService } from '../../servicios/servicio-app.service';


@Component({
  selector: 'app-rally-pilotos',
  standalone: false,
  templateUrl: './rally-pilotos.component.html',
  styleUrl: './rally-pilotos.component.css'
})
export class RallyPilotosComponent implements OnInit{
  pilotos: any[] = [];
  rallyId: number = 1;

  constructor(private servicioService: ServicioAppService) { }

  ngOnInit(): void {
    this.obtenerPilotosRally();
  }

  obtenerPilotosRally(): void {
    this.servicioService.obtenerPilotosRally(this.rallyId).subscribe((data) => {
      this.pilotos = data;
    });
  }
}
