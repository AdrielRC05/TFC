import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { EdicionComponent } from './componentes/edicion/edicion.component';
import { PilotosComponent } from './componentes/pilotos/pilotos.component';
import { SubidaComponent } from './componentes/subida/subida.component';
import { SubidasComponent } from './componentes/subidas/subidas.component';
import { NoticiasComponent } from './componentes/noticias/noticias.component';

const rutas: Routes = [
  { path: 'participantes', component: PilotosComponent, data: { breadcrumb: 'Pilotos' } },
  { path: 'noticias', component: NoticiasComponent, data: { breadcrumb: 'Noticias' } },
  { path: 'ediciones', component: EdicionComponent, data: { breadcrumb: 'Ediciones' } },
  { path: 'subidas', component: SubidasComponent, data: { breadcrumb: 'Subidas' } },
  { path: 'api/ediciones', component: EdicionComponent, data: { breadcrumb: 'Ediciones API' } },
  { path: 'api/subidas', component: SubidasComponent, data: { breadcrumb: 'Subidas API' } },
  { path: 'api/participantes', component: PilotosComponent, data: { breadcrumb: 'Participantes API' } },
  { path: 'ediciones/:id', component: EdicionComponent, data: { breadcrumb: 'Edición Detalle' } },
  { path: 'ediciones/:edicionId/subidas', component: SubidaComponent, data: { breadcrumb: 'Subidas de Edición' } },
  { path: '', component: InicioComponent, data: { breadcrumb: 'Inicio' } }
];

@NgModule({
  imports: [RouterModule.forRoot(rutas, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
