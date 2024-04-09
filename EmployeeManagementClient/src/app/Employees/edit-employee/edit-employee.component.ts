import { Component, Input, OnInit, Output, input } from '@angular/core';
import { EmployeeFormComponent } from '../../Employees/employee-form/employee-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../../model/employee.model';
import { EmployeeService } from '../../services/employee-service.service';
import Swal from 'sweetalert2';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { HttpClientModule } from '@angular/common/http';

import {
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import {MatListModule} from '@angular/material/list';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
@Component({
    providers: [EmployeeService],
    selector: 'app-edit-employee',
    templateUrl: './edit-employee.component.html',
    styleUrls: ['./edit-employee.component.css'],
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
        EmployeeFormComponent,
        MatButtonModule,
    ]
})
export class EditEmployeeComponent implements OnInit {
  id: number;
  entryDate:Date;
  @Input() formData: Employee;

  constructor(
    private service: EmployeeService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog ,
    private _bottomSheet: MatBottomSheet,// Inject MatDialog,

  ) {}

  ngOnInit(): void {

    this.id = Number(this.route.snapshot.paramMap.get('id'));
    //this.openEmployeeFormDialog(); // Open dialog automatically on component load
    this.entryDate = new Date(this.route.snapshot.paramMap.get('entryDate'));
}

  
 
 
  handleFormSubmit(formData: Employee) {
    console.log(formData.firstName); // עשיית שימוש באובייקט
        console.log("SAVE");
      const gender:number= Number(formData.gender);
        const employee: Employee = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          identity: formData.identity,
          birthDate: formData.birthDate,
          gender: gender,
          entryDate: this.entryDate,
          // וכן הלאה לפי השדות המתאימים
        }
      
        console.log(this.id,"mmnbhjh");
        this.service.updateEmployee(employee,this.id).subscribe({
          next: (res) => {
            Swal.fire({
              text: 'update successfully !',
              icon: 'success'
            });
            this.router.navigate(['/table']);
          },
          error(err) {
            console.log(err);
          }
        });
  }
}

