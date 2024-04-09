
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeTableComponent } from '../Employees/employee-table/employee-table.component';
import { EmployeeService } from '../services/employee-service.service';
import { Router } from '@angular/router';
import { Employee } from '../model/employee.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, EmployeeTableComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  public LoginForm!: FormGroup
  static flag: boolean | null = false;
  showRotatingIcon: boolean | undefined;
  hide: boolean | undefined;
  userExists: boolean | undefined;

  constructor(private router: Router) { }
  // public user: user = { name: '', password: '', Address: '', Email: ''}; // Initialize user object
  ngOnInit(): void {
    this.LoginForm = new FormGroup({
      'name': new FormControl("", [Validators.required, Validators.minLength(3)]),
      'login': new FormControl("", Validators.required),
    });
  }

  public getUsers() {
    if (this.LoginForm.valid) {
      const username = this.LoginForm.get('name')?.value;
      const login = this.LoginForm.get('login')?.value;
      console.log("name", username)
      // שמירת פרטי הגולש ב-SessionStorage
     if(login=='123456'&&username=="admin"){
      sessionStorage.setItem('connect', "true");
      Swal.fire({
        icon: 'success',
        title: 'You entered successfully',
        showConfirmButton: false, // ללא כפתור
        timer:2000,
      });
      this.router.navigate(["/table"]);

    }
    else {
      Swal.fire({
        icon:'error',
        text: 'password or name invalid, please try again',
        timer: 2000
      })
    }
    }
    else {
      Swal.fire({
        icon:'error',
        text: 'enter details again!',
        timer: 2000
      })
    }
  }

  Cancel() {
    this.router.navigate(["/"]);
    }
  togglePasswordVisibility() {
    this.hide = !this.hide;
  }
}