import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Employee } from '../../../models/employee.model';
import { EmployeeService } from '../../../services/employee-service.service';
import { CommonModule, DatePipe } from '@angular/common'; // Optional for date formatting
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  providers: [EmployeeService,DatePipe],
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
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
          MatBottomSheetModule,
          MatButtonModule,
      ]
})
export class EmployeeFormComponent implements OnInit {
  @Output() formSubmit = new EventEmitter<Employee>();
  id: number;
  genders = [{ value: 0, viewValue: 'Male' }, { value: 1, viewValue: 'Female' }]; // Adjust gender options if needed
  employeeForm!: FormGroup;
  employee: Employee = {
    firstName: "",
    lastName: "",
    identity: "",
    birthDate: new Date(),
    gender: 0,
    entryDate: new Date(),
  };
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private _EmployeeService: EmployeeService,

    private datePipe: DatePipe,
    private router:Router,
    private route: ActivatedRoute, // Optional for date formatting
  ) { }

  ngOnInit(): void {
    const key = "connect"; // שם המפתח של האיבר
    const value = sessionStorage.getItem(key);

    if (value === null) {
      Swal.fire({
        icon:'error',
        text: 'you have to sign in',
        timer: 2000
      })
      this.router.navigate(["/login"]);
    }
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this._EmployeeService.getEmployeeById(this.id).subscribe(emp => {
      this.employee = emp;
      this.employeeForm.patchValue(emp); // Auto-populate form with employee data
    });

    this.employeeForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      identity: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]], // Validate 9 digits
      birthDate: ['', [Validators.required, this.validateAge]], // Validate age
      gender: ['', Validators.required],
      entryDate: ['', [Validators.required, this.validateMinEntryDate]], // Validate minimum entry date
    });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      this.employee = this.employeeForm.value;
      this.employee.gender = Number(this.employeeForm.value.gender);
      this.formSubmit.emit(this.employee);
    }
  }

  getErrorMessage(fieldName: string): string {
    const field = this.employeeForm.get(fieldName);
    if (field.hasError('required')) {
      return 'This field is required.';
    } else if (field.hasError('pattern')) {
      return 'Identity must be 9 digits long.';
    } else if (field.hasError('age')) {
      return 'Must be 18 years or older.';
    } else if (field.hasError('minEntryDate')) {
      return 'Entry date must be at least four years in the past.';
    }
    return '';
  }

  validateAge(control: FormControl): { [key: string]: boolean } | null {
    const birthDate = new Date(control.value);
    const today = new Date();
    const age = Math.floor((today.getTime() - birthDate.getTime()) / (1000 * 3600 * 24 * 365.25));
    return age < 18 ? { age: true } : null;
  }

  validateMinEntryDate(control: FormControl): { [key: string]: boolean } | null {
    const today = new Date();
    const minEntryDate = new Date(today.getFullYear() - 4, today.getMonth(), today.getDate()); // Minimum entry date: 4 years ago
    return control.value < minEntryDate ? { minEntryDate: true } : null;
  }
}