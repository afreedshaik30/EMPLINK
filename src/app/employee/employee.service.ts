import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  baseUrl:String = "/employee";
  constructor(private httpclient: HttpClient) { }

  getAll(): Observable<Employee[]>{
    return this.httpclient.get<Employee[]>(`${this.baseUrl}`);
  }

  createEmployee(data: Employee): Observable<Employee> {
    return this.httpclient.post<Employee>(`${this.baseUrl}`,data);
  }

  updateEmployeeById(data: Employee): Observable<Employee> {
    // Ensure the correct ID is passed in the URL and the request body
    return this.httpclient.put<Employee>(`${this.baseUrl}/${data.id}`, data);
  }

  deleteEmployeeByID(id: Number)
  {
     return this.httpclient.delete<any>(`${this.baseUrl}/${id}`);
     //return this.httpclient.delete<{ status: string; employeeId: number }>(`${this.baseUrl}/${id}`);

  }
}
