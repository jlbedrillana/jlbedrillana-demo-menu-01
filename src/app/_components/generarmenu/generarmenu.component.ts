import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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
  selector: 'app-generarmenu',
  templateUrl: './generarmenu.component.html',
  styleUrls: ['./generarmenu.component.css']
})
export class GenerarmenuComponent implements OnInit {

  displayedColumnsPrevPres = ['select', 'idmenu', 'menu', 'costo'];
  dataSourceItemPP: any;
  menus: Menu[] = [];
  selectAll: boolean = false;
  
  @ViewChild('TablePPPaginator', {static: true}) tablePPPaginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  menuForm: FormGroup;
  titleAlert = 'Campo obligatorio';
  DATA_ESTADO = [{idestado: '1',nombre:'REGISTRADO'},
  {idestado: '2',nombre:'CANCELADO'},
  {idestado: '3',nombre:'ELIMINADO'}];
  DATA_MESA = [{idmesa: '1',nombre:'1'},{idmesa: '2',nombre:'2'},{idmesa: '3',nombre:'3'},
  {idmesa: '4',nombre:'4'},{idmesa: '5',nombre:'5'},{idmesa: '6',nombre:'6'},
  {idmesa: '7',nombre:'7'},{idmesa: '8',nombre:'8'},{idmesa: '9',nombre:'9'},
  {idmesa: '10',nombre:'10'},{idmesa: '11',nombre:'11'},{idmesa: '12',nombre:'12'}];
  
  constructor(private dialog: MatDialog,private pedidoApi: PedidoService , private snackBar: MatSnackBar,
    public dialogRefPedido: MatDialogRef<GenerarmenuComponent>) { 
    this.menuForm = this.crearValorFormGroup();
    this.dataSourceItemPP = new MatTableDataSource<Menu>();
  }

  ngOnInit(): void {
    this.cargarMenu();

    this.menuForm.patchValue({
      estado: '1' ,
      nromesa: '1' 
    });
  }

  cargarMenu(){
    this.menus = this.DATA_MENU as Menu[];
    this.dataSourceItemPP.data = this.menus;
    this.dataSourceItemPP.sort = this.sort;
    this.dataSourceItemPP.paginator = this.tablePPPaginator;
    this.dataSourceItemPP.size = this.menus.length;
  }

  crearValorFormGroup(){
    return new FormGroup({
      nromesa: new FormControl('',[Validators.required]),
      denominacion: new FormControl('',[Validators.required]),
      observacion: new FormControl(''),
      estado: new FormControl('',[Validators.required])
    });
  }

  registrarPedido(){
    if(this.menuForm.valid){
      let listaDetalle = [] as Detalle[];
      let pedido = {} as Pedido;
      pedido.id = '0';
      pedido.nromesa = this.menuForm.value.nromesa;
      pedido.denominacion = this.menuForm.value.denominacion;
      pedido.detalle = this.menuForm.value.observacion;
      pedido.estado = this.menuForm.value.estado;

      this.dataSourceItemPP.data.forEach((item: Menu) => {
        if(item.select){
          const itemDetalle: Detalle = {} as Detalle;
          itemDetalle.iddetalle = '0';
          itemDetalle.menu = item.menu;
          itemDetalle.costo = item.costo;
          listaDetalle.push(itemDetalle);
        }
      });

      pedido.lista = listaDetalle;

      if(listaDetalle.length == 0){
        const dialogRefInf = this.dialog.open(InformationDialog, {
          data: {
            title: 'INFORMACIÓN',
            message: 'Seleccione al menos un menú de la lista.',
            buttonText: {
              ok: 'Aceptar'
            }
          }
        });

        return;
      }

      console.log("Pedido : "+JSON.stringify(pedido));
      
      const dialogRef = this.dialog.open(ConfirmationDialog, {
        data: {
          title: 'CONFIRMACIÓN',
          message: '¿Está seguro de registrar el pedido?',
          buttonText: { ok: 'Aceptar', cancel: 'Cancelar' }
        }
      });

      dialogRef.afterClosed().subscribe((confirmed: boolean) => {
        if(confirmed){
          this.pedidoApi.guardarPedido(pedido).subscribe( data => {

            const dialogRefInfSave = this.dialog.open(InformationDialog, {
              disableClose: true,
              data: {
                title: 'INFORMACIÓN',
                message: '<span style="white-space: pre-wrap; text-align: center;">Se guardó el pedido correctamente.</span>',
                buttonText: {
                  ok: 'Aceptar'
                }
              }
            });

            dialogRefInfSave.afterClosed().subscribe((confirmed: boolean) => {
              if (confirmed) {
                const a = document.createElement('a');
                a.click();
                a.remove();

                this.dialogRefPedido.close({event: 'registro', data: pedido});
              }
            });

          },
          error => {
            console.log(error);
            this.snackBar.open('Ups!! Ocurrio un error inesperado al guardar el pedido', 'ERROR', {
              duration: 2000,
            });
          })
        }
      });
      
    }
  }

  updateAllItems() {
    if (this.selectAll === true) {
      this.dataSourceItemPP.data.map((item: Menu) => { item.select = true; });
    } else {
      this.dataSourceItemPP.data.map((item: Menu) => { item.select = false; });
    }
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
