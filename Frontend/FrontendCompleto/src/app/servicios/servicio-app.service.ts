import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

interface TopSubida {
  nombre: string;
  repeticiones: number;
}

interface Edicion {
  id: number;
  lugar: string;
  ano: number;
}

interface EventoCalendario {
  nombre: string;
  localizacion: string;
  fecha_inicio: string;
}

@Injectable({
  providedIn: 'root'
})
export class ServicioAppService {

  urlSubidas = 'http://https://cgm-dyac.onrender.com//api/subidas'
  urlEdiciones = 'http://https://cgm-dyac.onrender.com//api/ediciones'
  urlParticipante = 'http://https://cgm-dyac.onrender.com//api/participantes'
  urlNoticias = 'http://https://cgm-dyac.onrender.com//api/noticias'
  

  constructor(private http:HttpClient) { }

  obtenerSubidas(): Observable<any[]> {
    return this.http.get<any[]>(this.urlSubidas);
  }

  obtenerSubidasPorNombre(nombre: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.urlSubidas}?nombre=${nombre}`);
  }

  obtenerSubidasPorEdicion(edicionId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.urlSubidas}/edicion/${edicionId}/subidas`);
  }

  obtenerEdiciones(): Observable<any[]> {
    return this.http.get<any[]>(this.urlEdiciones);
  }

  obtenerEdicionPorId(id: string): Observable<any> {
    return this.http.get<any>(`${this.urlEdiciones}/${id}`);
  }

  obtenerParticipantes(): Observable<any[]> {
    return this.http.get<any[]>(this.urlParticipante);
  }

  obtenerParticipantesPorNombre(nombre: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.urlParticipante}?nombre=${nombre}`);
  }

  obtenerParticipantesPorSubida(subidaId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.urlParticipante}/subida/${subidaId}`);
  }

  obtenerNoticias(): Observable<any[]> {
    return this.http.get<any[]>(this.urlNoticias);
  }

  obtenerNoticiaPorAño(año: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.urlNoticias}?año=${año}`);
  }

  obtenerPuntosGuardados(rutaId: number): Observable<any[]> {
    return this.http.get<any[]>(`http://https://cgm-dyac.onrender.com//api/puntos/ruta/${rutaId}`);
  }
  
  guardarPuntosDeRuta(rutaId: number, puntos: any[]): Observable<any> {
    return this.http.post(`http://https://cgm-dyac.onrender.com//api/puntos/guardar/${rutaId}`, puntos);
  }

  getTop3Subidas(): Observable<TopSubida[]> {
    return this.http.get<TopSubida[]>(`${this.urlSubidas}/top3`);
  }

  getTop3Ediciones(): Observable<Edicion[]> {
    return this.http.get<Edicion[]>(`${this.urlEdiciones}/top3`);
  }

  getSubidasByEdicion(edicionId: number): Observable<EventoCalendario[]> {
    return this.http.get<EventoCalendario[]>(`${this.urlEdiciones}/${edicionId}/pruebas`);
  }

  getTopPilotos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.urlParticipante}/top`).pipe(
      map((pilotos: any[]) => pilotos.slice(0, 4))
    );
  }

}
