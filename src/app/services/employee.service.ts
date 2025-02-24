import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private url = 'http://localhost:3000/employees';

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.url);
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.url, employee);
  }

  deleteEmployee(id: string): Observable<Employee> {
    return this.http.delete<Employee>(`${this.url}/${id}`);
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.url}/${employee.id}`, employee);
  }
}
