import { Component, Input, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/servicios/services.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  @Input() set
  idUser(value: number) {
    if(value != null){
      this.getDetalle(value);
    }
  };

  user: any = '';

  constructor(private service: ServicesService) { }

  ngOnInit(): void {
  }

  /**
   * @author Daniel Martinez
   * Metodo que se encarga de traer el detalle de cada usuarios
   * @param value id usuario
   */
  getDetalle(value: number){
    this.service.getDetalle(value).subscribe(resp =>{
      this.user = resp.data;
    });
  }

}
