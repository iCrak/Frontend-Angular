import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  // tslint:disable-next-line: no-inferrable-types
  modal: boolean = false;

  constructor() { }

  abrirModal() {
    this.modal = true;
  }
  cerrarModal() {
    this.modal = false;
  }

}
