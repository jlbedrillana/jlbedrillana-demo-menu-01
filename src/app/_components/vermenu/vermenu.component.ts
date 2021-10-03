import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Detalle } from 'src/app/_models/detalle';
import { Menu } from 'src/app/_models/menu';
import { Pedido } from 'src/app/_models/pedido';
import { PedidoService } from 'src/app/_services/pedido.service';
import { ConfirmationDialog } from '../confirmation-dialog/confirmation-dialog.component';
import { InformationDialog } from '../information-dialog/information-dialog.component';

@Component({
  selector: 'app-vermenu',
  templateUrl: './vermenu.component.html',
  styleUrls: ['./vermenu.component.css']
})
export class VermenuComponent implements OnInit {


  displayedColumnsPrevPres = ['iddetalle', 'menu', 'costo'];
  dataSourceItemPP: any;
  selectAll: boolean = false;
  
  @ViewChild('TablePPPaginator', {static: true}) tablePPPaginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  pedido: Pedido = {} as Pedido;
  menuForm: FormGroup;
  titleAlert = 'Campo obligatorio';
  DATA_ESTADO = [{idestado: '1',nombre:'REGISTRADO'},
  {idestado: '2',nombre:'CANCELADO'},
  {idestado: '3',nombre:'ELIMINADO'}];
  DATA_MESA = [{idmesa: '1',nombre:'1'},{idmesa: '2',nombre:'2'},{idmesa: '3',nombre:'3'},
  {idmesa: '4',nombre:'4'},{idmesa: '5',nombre:'5'},{idmesa: '6',nombre:'6'},
  {idmesa: '7',nombre:'7'},{idmesa: '8',nombre:'8'},{idmesa: '9',nombre:'9'},
  {idmesa: '10',nombre:'10'},{idmesa: '11',nombre:'11'},{idmesa: '12',nombre:'12'}];
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog,private pedidoApi: PedidoService , private snackBar: MatSnackBar,
    public dialogRefPedido: MatDialogRef<VermenuComponent>) { 
    this.menuForm = this.crearValorFormGroup();
    this.dataSourceItemPP = new MatTableDataSource<Detalle>();
    this.pedido = data;

    console.log("ver menu :"+JSON.stringify(this.pedido));
  }

  ngOnInit(): void {
    this.cargarMenu();

    this.menuForm.patchValue({
      estado: (this.pedido.estado != null ? this.pedido.estado.toString(): "1"),
      nromesa: (this.pedido.nromesa != null ? this.pedido.nromesa.toString(): "1"),
      denominacion: this.pedido.denominacion,
      observacion: this.pedido.detalle
    });
  }

  cargarMenu(){
    this.dataSourceItemPP.data = this.pedido.lista;
    this.dataSourceItemPP.sort = this.sort;
    this.dataSourceItemPP.paginator = this.tablePPPaginator;
    this.dataSourceItemPP.size = this.pedido.lista.length;
  }

  crearValorFormGroup(){
    return new FormGroup({
      nromesa: new FormControl('',[Validators.required]),
      denominacion: new FormControl('',[Validators.required]),
      observacion: new FormControl(''),
      estado: new FormControl('',[Validators.required])
    });
  }


  cerrar(){
    this.dialogRefPedido.close({event: 'cerrar', data: null});
  }
  
  DATA_MENU = [{idmenu: '1',menu:'Chancho a la caja china', costo: '20'},
  {idmenu: '2',menu:'Lomo saltado', costo: '21'},
  {idmenu: '3',menu:'Arroz con Pollo', costo: '22'},
  {idmenu: '4',menu:'Chupe de cangrejo', costo: '23'},
  {idmenu: '5',menu:'Ceviche', costo: '24'},
  {idmenu: '6',menu:'Ají de Gallina', costo: '25'},
  {idmenu: '7',menu:'Rcoto Relleno', costo: '26'},
  {idmenu: '8',menu:'Sopa Seca', costo: '27'},
  {idmenu: '8',menu:'Clado de gallina', costo: '28'},
  {idmenu: '10',menu:'Trucha frita', costo: '29'},
  {idmenu: '11',menu:'Guiso de Quinua', costo: '30'},
  {idmenu: '12',menu:'Alitas Broaster', costo: '31'},
  {idmenu: '13',menu:'Arroz con pato', costo: '32'},
  {idmenu: '14',menu:'Postres', costo: '33'}];

}
