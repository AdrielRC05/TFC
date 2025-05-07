import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { PilotoComponent } from './componentes/RallysDelPiloto/piloto.component';
import { CopilotoComponent } from './componentes/copiloto/copiloto.component';
import { RallyComponent } from './componentes/rally/rally.component';
import { CampeonatoComponent } from './componentes/campeonato/campeonato.component';
import { RallysComponent } from './componentes/rallys/rallys.component';
import { PilotosComponent } from './componentes/pilotos/pilotos.component';
import { CopilotosComponent } from './componentes/copilotos/copilotos.component';
import { RallyPilotosComponent } from './componentes/pilotosDelRally/rally-pilotos.component';
import { NavbarReutilizableComponent } from './componentes/navbar-reutilizable/navbar-reutilizable.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    PilotoComponent,
    CopilotoComponent,
    RallyComponent,
    CampeonatoComponent,
    RallysComponent,
    PilotosComponent,
    CopilotosComponent,
    RallyPilotosComponent,
    NavbarReutilizableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
