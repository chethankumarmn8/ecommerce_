package com.auth.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ProductDTO {
    private Long id;
    private Integer stock;
    private String name;
    private String description;
    private double price;
    private List<String> imageData;
    private String fragranceType;
    private String keyIngredients;
    private Double sustainabilityScore;// Now stores Base64 strings

}