import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // VARIABLES
  registro: FormGroup;
  existe: boolean;

  constructor(
    private usuarioService: UsuariosService,
    private router: Router
  ) {

    this.registro = new FormGroup({
      usuario: new FormControl(),
      email: new FormControl(),
      password: new FormControl()
    });

    this.existe = false;
  }

  ngOnInit(): void {
  }


  async onRegistro() {
    const respuesta = await this.usuarioService.registroUsuario(this.registro.value);
    console.log(this.registro.value);
    console.log(respuesta);

    if (respuesta.affectedRows != 1) {
      this.existe = true;
      setTimeout(() => {
        this.existe = false;
      }, 4000);
      this.registro.reset();
    } else {
      this.router.navigate(['/home'])

    }
  }

}
