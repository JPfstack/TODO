import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../usuarios.service';
import { TareasService } from '../tareas.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';


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
  listaTareas: any;
  tarea: string;
  salir: boolean;

  constructor(
    private usuariosService: UsuariosService,
    private tareasService: TareasService,
    private router: Router
  ) {

    this.nuevatarea = new FormGroup({
      titulo: new FormControl(),
      prioridad: new FormControl(),
      descripcion: new FormControl()
    });

    this.salir = false;
  }

  async ngOnInit() {
    const token = localStorage.getItem('token');

    this.usuario = await this.usuariosService.getByToken(token);
    this.nombre = this.usuario['usuarioUser'];
    this.fk_usuario = this.usuario['usuarioId'];

    this.listaTareas = await this.tareasService.getListaTareas(this.fk_usuario);
    console.log(this.fk_usuario);
    console.log(this.listaTareas);
  };


  async registrarTarea() {
    const respuesta = await this.tareasService.nuevaTarea(this.nuevatarea.value, this.fk_usuario);
    this.nuevatarea.reset();
    this.ngOnInit();

  };


  async borrarTarea(pId) {
    const respuesta = await this.tareasService.removeTarea(pId);
    this.ngOnInit();
  };


  async onChange($event) {
    console.log($event.target.value);

    if ($event.target.value === "sin prioridad") {
      this.listaTareas = await this.tareasService.getListaTareas(this.fk_usuario);
    } else {
      this.listaTareas = (await this.tareasService.getListaTareas(this.fk_usuario)).filter(tarea => tarea.prioridad == $event.target.value)
    }
  };


  onSalir() {
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    this.salir = true;

    setTimeout(() => {
      this.router.navigate(['/home'])

    }, 3000);
  };


  buscarXInput(pLista, pInput) {
    let listaXInput = new Array();

    listaXInput = pLista.filter(tarea => {
      let tareaMinus = tarea.titulo.toLowerCase();
      return tareaMinus.includes(pInput);
    });
    return listaXInput;
  }


  onInput($event) {
    let inputBuscado = $event.target.value.toLowerCase();

    this.listaTareas = this.buscarXInput(this.listaTareas, inputBuscado);
    console.log(this.listaTareas);

    return this.listaTareas;
  };

}
