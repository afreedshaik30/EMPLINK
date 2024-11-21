package com.sb.main.controller;

import com.sb.main.entity.Admin;
import com.sb.main.request.AdminRequest;
import com.sb.main.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class AdminController
{
    @Autowired
    private AdminService adminService;

//    @PostMapping(path = "/addAdmin")
//    public ResponseEntity<Admin> addAdmin(Admin admin)
//    {
//        return ResponseEntity.ok(adminService.createAdmin(admin));
//    }

    /*
           http://localhost:8080/addAdmin
        {
            "email": "rootuser@admin.com",
            "name": "root",
            "passowrd": "admin560"
        }
    */

    @PostMapping(path = "/login")
    public ResponseEntity<Map<String,Object>> checkLogin(@RequestBody AdminRequest adminRequest)
    {
        boolean isAuthenticate = adminService.checkLogin(adminRequest.getEmail(), adminRequest.getPassword());
        Map<String,Object> response = new HashMap<>();
        if(isAuthenticate)
        {
            response.put("status","success");
            response.put("message","LOGIN SUCCESS");
            return ResponseEntity.ok(response);
        }
        else
        {
            response.put("status","failed");
            response.put("message","LOGIN FAILED");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }
}

