
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule,NavigationEnd } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ExcelService } from '../services/excel.service';
import { PositionsComponent } from "../positions/positions.component";
import { EmployeeTableComponent } from "../Employees/employee-table/employee-table.component";
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeeComponent } from '../Employees/add-employee/add-employee.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  providers:[MatDialog,MatTooltipModule],
    selector: 'app-navbar',
    standalone: true,
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css',
    imports: [RouterModule,CommonModule, MatIconModule, MatButtonModule, MatToolbarModule, PositionsComponent, EmployeeTableComponent]
})
export class NavbarComponent implements OnInit {
  showButton: boolean = false;

constructor(private router:Router, private route: ActivatedRoute,private _excelService : ExcelService,private _dialog: MatDialog){

}
  ngOnInit(): void {
    this.router.events.subscribe(() => {
      // בדיקה של הנתיב הנוכחי
      const currentRoute = this.router.url;
      if (currentRoute.includes('/employees')) {
        this.showButton = true;
      } else {
        this.showButton = false;
      }
    });
  }
  

exportToExcel() {
 this._excelService.exportToExcel();
  }
toAddEmployee() {
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
  this.router.navigate(['/add']);
}
// toAllRecipe() {
//   this.router.navigate(["/recipes"]);
  
addEmployee(){
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
  this.openAddDialog();
  //this._router.navigate(['/add']);
}
// }
toHome() {
  this.router.navigate([""]);
}
tpPositionsList() {
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
  this.openPositionsDialog();
 // this.router.navigate(["/positionsList"]);
}
openPositionsDialog() {
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
  this._dialog.open(PositionsComponent, { // Open PositionsComponent in dialog
    width: '250px' , height:'600px',
    panelClass: ['my-custom-dialog-class'],
    backdropClass: ['my-custom-backdrop-class'],// Optional: Set dialog width
  });
}

toEmployees(){
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
  this.router.navigate(["/employees"]);
}
openAddDialog() {
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
  this._dialog.open(AddEmployeeComponent, { // Open PositionsComponent in dialog
    width: '100px', // Optional: Set dialog width
   
  });
}

show(){
//   this.router.events.pipe(
//   filter(event => event instanceof NavigationEnd)
// ).subscribe(() => {
//   // בדיקה של הנתיב הנוכחי
//   if (this.router.url === 'employees') {
//     return true;
//   } else {
//     return false;
//   }
// });

this.router.events.subscribe(() => {
  // בדיקה של הנתיב הנוכחי
  const currentRoute = this.router.url;
  if (currentRoute.includes('/employees')) {
    return true;
  } else {
    return false;
  }
});
}
}







// toRegister() {
//   this.router.navigate(["/register"]);

// }
// toLogin() {
//   this.router.navigate(["/signin"]);
// }
// toLogout() { 
//   if(sessionStorage.getItem("connect")!=null && sessionStorage.getItem("connect")=="true"){
//      Swal.fire({
//     title: ' good bye ',
//   });
//   }

//   sessionStorage.setItem('connect',"false");
  
 
//   this.router.navigate(["/signin"]);
// }
