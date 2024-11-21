import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-employee-form',
  standalone: true,
  imports: [MatDialogModule,
            MatDialogTitle,
            MatDialogContent,
            MatDialogActions,
            MatFormFieldModule,
            MatInputModule,
            MatButtonModule,
            MatIconModule,
            CommonModule,
            FormsModule,
  ],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent {
  
    readonly dialogref = inject(MatDialogRef<EmployeeFormComponent>)
    formData = inject<Employee>(MAT_DIALOG_DATA);

    constructor(private employeeService: EmployeeService)
    {
    }

    createOrUpdateEmployee(employee: Employee)
    {
      this.employeeService.getAll();
      if (employee.id) 
      {  // If id is truthy, assuming that it's an existing employee
        this.employeeService.updateEmployeeById(employee).subscribe({
          next: (formData) => {
            console.log("Employee Updated Successfully");
            this.employeeService.getAll();
          },
          error: (err) => {
            console.log(err);
          }
        });
       // window.location.reload();
      }
      else
      {
        this.employeeService.createEmployee(employee).subscribe(
        {
           next: (formData)=>{
            console.log(" 1.Employee Created Successfully");
            this.employeeService.getAll();
           },
           error: (err) => {console.log(err)}
        });
        window.location.reload();
      }
    }
}
