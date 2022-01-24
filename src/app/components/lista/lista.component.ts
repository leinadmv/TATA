import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ServicesService } from 'src/app/servicios/services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit, OnDestroy {

  @Output()
  idUserSend: EventEmitter<number> = new EventEmitter();

  @Output()
  UserSend: EventEmitter<any> = new EventEmitter();

  subscription:Subscription;

  length;
  pageSize: number = 4;
  page: number = 1;
  pageSizeOptions: number[] = [4, 8, 12, 100];
  displayedColumns: string[] = ['acciones', 'nombre', 'correo', 'avatar'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private service: ServicesService) { }

  ngOnInit(): void {
    this.getUsers();
    this.subscription = this.service.refresh$.subscribe(()=>{
      this.getUsers();
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  /**
   * @author Daniel Martinez
   * Metodo que se encarga de obtener la lista de usuarios y pasarlos a la grilla
   */
  getUsers(): void{
    this.service.getUsers(this.pageSize, this.page).subscribe(resp =>{
      this.dataSource = resp.data;
      this.length = resp.total;
      this.pageSize = resp.per_page;
    });
  }

  /**
   * @author Daniel Martinez
   * Metodo que se encarga de paginar la grilla
   * @param event evento del paginador
   */
  pageEvent(event:any): void{
    this.pageSize = event.pageSize;
    this.page = event.pageIndex + 1;
    this.getUsers();
  }

  /**
   * @author Daniel Martinez
   * Metodo que se encarga de emitir al componente detalle el id del usuario para ver su detalle
   * @param id id del usuario
   */
  detalle(id): void{
    this.idUserSend.emit(id);
  }

  /**
   * @author Daniel Martinez
   * Metodo que se encarga de eliminar un usuario
   * @param id id del usuario
   */
  delete(id): void{
    Swal.fire({
      title: 'Esta seguro?',
      text: "¡Va a borrar un usuario!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteUser(id).subscribe(resp=>{
          Swal.fire('Usuario eliminado con exito')
          this.getUsers();
        });
      }
    })

  }

  /**
   * @author Daniel Martinez
   * Metodo que se encarga de enviar al componente formulario los datos del usuario a editar
   * @param row datos del usuario
   */
  update(row): void{

    Swal.fire({
      title: 'Esta seguro?',
      text: "¡Va a editar un usuario!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Editar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.UserSend.emit(row);
      }
    })

  }

}
