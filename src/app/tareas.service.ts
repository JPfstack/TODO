import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  nuevaURL: string;

  constructor(
    private httpClient: HttpClient
  ) {
    this.nuevaURL = "http://localhost:3000/api/tareas";
  }


  nuevaTarea(formvalues, pUsuario): Promise<any> {
    return this.httpClient.post<any>(this.nuevaURL, { formvalues, pUsuario }).toPromise();
  }
}
