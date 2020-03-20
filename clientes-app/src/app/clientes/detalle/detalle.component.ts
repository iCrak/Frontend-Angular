import { Component, OnInit, Input } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import { ModalService } from './modal.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  @Input() cliente: Cliente;
  public fotoSeleccionada: File;
  // tslint:disable-next-line: no-inferrable-types
  progreso: number = 0;


  constructor(private clienteservice: ClienteService, public modalService: ModalService) { }

  ngOnInit() {
  }

  seleccionarFoto(event) {
    this.fotoSeleccionada = event.target.files[0];
    this.progreso = 0;
    console.log(this.fotoSeleccionada);
    if (this.fotoSeleccionada.type.indexOf('image') < 0) {
      swal.fire('Error seleccionar imagen', 'Debe seleccionar una Foto', 'error');
    }
  }
  subirFoto() {
    if (!this.fotoSeleccionada) {
      swal.fire('Error Upload', 'Debe seleccionar una Foto', 'error');
    } else {
     this.clienteservice.subirFoto(this.fotoSeleccionada, this.cliente.id)
    .subscribe( event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progreso = Math.round((event.loaded / event.total * 100));
          } else if (event.type === HttpEventType.Response) {
            const response: any = event.body;
            this.cliente = response.cliente as Cliente;
            swal.fire('La foto fue Subido Completamente!', response.mensaje , 'success');
          }
    });
  }
  }
  cerrarModal() {
    this.modalService.cerrarModal();
    this.fotoSeleccionada = null;
    this.progreso = 0;
  }
}
