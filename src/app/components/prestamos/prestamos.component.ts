import { Component, ViewChild } from '@angular/core';
import { CrudService } from 'src/app/service/crud.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { iPrestamos } from 'src/app/service/iPrestamos';
import { Router } from '@angular/router';
import { delay } from 'rxjs';
/**
 * @title Basic use of `<table mat-table>`
 */

@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.component.html',
  styleUrls: ['./prestamos.component.css']
})

export class PrestamosComponent {
  Prestamos: any;
  ipretamosLocales : iPrestamos[];
  displayedColumns: string[] = ['id', 'nombre', 'cantidad', 'fechaPrestamo', 'estatus', 'descripcion'];
  dataSource!: MatTableDataSource<iPrestamos>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private crudService: CrudService,
    private router : Router
    ) {
    this.ipretamosLocales = [];
   }

   

  ngOnInit() {
    // Metodos de conexion para datos locales]
    this.Prestamos = this.crudService.getPrestamosLocales();        
    this.dataSource = new MatTableDataSource(this.Prestamos);
    
    /* Metodos de conexion para datos en servidor
    this.crudService.vPrestamos().subscribe(resp => {
      this.Prestamos = resp;
      this.dataSource = new MatTableDataSource(this.Prestamos);
      this.dataSource.paginator = this.paginator;
    });
    */
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  } 

  applyFilter(filterVale: string) {
    this.dataSource.filter = filterVale.trim().toLowerCase();
  }

  prestamoPagado(id:iPrestamos) {
    /* metodo para datos en servidor MySQL
    if (window.confirm("Prestamo pagado ? ")) {
      const data = { id: id };
      this.crudService.editPrestamo(data).subscribe((resp) => {
        if (resp.affectedRows == 1) {
          this.crudService.vPrestamos().subscribe(resp => {
            this.Prestamos = resp;
            this.dataSource = new MatTableDataSource(this.Prestamos);
            this.dataSource.paginator = this.paginator;
          });
        }
      });
    }
    */   
   if(window.confirm("Prestamo pagado ?")){
    this.crudService.deletePrestamosLocales(id);
    delay(300);  
    this.router.navigateByUrl("");
   }
  }

}
