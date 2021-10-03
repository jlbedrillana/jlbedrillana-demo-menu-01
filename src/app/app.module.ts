import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppComponent } from './app.component';
import { GenerarmenuComponent } from './_components/generarmenu/generarmenu.component';
import { AccesoComponent } from './acceso/acceso.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PedidosComponent } from './_components/pedidos/pedidos.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { InformationDialog } from './_components/information-dialog/information-dialog.component';
import { ConfirmationDialog } from './_components/confirmation-dialog/confirmation-dialog.component';
import { VermenuComponent } from './_components/vermenu/vermenu.component';

const routes: Routes = [
  { path: 'registro', component: PedidosComponent },
  // { path: '', redirectTo: '/acceso', pathMatch: 'full'},
  { path: '', component: AccesoComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    GenerarmenuComponent,
    AccesoComponent,
    PedidosComponent,
    InformationDialog,
    ConfirmationDialog,
    VermenuComponent
  ],
  entryComponents: [InformationDialog, ConfirmationDialog],
  imports: [
    BrowserAnimationsModule,
    BrowserModule , RouterModule.forRoot(routes),
    FormsModule,ReactiveFormsModule, HttpClientModule, MatSnackBarModule,
    MatTableModule, MatPaginatorModule, MatSortModule, MatCardModule, MatButtonModule, MatFormFieldModule, 
    MatInputModule, MatIconModule, MatDialogModule, MatCheckboxModule, MatSelectModule, MatTooltipModule
  ],
  exports:[
    BrowserAnimationsModule,
    BrowserModule , 
    FormsModule,ReactiveFormsModule, HttpClientModule, MatSnackBarModule,
    MatTableModule, MatPaginatorModule, MatSortModule, MatCardModule, MatButtonModule, MatFormFieldModule, 
    MatInputModule, MatIconModule, MatDialogModule, MatCheckboxModule, MatSelectModule, MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
