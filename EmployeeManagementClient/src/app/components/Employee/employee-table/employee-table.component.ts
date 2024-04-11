import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../models/employee.model';
import { EmployeeService } from '../../../services//employee-service.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { MatRippleModule } from '@angular/material/core';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { MatBadgeModule } from '@angular/material/badge';

import {
  MAT_TOOLTIP_DEFAULT_OPTIONS,
  MatTooltipDefaultOptions,
  MatTooltipModule,
} from '@angular/material/tooltip';
import { PositionService } from '../../../services/position.service';
import { PositionsComponent } from "../../Position/positions/positions.component";
import { Position } from '../../../models/position.model';
import { PositionEmployee } from '../../../models/PositionEmployee.model';
import Swal from 'sweetalert2';

export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
  showDelay: 1000,
  hideDelay: 1000,
  touchendHideDelay: 1000,
};
@Component({

  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrl: './employee-table.component.css',
  standalone: true,
  imports: [
    MatRippleModule, MatBadgeModule,
    MatButtonModule, MatTooltipModule,
    MatTooltipModule,
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
    PositionsComponent
  ]
})
export class EmployeeTableComponent implements OnInit {

  icon = 'business_center';
  public EmployeesList: Employee[] = [];
  public EmployeesListFilter: Employee[] = [];
  public filterForm!: FormGroup;
  displayedColumns: string[] = ['firstName', 'lastName', 'identity', 'entryDate', 'actions',];
  positionsPerUser: PositionEmployee[] = [];



  constructor(
    private _router: Router,
    private _employeeService: EmployeeService,
    private service: PositionService

  ) { }
  async ngOnInit(bool: boolean = false): Promise<void> {
    // const key = "connect"; // שם המפתח של האיבר
    // const value = sessionStorage.getItem(key);

    // if (value === null) {
    //   Swal.fire({
    //     icon: 'error',
    //     text: 'you have to sign in',
    //     timer: 2000
    //   })
    //   this._router.navigate(["/login"]);
    // }
    console.log("URL", this._router.url)
    this.filterForm = new FormGroup({
      searchText: new FormControl(''),
    });
    this.getemployees(bool)
    this.subscribeTosearchTextChanges();

  }

  private subscribeTosearchTextChanges() {
    this.filterForm.valueChanges.subscribe(() => {
      this.filter();
    });
  }
  getemployees(bool: boolean = false) {

    this._employeeService.getEmployees().subscribe({
      next: (res) => {
        this.EmployeesList = res;
        console.log(this.EmployeesList)
        this.filter();
        if (bool == true) {
          this.exportToExcel();
        }

      },
      error: (err) => { console.error(err); }
    });
  }
  async NumOfPositions(employee: Employee) {
    let length;
    await this.getpositionsPerUser(employee.employeeId)
    length = this.positionsPerUser.length;
    return length;


  }
  async getpositionsPerUser(employeeId: number) {
    try {
      const res = await this.service.getPositionsOfEmployeeList(employeeId).toPromise();
      this.positionsPerUser = res;
      console.log("positionsPerUser:", this.positionsPerUser);
    } catch (err) {
      console.error(err);
    }
  }
  //  פונקציה לעריכת עובד
  editEmployee(employee: Employee): void {
    this._router.navigate(['/edit', employee.employeeId, employee.entryDate]);
  }

  deleteEmployee(employee: Employee): void {

    this._employeeService.deleteEmployee(employee.employeeId!).subscribe({
      next: () => {
        this.ngOnInit();
      }
    });
  }
  navigateToPositionPage(employee: Employee) {
    this._router.navigate(['/positions', employee.employeeId!]);
  }

  filter() {
    this.EmployeesListFilter = this.EmployeesList.filter(employee =>
      employee.firstName.toLowerCase().includes(this.filterForm.controls['searchText'].value.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(this.filterForm.controls['searchText'].value.toLowerCase()) ||
      employee.identity.toLowerCase().includes(this.filterForm.controls['searchText'].value.toLowerCase()) ||
      String(employee.entryDate).toLowerCase().includes(this.filterForm.controls['searchText'].value.toLowerCase())

    );
  }
  export() {
    this.ngOnInit(true);
  }

  exportToExcel() {
    Swal.fire({
      text: 'The download has started',
      icon: 'success',
      timer: 2000
    });
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Employees');

    // הוספת כותרות העמודות
    worksheet.addRow(['First Name', 'Last Name', 'Identity', 'Entry Date']);

    // הוספת הנתונים מהטבלה
    this.EmployeesListFilter.forEach(employee => {
      worksheet.addRow([employee.firstName, employee.lastName, employee.identity, employee.entryDate]);
    });

    // שמירת הקובץ
    workbook.xlsx.writeBuffer().then(buffer => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, 'Employees.xlsx');
    });
    Swal.fire({
      text: 'Download completed successfully',
      icon: 'success',
      timer: 2000
    });

  }


}





