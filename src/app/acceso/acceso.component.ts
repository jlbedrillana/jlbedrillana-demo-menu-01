import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acceso',
  templateUrl: './acceso.component.html',
  styleUrls: ['./acceso.component.css']
})
export class AccesoComponent implements OnInit {

  loginForm: FormGroup;
  msgAlerta: string = "";
  constructor(private formBuilder: FormBuilder, private router: Router) { 
    this.loginForm = this.createFormGroup();
  }

  ngOnInit(): void {
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

}
