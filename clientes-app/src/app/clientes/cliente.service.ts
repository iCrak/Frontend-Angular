import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Cliente } from './cliente';
import { map, catchError, tap} from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { formatDate, DatePipe } from '@angular/common';


@Injectable()
export class ClienteService {
    private urlEndPoint = 'http://localhost:8080/api/clientes';

    private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    constructor(private http: HttpClient, private router: Router) {}

        getClientes(page: number): Observable<any> {
            return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
                tap((response: any) => {
                    console.log('ClienteService : tap 1');
                    (response.content as Cliente[]).forEach( cliente => {
                            console.log(cliente.nombre);
                    });
                }),
                map( (response: any) => {
                    (response.content as Cliente[]).map(cliente => {
                       cliente.nombre = cliente.nombre.toUpperCase();
                       /*const datePipe = new DatePipe('es');*/
                       /*cliente.creaAt =  datePipe.transform(cliente.creaAt, 'EEEE dd, MMMM yyyy'); 'EEEE dd,MMMM yyyy */
                       /*cliente.creaAt =  formatDate(cliente.creaAt, 'dd-MM-yyyy', 'en-US');*/
                       return cliente;
                   });
                    return response;
                }
                ),
                tap(response => {
                    console.log('ClienteService : tap 2');
                    (response.content as Cliente[]).forEach( cliente => {
                            console.log(cliente.nombre);
                    });
                })
            );
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
