import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2';
import Swal from 'sweetalert2';
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from './detalle/modal.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  public paginador: any;
  public clienteSeleccionado: Cliente;
  constructor(private clienteService: ClienteService, private activatedRoute: ActivatedRoute, private modalService: ModalService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe( params => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.clienteService.getClientes(page)
    .pipe(
      tap(response => {
        console.log('ClientesComponent : tap 3');
        (response.content as Cliente[]).forEach( cliente => {
         console.log(cliente.nombre);
         });
    })
    ).subscribe(
       response => {
         this.clientes = response.content as Cliente[];
         this.paginador = response;
        });
    });

    this.modalService.notificarUpload.subscribe( cliente => {
      this.clientes = this.clientes.map(clienteOriginal => {
        // tslint:disable-next-line: no-conditional-assignment
        // tslint:disable-next-line: triple-equals
        if ( cliente.id == clienteOriginal.id) {
          clienteOriginal.foto = cliente.foto;
        }
        return clienteOriginal;
      });
    });
  }
  delete(cliente: Cliente): void {
    Swal.fire({
      title: 'Está Seguro?',
      text: `¿Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.value) {
        this.clienteService.delete(cliente.id).subscribe(response => {
          this.clientes = this.clientes.filter(cli => cli !== cliente);
          Swal.fire(
            'Eliminado!',
            'Se Elimino con Exito!',
            'success'
          );
        });
      }
    });
  }
  abrirModal(cliente: Cliente) {
    this.clienteSeleccionado = cliente;
    this.modalService.abrirModal();
  }

}

