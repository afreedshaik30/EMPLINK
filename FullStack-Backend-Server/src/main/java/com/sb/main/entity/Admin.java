package com.sb.main.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="tbl_admin")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Admin
{
    @Id
    private String email;
    private String name;
    private String passowrd;
}
