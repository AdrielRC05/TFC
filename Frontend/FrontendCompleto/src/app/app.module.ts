import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { PilotoComponent } from './componentes/RallysDelPiloto/piloto.component';
import { CopilotoComponent } from './componentes/copiloto/copiloto.component';
import { EdicionComponent } from './componentes/edicion/edicion.component';
import { PilotosComponent } from './componentes/pilotos/pilotos.component';
import { CopilotosComponent } from './componentes/copilotos/copilotos.component';
import { RallyPilotosComponent } from './componentes/pilotosDelRally/rally-pilotos.component';
import { NavbarReutilizableComponent } from './componentes/navbar-reutilizable/navbar-reutilizable.component';
import { SubidasComponent } from './componentes/subidas/subidas.component';
import { SubidaComponent } from './componentes/subida/subida.component';
import { BreadcrumbsComponent } from './componentes/breadcrumbs/breadcrumbs.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    PilotoComponent,
    CopilotoComponent,
    EdicionComponent,
    PilotosComponent,
    CopilotosComponent,
    RallyPilotosComponent,
    NavbarReutilizableComponent,
    SubidasComponent,
    SubidaComponent,
    BreadcrumbsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
