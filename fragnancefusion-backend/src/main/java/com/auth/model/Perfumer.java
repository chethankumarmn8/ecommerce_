// Perfumer.java
package com.auth.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "perfumers")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Perfumer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String fragranceType;

    @Column(nullable = false)
    private Integer experience;

    private String certificationPath;
    private String mobile;
    private String location;
    private String keyIngredients;

    @JsonIgnore
    @Column(nullable = false)
    private String password;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @Column(nullable = false)
    private String role;

    @OneToMany(mappedBy = "perfumer", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Product> products;
}
