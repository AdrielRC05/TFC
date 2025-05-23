import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RutaService {

  private apiKey = '5b3ce3597851110001cf6248d92653be25b942879c47c163ea4b9043'; 
  private apiUrl = 'https://api.openrouteservice.org/v2/directions/driving-car/geojson ';

  constructor(private http: HttpClient) {}

  getRuta(origen: [number, number], destino: [number, number]): Observable<any> {
    const body = {
      coordinates: [[origen[1], origen[0]], [destino[1], destino[0]]] // formato esperado por OpenRouteService
    };

    const headers = new HttpHeaders({
      'Authorization': this.apiKey,
      'Content-Type': 'application/json'
    });

    return this.http.post(this.apiUrl, body, { headers });
  }
}