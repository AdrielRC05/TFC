import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-reutilizable',
  standalone: false,
  templateUrl: './navbar-reutilizable.component.html',
  styleUrl: './navbar-reutilizable.component.css'
})
export class NavbarReutilizableComponent implements OnInit{
  @Input() nombres:string[] = []
  @Input() colorBotonAct:string = ""
  @Input() colorNumeroAct:string = ""
  @Input() colorBotonDesact:string = ""
  @Input() colorNumeroDesact:string = ""
  @Input() colorBarra:string = ""
  @Input() rutas: string[] = []
  
  constructor(private ruta:Router){}

  activeStep: number = 0;

  setActiveStep(step: number): void {
    this.activeStep = step;
    this.ruta.navigate([this.rutas[step]]);
  }

  getStyles(): object{
    let espacio = (100/this.nombres.length)
    return{
      '--colorBotonAct': this.colorBotonAct,
      '--colorNumeroAct': this.colorNumeroAct,
      '--colorBotonDesact': this.colorBotonDesact,
      '--colorNumeroDesact': this.colorNumeroDesact,
      '--colorBarra': this.colorBarra,
      '--espacio':espacio+'%'
    };
  }

  ngOnInit(): void {
  }
}
