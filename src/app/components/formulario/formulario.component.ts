import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from 'src/app/servicios/services.service';
import Swal from 'sweetalert2';
import { ListaComponent } from '../lista/lista.component';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  isEdit: boolean = false;
  idUser: number;

  @Input() set
  User(value: any) {
    if(value != null){
      this.setUSer(value);
      this.isEdit = true;
    } else{
      this.isEdit = false;
    }
  };

  userForm: FormGroup;

  constructor(private form: FormBuilder, private service: ServicesService, private lista: ListaComponent) { }

  ngOnInit(): void {
    this.formControl();
  }

  /**
   * @author Daniel Martinez
   * Metodo que se encarga de realizar las validaciones del formulario reactivo
   */
  formControl(): void{
    this.userForm = this.form.group({
      name: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(3)]),
      job: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(3)]),
    });
  }

  get error(): any { return this.userForm.controls; }

  /**
   * Metodo que se usa para guardar o editar un usuario
   * @param userForm formulario diligenciado
   */
  saveUser(userForm): void{

    const user = {
      name: userForm.value.name,
      job: userForm.value.job,
    };

    if(this.isEdit){
      this.service.editUser(this.idUser,user).subscribe(resp =>{
        Swal.fire('Se ha editado el usuario '+resp.name+' con cargo '+resp.job)
        this.lista.getUsers();
        this.userForm.reset();
        this.isEdit = false;
      });
    } else {
      this.service.setUser(user).subscribe(resp =>{
        Swal.fire('Se ha guardado el usuario '+resp.name+' con cargo '+resp.job)
        this.lista.getUsers();
        this.userForm.reset();
      });
    }


  }

  /**
   * Metodo que se utiliza para setear los valores a editar
   * @param user valores a editar
   */
  setUSer(user: any):void{

    this.idUser = user.id;
    this.userForm.controls['name'].setValue(user.first_name);
    this.userForm.controls['job'].setValue(user.job);

  }

}
