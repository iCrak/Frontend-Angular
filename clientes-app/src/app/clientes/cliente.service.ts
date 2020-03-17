import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Cliente } from './cliente';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable()
export class ClienteService {
    private urlEndPoint = 'http://localhost:8080/api/clientes';

    private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    constructor(private http: HttpClient, private router: Router) {}

        getClientes(): Observable<Cliente[]> {
            return this.http.get<Cliente[]>(this.urlEndPoint);
        }

       create(cliente: Cliente): Observable<any> {
        return this.http.post<any>(this.urlEndPoint, cliente, {headers: this.httpHeaders}).pipe(
            catchError(e => {
            // tslint:disable-next-line: triple-equals
            if (e.status == 400) {
                return throwError(e);
            }
            console.log(e.error.mensaje);
            Swal.fire(e.error.mensaje, e.error.error, 'error');
            return throwError(e);
            })
        );
       }

       getCliente(id): Observable<Cliente> {
           return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
               catchError(e => {
                    this.router.navigate(['/clientes']);
                    /*console.log(e.error.mensaje);*/
                    Swal.fire(e.error.mensaje, e.error.error, 'error');
                    return throwError(e);
               })
           );
       }
       update(cliente: Cliente): Observable<Cliente> {
           return this.http.put(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
            map((response: any) => response.cliente as Cliente),
            catchError(e => {
             // tslint:disable-next-line: triple-equals
            if (e.status == 400) {
                return throwError(e);
            }
            console.log(e.error.mensaje);
            Swal.fire(e.error.mensaje, e.error.error, 'error');
            return throwError(e);
            })
        );
       }
       delete(id: number): Observable<Cliente> {
           return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders}).pipe(
            catchError(e => {
                console.log(e.error.mensaje);
                Swal.fire(e.error.mensaje, e.error.error, 'error');
                return throwError(e);
            })
        );
       }

}
