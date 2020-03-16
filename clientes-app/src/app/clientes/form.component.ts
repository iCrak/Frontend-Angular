import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router , ActivatedRoute} from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  titulo = 'Registrar Cliente';

  public cliente: Cliente = new Cliente();

  constructor(private clienteservice: ClienteService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cargarCliente();
  }

  cargarCliente(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.clienteservice.getCliente(id).subscribe( (cliente) => this.cliente = cliente)
      }
    })
  }

  public create(): void {
    this.clienteservice.create(this.cliente).subscribe(
      response => {
      this.router.navigate(['/clientes']);
      swal.fire('Nuevo Cliente', `Cliente ${this.cliente.nombre} creado con Exito`, 'success');
    }
    );
  }



}
