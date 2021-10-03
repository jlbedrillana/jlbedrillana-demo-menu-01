import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Pedido } from 'src/app/_models/pedido';
import { PedidoService } from 'src/app/_services/pedido.service';
import { MatSort } from '@angular/material/sort';
import { GenerarmenuComponent } from '../generarmenu/generarmenu.component';
import { VermenuComponent } from '../vermenu/vermenu.component';
import { InformationDialog } from '../information-dialog/information-dialog.component';
import { ConfirmationDialog } from '../confirmation-dialog/confirmation-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  displayedColumnsPrevPres = ['id', 'nromesa', 'denominacion', 'detalle', 'estado', 'edicion'];
  dataSourceItemPP: any;
  
  @ViewChild('TablePPPaginator', {static: true}) tablePPPaginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  pedidos: Pedido[] = [];
  DATA_ESTADO = [{idestado: '1',nombre:'REGISTRADO'},
  {idestado: '2',nombre:'CANCELADO'},
  {idestado: '3',nombre:'ELIMINADO'}];

  constructor(private pedidoApi: PedidoService, private snackBar: MatSnackBar, private dialog: MatDialog,
    private router: Router) {
      if(sessionStorage.getItem("usuario") == null){
        this.router.navigate(['/']);
      }
      this.dataSourceItemPP = new MatTableDataSource<Pedido>();
   }

  ngOnInit(): void {
    this.obtenerListaPedido();
    
  }

  obtenerListaPedido(){
    this.pedidoApi.getListaPedido().subscribe(data =>{
      //console.log("data : "+JSON.stringify(data));
      this.pedidos = data as Pedido[];
      this.pedidos.forEach((item : Pedido) => {
        if(item.estado){
          item.estadoDesc = this.DATA_ESTADO.filter(x => x.idestado == item.estado.toString())[0].nombre
        }
      });

      let pedidosSort = {} as Pedido[];
      pedidosSort = this.pedidos.sort(function(a, b) {
        return parseInt(a.id) - parseInt(b.id);
      });

      this.dataSourceItemPP.data = pedidosSort;
      this.dataSourceItemPP.sort = this.sort;
      this.dataSourceItemPP.paginator = this.tablePPPaginator;
      this.dataSourceItemPP.size = pedidosSort.length;

    },
    error => {
      this.snackBar.open("Error al validar valorizacion", '', {
        duration: 3000,
      });
    }
    );
  }

  agregarPedido(){
    const dialogRefCredito = this.dialog.open(GenerarmenuComponent, {
      height: '800px',
      width: '600px',
      disableClose: true,
      autoFocus: false,
      //,data: {idExpediente: this.dataSourceItem.data.idExpede, idPresupuesto: this.idPresupuesto, idContrato: this.dataSourceItem.data.idContrato, idPrevision: row.id , idItem: this.dataSourceItem.data.idItem}
    });

    dialogRefCredito.afterClosed().subscribe(result => {

      if(result.data!=null){
        this.obtenerListaPedido();
      }

    });
  }

  verMenu(row : Pedido){
    const dialogRefCredito = this.dialog.open(VermenuComponent, {
      height: '800px',
      width: '600px',
      disableClose: true,
      autoFocus: false,
      data: row
    });
  }

  actualizarPedido(row : Pedido){

    console.log(JSON.stringify(row));
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        title: 'CONFIRMACIÓN',
        message: '¿Está seguro de cancelar el pedido?',
        buttonText: { ok: 'Si', cancel: 'No' }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if(confirmed){

        row.estado = '2';
        this.pedidoApi.actualizarPedido(row).subscribe(data =>{
          const dialogRefInfSave = this.dialog.open(InformationDialog, {
            disableClose: true,
            data: {
              title: 'INFORMACIÓN',
              message: '<span style="white-space: pre-wrap; text-align: center;">El pedido se canceló.</span>',
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
              this.obtenerListaPedido();
            }
          });
        },
        error => {
          this.snackBar.open("Error al validar valorizacion", '', {
            duration: 3000,
          });
        }
        );
      }
    });
  
  }

  salir(){
    if (sessionStorage.getItem("usuario") != null) {
      sessionStorage.removeItem("usuario");
    }
    this.router.navigate(['/']);
  }


}
