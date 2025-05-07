import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { PilotoComponent } from './componentes/RallysDelPiloto/piloto.component';
import { CopilotoComponent } from './componentes/copiloto/copiloto.component';
import { RallyComponent } from './componentes/rally/rally.component';
import { CampeonatoComponent } from './componentes/campeonato/campeonato.component';
import { RallysComponent } from './componentes/rallys/rallys.component';
import { PilotosComponent } from './componentes/pilotos/pilotos.component';
import { RallyPilotosComponent } from './componentes/pilotosDelRally/rally-pilotos.component';

const rutas:Routes = [
  {path:'pilotos',component:PilotosComponent},
  {path:'copilotos',component:CopilotoComponent},
  {path:'rallys',component:RallysComponent},
  {path:'campeonatos',component:CampeonatoComponent},
  {path:'api/ediciones',component:CampeonatoComponent},
  {path:'api/participantes',component:PilotoComponent},
  {path:'api/subidas',component:RallysComponent},
  {path:'rallyCampeonatos/:id', component:RallyComponent},
  {path:'campeonatos/:id',component: CampeonatoComponent},
  {path:'campeonatos/:id/rallys',component: RallyComponent},
  {path:'pilotos/:pilotoId/rallys',component: PilotoComponent},
  {path:'rallys/:id/pilotos',component: RallyPilotosComponent},
  {path:'',component:InicioComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(rutas, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
