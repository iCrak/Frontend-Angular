import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  // tslint:disable-next-line: no-inferrable-types
  modal: boolean = false;

  // tslint:disable-next-line: variable-name
  private _notificarUpload = new EventEmitter<any>();

  constructor() { }

  get notificarUpload(): EventEmitter<any> {
    return this._notificarUpload;
  }

  abrirModal() {
    this.modal = true;
  }
  cerrarModal() {
    this.modal = false;
  }

}
