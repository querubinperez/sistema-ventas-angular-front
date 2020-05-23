import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente-index',
  templateUrl: './sede-index.component.html',
  styleUrls: ['./sede-index.component.css']
})
export class SedeIndexComponent implements OnInit {

  public sedes;

  constructor(
    private _clienteService: ClienteService
  ) { }

  ngOnInit() {
    this._clienteService.get_clientes().subscribe(
      response=>{
        this.sedes = response.clientes;
        console.log(this.sedes);

      },
      error=>{

      }
    )
  }

  eliminar(id){
    Swal.fire({
      title: 'Estas seguro de eliminarlo?',
      text: "Eliminación!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Registro eliminado!',
          'Se elimino correctamente.',
          'success'
        )

        this._clienteService.delete_cliente(id).subscribe(
          resposen=>{
            this._clienteService.get_clientes().subscribe(
              response=>{
                this.sedes = response.clientes;
              },
              error=>{

              }
            );
          },
          erro=>{

          }
        );

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Cancelado',
          'Se cancelo la solicitud :)',
          'error'
        )
      }
    })
  }

}
