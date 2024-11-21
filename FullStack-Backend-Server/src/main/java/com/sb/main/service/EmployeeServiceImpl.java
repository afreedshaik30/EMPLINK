package com.sb.main.service;

import com.sb.main.entity.Employee;
import com.sb.main.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeServiceImpl implements EmployeeService
{
    @Autowired
    private EmployeeRepository employeeRepo;

    public List<Employee> getAllEmployees()
    {
        return employeeRepo.findAll();
    }

    public Employee getEmployeeById(Long id)
    {
        return employeeRepo.findById(id).get();
    }

    public Employee createEmployee(Employee employee)
    {
        return  employeeRepo.save(employee);
    }

    public Employee editEmployee(Employee employee) {
       Employee empObj = employeeRepo.findById(employee.getId()).get();
       if(empObj != null)
       {
           empObj.setName(employee.getName());
           empObj.setEmail(employee.getEmail());
           empObj.setSalary(employee.getSalary());
       }
       return employeeRepo.save(empObj);
    }

    public  String deleteEmployee(Long id)
    {
       Employee empById = employeeRepo.findById(id).get();
       if(empById != null)
       {
           employeeRepo.deleteById(id);
           return "deleted employee with Id : "+id;
       }
       return "DELETION FAILED";
    }
}
