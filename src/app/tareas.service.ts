import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  nuevaURL: string;
  idURL: string;

  constructor(
    private httpClient: HttpClient
  ) {
    this.nuevaURL = "http://localhost:3000/api/tareas";
    this.idURL = "http://localhost:3000/api/tareas/id";
  }


  nuevaTarea(formvalues, pUsuario): Promise<any> {
    return this.httpClient.post<any>(this.nuevaURL, { formvalues, pUsuario }).toPromise();
  };

  getListaTareas(fk_usuario): Promise<any> {
    return this.httpClient.post<any>(this.idURL, { fk_usuario }).toPromise();
  };

  removeTarea(pId): Promise<number> {
    return this.httpClient.delete<number>(`${this.idURL}/${pId}`).toPromise();
  }
}
