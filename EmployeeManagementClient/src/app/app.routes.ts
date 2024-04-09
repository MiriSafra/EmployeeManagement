import { Routes } from '@angular/router';
import { EmployeeTableComponent } from './Employees/employee-table/employee-table.component';
import { AddEmployeeComponent } from './Employees/add-employee/add-employee.component';
import { EmployeeFormComponent } from './Employees/employee-form/employee-form.component';
import { EditEmployeeComponent } from './Employees/edit-employee/edit-employee.component';
import { PositionListComponent } from './components/position-list/position-list.component';
import { PositionsComponent } from './positions/positions.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
export const routes: Routes = [
    { path: "", component: HomeComponent},
    { path: "employees", component: EmployeeTableComponent},
    { path: "edit/:id/:entryDate", component: EditEmployeeComponent},
    { path: "form/:id", component:EmployeeFormComponent },
    { path: "table", component: EmployeeTableComponent},
    { path: "add", component: AddEmployeeComponent},
    { path: "positions/:id", component: PositionListComponent},
    { path: "positionsList", component: PositionsComponent},
    { path: "login", component: LoginComponent},
];
