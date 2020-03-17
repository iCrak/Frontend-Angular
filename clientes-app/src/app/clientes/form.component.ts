import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router , ActivatedRoute} from '@angular/router';
import swal from 'sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public cliente: Cliente = new Cliente();
  public errores: string[];

  constructor(private clienteservice: ClienteService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cargarCliente();
  }

  cargarCliente(): void {
    this.activatedRoute.params.subscribe(params => {
      // tslint:disable-next-line: no-string-literal
      const id = params['id'];
      if (id) {
        this.clienteservice.getCliente(id).subscribe( (cliente) => this.cliente = cliente);
      }
    });
  }

   create(): void {
    this.clienteservice.create(this.cliente).
    subscribe(json => {
      this.router.navigate(['/clientes']);
      swal.fire('Nuevo Cliente', `${json.mensaje} : ${json.cliente.nombre}`, 'success');
    },
    err => {
      this.errores = err.error.errors as string[];
      console.log(err.error.errors);
    }
    );
  }
  update(): void {
    this.clienteservice.update(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes']);
        swal.fire('Cliente Actualizado', `El Cliente ${cliente.nombre} ha sido creado con exito! `, 'success');
      },
      err => {
        this.errores = err.error.errors as string[];
        console.log(err.error.errors);
      }
  );
  }



}
