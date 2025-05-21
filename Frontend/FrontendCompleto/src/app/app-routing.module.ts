import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { PilotoComponent } from './componentes/RallysDelPiloto/piloto.component';
import { CopilotoComponent } from './componentes/copiloto/copiloto.component';
import { EdicionComponent } from './componentes/edicion/edicion.component';
import { PilotosComponent } from './componentes/pilotos/pilotos.component';
import { RallyPilotosComponent } from './componentes/pilotosDelRally/rally-pilotos.component';
import { SubidaComponent } from './componentes/subida/subida.component';
import { SubidasComponent } from './componentes/subidas/subidas.component';

const rutas:Routes = [
  {path:'pilotos',component:PilotosComponent},
  {path:'copilotos',component:CopilotoComponent},
  {path:'ediciones',component:EdicionComponent},
  {path:'api/ediciones',component:EdicionComponent},
  {path:'api/subidas',component:SubidasComponent},
  {path:'api/participantes',component:PilotoComponent},
  {path:'ediciones/:id',component: EdicionComponent},
  {path:'pilotos/:pilotoId/rallys',component: PilotoComponent},
  {path:'ediciones/:edicionId/subidas',component: SubidaComponent},
  {path:'rallys/:id/pilotos',component: RallyPilotosComponent},
  {path:'',component:InicioComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(rutas, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
