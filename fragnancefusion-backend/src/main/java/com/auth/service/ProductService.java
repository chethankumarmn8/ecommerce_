package com.auth.service;

import com.auth.model.Product;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;

public interface ProductService {
    Product addProduct(Product product, List<MultipartFile> images) throws IOException;
    List<Product> getProductsByArtisanId(Long artisanId);
    Product updateProduct(Product product, List<MultipartFile> newImages) throws IOException;
    void deleteProduct(Long productId);
    List<Product> getFilteredProducts(String category, Double minPrice, Double maxPrice, String searchQuery);
}