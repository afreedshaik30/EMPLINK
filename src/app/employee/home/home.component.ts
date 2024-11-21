import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';

import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from "@angular/material/button";
import { MatTableModule, MatTableDataSource } from '@angular/material/table';

import { Employee  } from '../employee';
import { EmployeeService } from '../employee.service';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDividerModule } from '@angular/material/divider';

// 1. Import MatDialog, EmployeeFormComponent
import { MatDialog, MatDialogRef} from '@angular/material/dialog';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ MatFormFieldModule,
             MatInputModule,
             MatIconModule,
             MatButtonModule,
             MatTableModule,
             MatSortModule,
             MatPaginatorModule,
             MatDividerModule
          ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements AfterViewInit{
  displayedColumns: string[] = ['id', 'name', 'email', 'salary', 'edit', 'delete'];
  dataSource = new MatTableDataSource<Employee>();

  employees:Employee[]=[];
  filteredEmployees:Employee[]=[];

  constructor(private employeeService: EmployeeService){}

  getAllEmp()
  {
    this.employeeService.getAll().subscribe(
      data =>{ this.employees = data;
               this.dataSource = new MatTableDataSource<Employee>(data);
               this.dataSource.sort = this.sort;
               this.dataSource.paginator = this.paginator;
      }
    );
  }

  searchEmployee(input: any){
     this.filteredEmployees = this.employees.filter(
      item => 
        item.name.toLowerCase().includes(input.toLowerCase()) 
         ||
        item.email.toLowerCase().includes(input.toLowerCase()) 
         ||
        item.salary.includes(input)
         || 
        item.id.toString().includes(input)
     );
     this.dataSource = new MatTableDataSource<Employee>(this.filteredEmployees);
  }

  @ViewChild(MatSort) sort !: MatSort; // or  @ViewChild(MatSort) sort : any;

  @ViewChild(MatPaginator) paginator !: MatPaginator;

  ngAfterViewInit() {
    this.getAllEmp();
  }
   
  // 2.Employee form fields
  name:String='';
  email:String='';
  salary:String='';

  // 3.Employee object to hold data
  employee: Employee ={
    id:0,
    name:'',
    email:'',
    salary:''
  }

  // 4.Inject MatDialog service
  readonly dialog = inject(MatDialog);
  // 5.Method to open the form dialog
  openForm(employee: Employee): void {
    const dialogRef = this.dialog.open(EmployeeFormComponent,{data: employee});
    // 6.Subscribe to the result when the dialog closes
    dialogRef.afterClosed().subscribe(result => {
        if(result){ // 7.Check if there is valid data
          this.employee.id= result.id;
          this.employee.name= result.name;
          this.employee.email= result.email;
          this.employee.salary= result.salary;
        }
      }
    );
  } 

  deleteEmployee(id: Number): void {
    const isConfirmed = window.confirm("are you sure to delete ?")
    if(isConfirmed){
      this.employeeService.deleteEmployeeByID(id).subscribe(
        (data) => { 
          this.employees = this.employees.filter(item => item.id != id );
      });
      window.location.reload();
    }
  }

}
