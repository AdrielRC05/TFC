import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioAppService {

  #urlCampeonatos = 'http://localhost:8080/api/ediciones'
  #urlRallys = 'http://localhost:8080/api/subidas'
  #urlPilotos = 'http://localhost:8080/api/participantes'
  #urlCopilotos = 'http://localhost:8080/copilotos'

  urlSubidas = 'http://localhost:8080/api/subidas'
  urlEdiciones = 'http://localhost:8080/api/ediciones'
  urlParticipante = 'http://localhost:8080/api/pilotos'
  urlNoticias = 'http://localhost:8080/api/noticias'

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
}
