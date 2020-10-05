import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../usuarios.service';
import { TareasService } from '../tareas.service';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  usuario: string;
  nombre: string;
  nuevatarea: FormGroup;
  fk_usuario: number;

  constructor(
    private usuariosService: UsuariosService,
    private tareasService: TareasService
  ) {

    this.nuevatarea = new FormGroup({
      titulo: new FormControl(),
      prioridad: new FormControl(),
      descripcion: new FormControl()
    })
  }

  async ngOnInit() {
    const token = localStorage.getItem('token');
    console.log(token);

    this.usuario = await this.usuariosService.getByToken(token);
    this.nombre = this.usuario['usuarioUser'];
    this.fk_usuario = this.usuario['usuarioId'];

  }

  async registrarTarea() {

    const respuesta = await this.tareasService.nuevaTarea(this.nuevatarea.value, this.fk_usuario);
    console.log(respuesta);

  }

}
