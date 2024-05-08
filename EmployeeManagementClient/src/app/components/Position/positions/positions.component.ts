
import { PositionService } from '../../../services/position.service';
import { Position } from '../../../models/position.model';

import { Component, OnInit, ViewChild } from '@angular/core';

//import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
 // providers: [ButtonModule],
  selector: 'app-positions',
  standalone: true,
  imports: [ CommonModule, MatCardModule, FormsModule, ReactiveFormsModule, FormsModule,],
  templateUrl: './positions.component.html',
  styleUrl: './positions.component.css'
})
export class PositionsComponent implements OnInit {

  
  items: string[] = [];
  position: Position = new Position();
  public positions: Position[] = [];
  addPosition = false;

  constructor(private _service: PositionService, private _router: Router,) { }
  ngOnInit(): void {
    this.getPositions();
  }
  onSubmit() {
    this.addPosition = false;
    this.position.positionId = 0;
    this._service.addPosition(this.position).subscribe({
      next: () => {
        this.getPositions();
      }
    });
    // כאן נוכל לשלוח את האובייקט לשרת
    console.log('Submitted Position:', this.position);
  }
  async getPositions() {
    try {
      const res = await this._service.getAllpositions().toPromise();
      this.positions = res;
      console.log("positions:", this.positions);
    } catch (err) {
      console.error(err);
    }
    this.items = this.positions.map(position => position.positionName);
    console.log("items:", this.items);
  }
  AddPosition() {
    this.addPosition = true;
  }
  onCancel() {
    this.addPosition = false;
  }
}