import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];

  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
    this.clienteService.getClientes().subscribe(
       clientes => this.clientes = clientes
    );
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

}

