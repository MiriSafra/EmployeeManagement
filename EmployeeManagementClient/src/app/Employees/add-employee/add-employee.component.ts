import { Component, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../../model/employee.model';
import { EmployeeService } from '../../services/employee-service.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';

@Component({
    providers: [EmployeeService],
    selector: 'app-add-employee',
    templateUrl: './add-employee.component.html',
    styleUrls: ['./add-employee.component.css'],
    standalone: true,
    imports: [
      HttpClientModule,
        CommonModule,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule, MatDatepickerModule, MatNativeDateModule,
        FormsModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatDialogModule,
        EmployeeFormComponent
    ]
})
export class AddEmployeeComponent implements OnInit{
  id: number;
  @Input() formData: Employee;

  constructor(
    private service: EmployeeService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog // Inject MatDialog
  ) {}

  ngOnInit(): void {
    
    this.id = Number(this.route.snapshot.paramMap.get('id'));
   }


   async handleFormSubmit(formData: Employee) {
    console.log(formData); 
    console.log("gnder",formData.gender);// עשיית שימוש באובייקט
        console.log("SAVE");
        const employee: Employee = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          identity: formData.identity,
          birthDate: formData.birthDate,
          gender: formData.gender,
          entryDate: formData.entryDate,
          // וכן הלאה לפי השדות המתאימים
        };
     console.log(this.id,"mmnbhjh");
     await this.service.addEmployee(employee).subscribe({
          next: (res) => {
            Swal.fire({
              text: 'added successfully !',
              icon: 'success'
            });
            this.ngOnInit();
            this.router.navigate(['/table']);

          },
          error(err) {
            console.log(err);
          }
        });
  }
}

