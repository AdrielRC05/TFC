import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface Noticia {
  id: number;
  enlace: string;
  ano: number | null;
}

@Component({
  selector: 'app-noticias',
  standalone: false,
  templateUrl: './noticias.component.html',
  styleUrl: './noticias.component.css'
})

export class NoticiasComponent implements OnInit {

  noticias: Noticia[] = [];
  noticiasFiltradas: Noticia[] = [];
  filtroAno: number | null = null;
  cargando = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Noticia[]>('http://localhost:8080/api/noticias').subscribe(data => {
      this.noticias = data;
      this.noticiasFiltradas = [...this.noticias];
      this.cargando = false;
    });
  }

  filtrarNoticias() {
    const añoFiltro = this.filtroAno;

    if (!añoFiltro) {
      this.noticiasFiltradas = [...this.noticias];
      return;
    }

    this.noticiasFiltradas = this.noticias.filter(noticia => {
      return noticia.ano === añoFiltro;
    });
  }
}
