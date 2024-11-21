package com.sb.main.service;

import com.sb.main.entity.Employee;

import java.util.List;

public interface EmployeeService
{
    List<Employee> getAllEmployees();
    Employee getEmployeeById(Long id);

    Employee createEmployee(Employee employee);
    Employee editEmployee(Employee employee);
    String deleteEmployee(Long id);
}
