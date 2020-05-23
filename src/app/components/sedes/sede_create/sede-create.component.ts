import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { Router } from '@angular/router';
import {Sede} from "../../../models/Sede";

@Component({
  selector: 'app-cliente-create',
  templateUrl: './sede-create.component.html',
  styleUrls: ['./sede-create.component.css']
})
export class SedeCreateComponent implements OnInit {

  public sede;

  constructor(
    private _clienteService: ClienteService,
    private _router : Router
  ) {
    this.sede = new Sede('','','');
  }

  ngOnInit() {
  }

  onSubmit(clienteForm){
    if(clienteForm.valid){

      this._clienteService.insert_cliente({
        nombres: clienteForm.value.nombres,
        dni: clienteForm.value.dni,
        correo: clienteForm.value.correo
      }).subscribe(
        response=>{
          this._router.navigate(['clientes']);

        },
        error=>{

        }
      );

    }
  }
}
