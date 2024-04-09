import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay, tap } from 'rxjs';
import { PositionEmployee } from '../model/PositionEmployee.model';
import { Position } from '../model/position.model';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  private baseUrl: string = 'https://localhost:7122/api/Employees'

  private positionsCache$: Observable<PositionEmployee[]> | null = null;
  private AllpositionsCache$: Observable<Position[]> | null = null;

  constructor(private http:HttpClient) { }
  
  public getEmployeePositions(id: number): Observable<PositionEmployee[]> {
    return this.http.get<PositionEmployee[]>(`https://localhost:7122/api/Employees/${id}/position/`)
  }

  public deletePositionPerEmployee(EmployeeId: Number,PositionId:Number): Observable<PositionEmployee> {
    return this.http.delete<PositionEmployee>(`https://localhost:7122/api/Employees/${EmployeeId}/position/${PositionId}`); 
  }

  getPositionsOfEmployeeList(id: number): Observable<PositionEmployee[]> {
 
     return this.http.get<PositionEmployee[]>(`https://localhost:7122/api/Employees/${id}/positions`)
   
   
  }
  getAllpositions(): Observable<Position[]> {
    if (!this.positionsCache$) {
      this.AllpositionsCache$ = this.http.get<Position[]>(`https://localhost:7122/api/positions`).pipe(
        tap(data => console.log('Fetched all positions from server')),
        shareReplay(1) // Share the emitted value and replay it for new subscribers
      );
    }
    return this.AllpositionsCache$;
  }
  public updatePosition(position:PositionEmployee,EmployeeId: Number,PositionId:Number): Observable<PositionEmployee> {
    // debugger;
     return this.http.put<PositionEmployee>(`https://localhost:7122/api/Employees/${EmployeeId}/position/${PositionId}`,position);
   
   }
   public getPositionPerEmployeeById(EmployeeId: Number,PositionId:Number): Observable<PositionEmployee> {
    return this.http.get<PositionEmployee>(`https://localhost:7122/api/Employees/${EmployeeId}/position/${PositionId}`)
  }
  public addPositionForEmployee(EmployeeId: Number,position:PositionEmployee): Observable<PositionEmployee> {
  
    return this.http.post<PositionEmployee>(`https://localhost:7122/api/Employees/${EmployeeId}/position`,position);
}
  public addPosition(p:Position): Observable<Position> {
    return this.http.post<Position>(`https://localhost:7122/api/Positions`,p); 
  }
}
