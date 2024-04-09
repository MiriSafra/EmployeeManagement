

import { Component, OnInit, inject, TemplateRef, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PositionEmployee } from '../../model/PositionEmployee.model';
import { PositionService } from '../../services/position.service';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../services/employee-service.service';
import { Position } from '../../model/position.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormBuilder, FormControl, FormGroup, FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { MatCardContent } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { ButtonModule } from 'primeng/button';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from '../../model/employee.model';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  providers: [provideNativeDateAdapter()],
  selector: 'app-position-list',
  standalone: true,
  templateUrl: './position-list.component.html',
  styleUrl: './position-list.component.css',
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, CommonModule, MatInput, MatSelect, MatFormField, MatCardContent, NgbModalModule, MatSlideToggle, MatCardModule, MatFormFieldModule, MatSelectModule
    , MatIconModule, MatSlideToggleModule, FormsModule, MatDialogModule, NgbDatepickerModule, ButtonModule, MatButtonModule, MatTableModule]
})
export class PositionListComponent implements OnInit {


  positionForm!: FormGroup;
  positionId: Number = 0;
  entryDate: Date = new Date();
  isManagement: boolean = false;
  position: Position;
  //i
  public positionsPerUser: PositionEmployee[] = [];
  //i
  public positions: Position[] = [];
  public singlePosition: PositionEmployee;
  //i
  employee: Employee = new Employee();
  availblePositions: Position[] = [];
  //i
  positionEmployee: PositionEmployee = new PositionEmployee();
  id: number;
  addPosition: boolean;

  constructor(
    private route: ActivatedRoute,
    private _router: Router,
    private service: PositionService,
    private empService: EmployeeService,
    private formBuilder: FormBuilder,
    // public dialogRef: MatDialogRef<PositionListComponent>,


  ) { }


  async ngOnInit() {
    this.addPosition = false;
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    await this.getPositions();
    await this.getpositionsPerUser();
    await this.getEmployee();
    this.AvailblePosition();

    this.positionForm = this.formBuilder.group({

    });
  }
  slideToggleChanged(PositionId: Number) {
    this.service.getPositionPerEmployeeById(this.id, PositionId).subscribe({
      next: (res) => {
        this.singlePosition = res;
        this.singlePosition.isManagement = !this.singlePosition.isManagement;
        console.log('All operations completed successfully', this.singlePosition);
        this.service.updatePosition(this.singlePosition, this.id, PositionId).subscribe({
          next: () => {
            console.log('After', this.singlePosition);
            this._router.navigate(['/positions', this.id]);
          }, error: (err) => { console.error(err); }
        });
      },
      error: (err) => { console.error(err); }
    });

  }
  async getEmployee() {
    try {
      const res = await this.empService.getEmployeeById(this.id).toPromise();
      this.employee = res;
    } catch (err) {
      console.error(err);
    }
  }
  positionName(PositionId: Number) {
    let temp: string | undefined;
    for (let p in this.positions) {
      if (this.positions.hasOwnProperty(p)) {
        if (PositionId === this.positions[p].positionId) {
          temp = this.positions[p].positionName;
        }
      }
    }
    return temp;
  }
  onCancel() {
    this.addPosition = false;
  }
  async getpositionsPerUser() {
    console.log("id:", this.id);
    try {
      const res = await this.service.getPositionsOfEmployeeList(this.id).toPromise();
      this.positionsPerUser = res;
      console.log("positionsPerUser:", this.positionsPerUser);
    } catch (err) {
      console.error(err);
    }
  }

  async getPositions() {
    try {
      const res = await this.service.getAllpositions().toPromise();
      this.positions = res;
      console.log("positions:", this.positions);
    } catch (err) {
      console.error(err);
    }
  }
  deletePositionPerUser(EmployeeId: Number, PositionId: Number) {
    try {
      this.service.deletePositionPerEmployee(Number(EmployeeId), Number(PositionId)).subscribe({
        next: async () => {
          this._router.navigate(['/positions', this.id]);
          this.ngOnInit();
        }
      })
      console.log("positionId:", PositionId);
      this._router.navigate(['/positions', this.id]);
    } catch (err) {
      console.error(err);
    }
  }
  AddPosition(): void {
    this.addPosition = true;
  }
  todayDate(): string {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    const dayStr = (day < 10) ? '0' + day : day;
    const monthStr = (month < 10) ? '0' + month : month;

    return `${year}-${monthStr}-${dayStr}`;
  }

  getValidMaxDate(): string | null {
    if (!this.employee?.entryDate) {
      return null; // No entry date provided, disable max date
    }
    const entryDate = new Date(this.employee.entryDate);
    return new Date().toISOString().slice(0, 10);

  }

  isDateAfterEntryDate(date) {
    // המרת תאריך הכניסה של העובד ל-Date object
    const entryDate = new Date(this.employee.entryDate);

    // המרת התאריך שהוזן על ידי המשתמש ל-Date object
    const userDate = new Date(date);

    // החזרת true אם התאריך שהוזן גדול מתאריך הכניסה
    return userDate > entryDate;
  }
  onSubmit(): void {
    this.addPosition = false;
    console.log("hjin", this.positionEmployee)
    try {
      this.service.addPositionForEmployee(this.id, this.positionEmployee).subscribe({
        next: async () => {
          this.ngOnInit();
          this._router.navigate(['/positions', this.id]);
        }
      })
    } catch (err) {
      console.error(err);
    }
  }
  AvailblePosition() {
    let exist = false;
    for (let a in this.positions) {
      for (let p in this.positionsPerUser) {
        if (this.positions[a].positionId == this.positionsPerUser[p].positionId)
          exist = true;
      }
      if (exist == false) {
        this.availblePositions.push(this.positions[a]);
      }
      exist = false;
    }
  }
}
