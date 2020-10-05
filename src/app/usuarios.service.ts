import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  usuariosURL: string;
  loginURL: string;
  tokenURL: string;

  constructor(
    private httpClient: HttpClient
  ) {
    this.usuariosURL = "http://localhost:3000/api/usuarios";
    this.loginURL = "http://localhost:3000/api/usuarios/login";
    this.tokenURL = "http://localhost:3000/api/usuarios/token"

  }


  registroUsuario(formvalues): Promise<any> {
    return this.httpClient.post<any>(this.usuariosURL, formvalues).toPromise();
  };

  getByUser(formvalues): Promise<any> {
    return this.httpClient.post<any>(this.loginURL, formvalues).toPromise();
  };

  getByToken(token): any {
    let decode = jwt_decode(token);
    return decode;
  }

}
