package com.sb.main.controller;

import com.sb.main.entity.Employee;
import com.sb.main.service.EmployeeService;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(maxAge = 3360,
origins = "http://localhost:4200/")
@RestController
@OpenAPIDefinition(info = @Info(
                                 title = "Employee Backend API",
                                 version = "v1.0",
                                 description = "This Employee Backend API is part of Full Stack SpringBoot+Angular Application"
                   ))
@RequestMapping(path = "/employee")
public class EmployeeController
{
    @Autowired
    private EmployeeService employeeService;

    @GetMapping
    public ResponseEntity<List<Employee>> getAllEmployees()
    {
        return ResponseEntity.ok(employeeService.getAllEmployees());
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable("id") long id)
    {
        return ResponseEntity.ok(employeeService.getEmployeeById(id));
    }

    @PostMapping
    public ResponseEntity<Employee> createEmployee(@RequestBody Employee employee)
    {
        return ResponseEntity.ok(employeeService.createEmployee(employee));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Employee> editEmployee(
            @PathVariable("id") Long id,
            @RequestBody Employee employee
    )
    {
        return ResponseEntity.ok(employeeService.editEmployee(employee));
    }


    @DeleteMapping(path = "/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable("id") Long id)
    {
        return ResponseEntity.ok(employeeService.deleteEmployee(id));
    }
//    @DeleteMapping(path = "/{employeeId}")
//    public ResponseEntity<Map<String, Object>> deleteEmployee(@PathVariable("employeeId") Long id)
//    {
//        employeeService.getEmployeeById(id);
//
//        Map<String, Object> response = new HashMap<>();
//        response.put("status", "DELETED");
//        response.put("employeeId", id);
//        return ResponseEntity.ok(response);
//    }

}
