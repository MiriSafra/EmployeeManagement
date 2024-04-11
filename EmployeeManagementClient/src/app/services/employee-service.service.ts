
import { Employee } from '../models/employee.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { of, tap } from 'rxjs';
import { PositionEmployee } from '../models/PositionEmployee.model';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl: string = 'https://localhost:7122/api/Employees';
  constructor(private http: HttpClient) { }

 public getEmployees(): Observable<Employee[]> {

      return this.http.get<Employee[]>('https://localhost:7122/api/Employees')
  
  }
  getPositionsOfEmployeeList(id: number): Observable<PositionEmployee[]> {
    return this.http.get<PositionEmployee[]>(`${this.baseUrl}/${id}/positions`);
  }
  public getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`https://localhost:7122/api/Employees/${id}`)
  }
  public addEmployee(employee: Employee): Observable<Employee> {

    return this.http.post<Employee>(`https://localhost:7122/api/Employees`, employee);


  }
  public updateEmployee(employee: Employee, id: number): Observable<Employee> {
   
    return this.http.put<Employee>(`https://localhost:7122/api/Employees/${id}`, employee);

  }

  public deleteEmployee(id: number): Observable<Employee> {
    return this.http.delete<Employee>(`https://localhost:7122/api/Employees/${id}`);
  }
 
}
