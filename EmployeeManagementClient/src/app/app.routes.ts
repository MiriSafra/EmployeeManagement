
import { Routes } from '@angular/router';
import { EmployeeTableComponent } from './components/Employee/employee-table/employee-table.component';
import { HomePageComponent } from './components/Display/home-page/home-page.component';
import { AddEmployeeComponent } from './components/Employee/add-employee/add-employee.component';
import { EditEmployeeComponent } from './components/Employee/edit-employee/edit-employee.component';
import { EmployeeFormComponent } from './components/Employee/employee-form/employee-form.component';
import { PositionsComponent } from './components/Position/positions/positions.component';
import { PositionListComponent } from './components/Position/position-list/position-list.component';

export const routes: Routes = [
    { path: "", redirectTo: 'home', pathMatch: 'full' },
    { path: "home", component: HomePageComponent},
    { path: "employees", component: EmployeeTableComponent},
    { path: "edit/:id/:entryDate", component: EditEmployeeComponent},
    { path: "form/:id", component:EmployeeFormComponent },
   // { path: "table", component: EmployeeTableComponent},
    { path: "add", component: AddEmployeeComponent},
    { path: "positions/:id", component: PositionListComponent},
    { path: "positionsList", component: PositionsComponent},
];
