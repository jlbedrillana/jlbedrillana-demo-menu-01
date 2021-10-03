import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PedidoService } from '../_services/pedido.service';

@Component({
  selector: 'app-acceso',
  templateUrl: './acceso.component.html',
  styleUrls: ['./acceso.component.css']
})
export class AccesoComponent implements OnInit {

  loginForm: FormGroup;
  msgAlerta: string = "";
  constructor(private formBuilder: FormBuilder, private router: Router, private pedidoApi: PedidoService, private snackBar: MatSnackBar) { 
    this.loginForm = this.createFormGroup();
  }

  ngOnInit(): void {
    this.obtenerListaPedido();
  }

  createFormGroup() {
    return new FormGroup({
      usuario: new FormControl('',[Validators.required]),
    });
  }

  ingresar(){

    //if((this.loginForm.value.usuario).toUpperCase() != 'MOZO'){
    if(this.loginForm.value.usuario != 'Mozo'){
      if (sessionStorage.getItem("usuario") != null) {
        sessionStorage.removeItem("usuario");
      }
      this.msgAlerta = "Ingrese el usuario correcto.";
    }else{
      sessionStorage.setItem("usuario",this.loginForm.value.usuario);
      this.router.navigate(['/registro']);
    }
  }

  obtenerListaPedido(){
    this.pedidoApi.getListaPedido().subscribe(data =>{
    },
    error => {
      this.snackBar.open("Peticion fallida", '', {
        duration: 3000,
      });
    }
    );
  }

}
