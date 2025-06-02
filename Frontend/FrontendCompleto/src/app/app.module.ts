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
import { RallyPilotosComponent } from './componentes/pilotosDelRally/rally-pilotos.component';
import { NavbarReutilizableComponent } from './componentes/navbar-reutilizable/navbar-reutilizable.component';
import { SubidasComponent } from './componentes/subidas/subidas.component';
import { SubidaComponent } from './componentes/subida/subida.component';
import { BreadcrumbsComponent } from './componentes/breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './componentes/header/header.component';
import { HeroComponent } from './componentes/hero/hero.component';
import { NoticiasComponent } from './componentes/noticias/noticias.component';
import { FooterComponent } from './componentes/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    PilotoComponent,
    CopilotoComponent,
    EdicionComponent,
    PilotosComponent,
    RallyPilotosComponent,
    NavbarReutilizableComponent,
    SubidasComponent,
    SubidaComponent,
    BreadcrumbsComponent,
    HeaderComponent,
    HeroComponent,
    NoticiasComponent,
    FooterComponent
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
