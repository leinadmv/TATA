import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ServicesService {

  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse): any{
  }

  /**
   * @author Daniel Martinez
   * Servicio que se encarga de traer la lista de usuarios
   * @param size cantidad de datos a traer
   * @param page pagina a traer
   * @returns lista de usuarios
   */
  getUsers(size: number, page: number): Observable<any>{
    return this.http.get<any>(`https://reqres.in/api/users?per_page=${size}&page=${page}`)
    .pipe(
      catchError(this.handleError)
      );
  }

 /**
  * @author Daniel Martinez
  * Servicio que se encarga de traer los detalles de un usuario
  * @param id id del usuario
  * @returns detalle de un solo usuario
  */
  getDetalle(id: number): Observable<any>{
    return this.http.get<any>(`https://reqres.in/api/users/${id}`)
    .pipe(
      catchError(this.handleError)
      );
  }

  /**
   * @author Daniel Martinez
   * Servicio que se encarga de eliminar un usuario
   * @param id id del usuario a eliminar
   * @returns codigo de exito
   */
  deleteUser(id: number): Observable<any>{
    return this.http.delete<any>(`https://reqres.in/api/users/${id}`)
    .pipe(
      catchError(this.handleError)
      );
  }

  /**
   * @author Daniel Martinez
   * Servicio que se encarga de guardar un nuevo usuario
   * @param user datos a guardar
   * @returns los datos guardados con su id
   */
  setUser(user: any): Observable<any>{
    return this.http.post<any>(`https://reqres.in/api/users`, user)
    .pipe(
      catchError(this.handleError)
      );
  }

  /**
   * @author Daniel Martinez
   * Servicio que se encarga de editar un usuario
   * @param id id del usuario a editar
   * @param user datos nuevos del usuario
   * @returns datos del usuario editado
   */
  editUser(id:number, user: any): Observable<any>{
    return this.http.patch<any>(`https://reqres.in/api/users/${id}`, user)
    .pipe(
      catchError(this.handleError)
      );
  }

}
