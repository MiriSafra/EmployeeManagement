import { Injectable } from '@angular/core';
import { EmployeeTableComponent } from '../Employees/employee-table/employee-table.component';
import { Router } from '@angular/router';
import { EmployeeService } from './employee-service.service';
import { PositionService } from './position.service';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor(private _employeeService: EmployeeService,
    private _router:Router,private service:PositionService) { }
  exportToExcel():void{
    const employeeTableComponent = new EmployeeTableComponent(this._router,this._employeeService,this.service); // יצירת מופע של EmployeeTableComponent
    employeeTableComponent.export(); 
  }
}
