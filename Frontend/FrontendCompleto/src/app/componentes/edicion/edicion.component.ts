import { Component } from '@angular/core';
import { ServicioAppService } from '../../servicios/servicio-app.service';

@Component({
  selector: 'app-edicion',
  standalone: false,
  templateUrl: './edicion.component.html',
  styleUrl: './edicion.component.css'
})
export class EdicionComponent {
  ediciones: any[] = [];

  constructor(private servicio: ServicioAppService) { }

  ngOnInit(): void {
    this.servicio.obtenerEdiciones().subscribe((data: any) => {
      this.ediciones = data;
    });
  }
}
