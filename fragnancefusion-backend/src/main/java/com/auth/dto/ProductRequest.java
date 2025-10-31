package com.auth.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

@Data
public class ProductRequest {
    private String name;
    private String description;
    private double price;
    private List<MultipartFile> images;
    private Integer stock;
    private String fragranceType;
    private String keyIngredients;
    private Double sustainabilityScore;
}