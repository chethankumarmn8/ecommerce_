package com.auth.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class ProductImage {


    @Getter
    @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    @Column(columnDefinition = "LONGBLOB") // Explicitly define column type
    private byte[] imageData;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    private String imageType;

}