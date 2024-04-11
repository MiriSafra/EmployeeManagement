
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule,NavigationEnd } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ExcelService } from '../../../services/excel.service';
import { PositionsComponent } from "../../Position/positions/positions.component";
import { EmployeeTableComponent } from "../../Employee/employee-table/employee-table.component";
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeeComponent } from '../../Employee/add-employee/add-employee.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';


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
  
  this.router.navigate(['/add']);
}

  
addEmployee(){
this.openAddDialog();

}
// }
toHome() {
  this.router.navigate([""]);
}
toPositionsList() {
 
  this.openPositionsDialog();
 
}
openPositionsDialog() {
  
  this._dialog.open(PositionsComponent, { // Open PositionsComponent in dialog
    width: '250px' , height:'600px',
    panelClass: ['my-custom-dialog-class'],
    backdropClass: ['my-custom-backdrop-class'],// Optional: Set dialog width
  });
}

toEmployees(){
 
  this.router.navigate(["/employees"]);
}
openAddDialog() {
  
  this._dialog.open(AddEmployeeComponent, { // Open PositionsComponent in dialog
    width: '100px', // Optional: Set dialog width
   
  });
}

show(){

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
