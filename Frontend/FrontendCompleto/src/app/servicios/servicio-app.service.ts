import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioAppService {

  urlCampeonatos = 'http://localhost:8080/api/ediciones'
  urlRallys = 'http://localhost:8080/api/subidas'
  urlPilotos = 'http://localhost:8080/api/participantes'
  urlCopilotos = 'http://localhost:8080/copilotos'

  constructor(private http:HttpClient) { }

  obtenerCampeonatos():Observable<any[]>{
    return this.http.get<any[]>(this.urlCampeonatos)
  }

  obtenerCampeonatosPorNombre(nombre:string):Observable<any[]>{
    return this.http.get<any[]>(`${this.urlCampeonatos}+?nombre=${nombre}`)
  }

  obtenerRallysPorCampeonato(campeonatoId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.urlRallys}/campeonato/${campeonatoId}`);
  }

  obtenerRallys(): Observable<any[]> {
    return this.http.get<any[]>(this.urlRallys);
  }

  obtenerPilotos(): Observable<any[]> {
    return this.http.get<any[]>(this.urlPilotos);
  }

  obtenerCopilotos(): Observable<any[]> {
    return this.http.get<any[]>(this.urlCopilotos);
  }

  obtenerRallysPiloto(pilotoId:number): Observable<any[]> {
    return this.http.get<any[]>(`${this.urlPilotos}/${pilotoId}/rallys`);
  }

  obtenerPilotosRally(rallyId:number): Observable<any[]> {
    return this.http.get<any[]>(`${this.urlRallys}/${rallyId}/pilotos`);
  }
}
