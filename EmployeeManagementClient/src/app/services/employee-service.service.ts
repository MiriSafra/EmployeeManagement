
import { Employee } from '../model/employee.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { of, tap } from 'rxjs';
import { PositionEmployee } from '../model/PositionEmployee.model';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl: string = 'https://localhost:7122/api/Employees';
  constructor(private http: HttpClient) { }

  private cachedEmployees: Employee[] | null = null;

  // public getEmployees(): Observable<Employee[]> {
  //   if (this.cachedEmployees) {
  //     // אם ישנם נתונים מאוחסנים בזיכרון מקומי, נחזיר אותם משם
  //     return of(this.cachedEmployees);
  //   } else {
  //     // אם אין נתונים מאוחסנים בזיכרון מקומי, נבצע את הקריאה לשרת
  //     return this.http.get<Employee[]>('https://localhost:7122/api/Employees').pipe(
  //       tap(employees => {
  //         // לאחר קבלת הנתונים מהשרת, נאחסן אותם בזיכרון מקומי
  //         this.cachedEmployees = employees;
  //       })
  //     );
  //   }
  // }
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
