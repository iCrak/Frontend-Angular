import { Component } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
  styleUrls: ['./directiva.component.css']
})
export class DirectivaComponent  {

  constructor() { }

  listarCurso: string[] = ['TypeScript', 'JavaScript', 'C#', 'Lenguaje C'];

  habilitar = true; // habilitar: boolean = true;

  setHabilitar(): void {
  // tslint:disable-next-line: triple-equals
  this.habilitar = (this.habilitar == true) ? false : true;
  }

}
