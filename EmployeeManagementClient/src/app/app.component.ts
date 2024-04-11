import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/Display/navbar/navbar.component";
import { EmployeeTableComponent } from "./components/Employee/employee-table/employee-table.component";
//import { EmployeeTableComponent } from "..../../../Employee/employee-table/employee-table.component";


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [CommonModule, RouterOutlet, NavbarComponent, EmployeeTableComponent]
})
export class AppComponent {
  title = 'EmployeeManagment';
}
