package com.sb.main.service;

import com.sb.main.entity.Admin;
import com.sb.main.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService
{
    @Autowired
    private AdminRepository adminRepo;

    public Admin createAdmin(Admin admin)
    {
        return adminRepo.save(admin);
    }

    public boolean checkLogin(String email, String password)
    {
      Admin admin = adminRepo.findByEmail(email);
      return admin != null && admin.getPassowrd().equals(password);
    }
}
