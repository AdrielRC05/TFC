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

const rutas: Routes = [
  {
    path: '', component: InicioComponent, data: { breadcrumb: 'Inicio' }
  },
  {
    path: 'ediciones', component: EdicionComponent, data: { breadcrumb: 'Ediciones' },
    children: [
      {
        path: ':id', component: EdicionComponent, data: { breadcrumb: 'Edición Detalle' }
      },
      {
        path: ':edicionId/subidas', component: SubidaComponent, data: { breadcrumb: 'Subidas' },
        children: [
          {
            path: 'rallys/:rallyId/pilotos', component: RallyPilotosComponent, data: { breadcrumb: 'Pilotos Rally' }
          }
        ]
      }
    ]
  },
  {
    path: 'pilotos', component: PilotosComponent, data: { breadcrumb: 'Pilotos' },
    children: [
      {
        path: ':pilotoId/rallys', component: PilotoComponent, data: { breadcrumb: 'Rallys Piloto' },
        children: [
          {
            path: 'subidas', component: SubidasComponent, data: { breadcrumb: 'Subidas' }
          }
        ]
      }
    ]
  },
  {
    path: 'copilotos', component: CopilotoComponent, data: { breadcrumb: 'Copilotos' }
  },
  {
    path: 'api/ediciones', component: EdicionComponent, data: { breadcrumb: 'Ediciones API' }
  },
  {
    path: 'api/subidas', component: SubidasComponent, data: { breadcrumb: 'Subidas API' }
  },
  {
    path: 'api/participantes', component: PilotoComponent, data: { breadcrumb: 'Participantes API' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(rutas, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
