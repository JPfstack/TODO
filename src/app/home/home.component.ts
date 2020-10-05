import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // VARIABLES 
  login: FormGroup;

  constructor(
    private usuariosService: UsuariosService,
    private router: Router
  ) {
    this.login = new FormGroup({
      usuario: new FormControl(),
      password: new FormControl()
    })
  }

  ngOnInit(): void {
  }

  async onLogin() {
    const respuesta = await this.usuariosService.getByUser(this.login.value);
    console.log(respuesta.usuario.id, respuesta);
    localStorage.setItem('token', respuesta['token']);
    localStorage.setItem('usuario', respuesta.usuario.usuario);

    this.router.navigate(['/user'])
  }
}
