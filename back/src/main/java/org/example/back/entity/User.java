package org.example.back.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "users")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private Role role;
    private JobTitle jobTitle;
    private String firstname;
    private String lastname;
    private String email;
    private String password;
    @OneToMany(cascade = CascadeType.ALL,mappedBy = "user")
    private List<Pointing> pointingList;
}
