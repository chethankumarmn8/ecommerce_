// ProductController.java
package com.auth.controller;

import com.auth.dto.ProductDTO;
import com.auth.dto.ProductRequest;
import com.auth.model.Perfumer;
import com.auth.model.Product;
import com.auth.repository.PerfumerRepository;
import com.auth.repository.ProductRepository;
import com.auth.service.ProductServiceImpl;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductServiceImpl productServiceImpl;
    private final PerfumerRepository perfumerRepository;
    private final ProductRepository productRepository;

    public ProductController(ProductServiceImpl productServiceImpl,
                             PerfumerRepository perfumerRepository,
                             ProductRepository productRepository) {
        this.productServiceImpl = productServiceImpl;
        this.perfumerRepository = perfumerRepository;
        this.productRepository = productRepository;
    }

    @PostMapping("/add")
    public ResponseEntity<ProductDTO> addProduct(
            @ModelAttribute ProductRequest request,
            Authentication authentication) throws IOException {
        Perfumer perfumer = getAuthenticatedPerfumer(authentication);
        Product product = new Product();
        copyRequestToProduct(request, product);
        product.setPerfumer(perfumer);
        Product savedProduct = productServiceImpl.addProduct(product, request.getImages());
        return ResponseEntity.ok(convertToDTO(savedProduct));
    }

    @GetMapping("/my-products")
    public ResponseEntity<List<ProductDTO>> getPerfumerProducts(Authentication authentication) {
        Perfumer perfumer = getAuthenticatedPerfumer(authentication);
        List<Product> products = productRepository.findByPerfumerId(perfumer.getId());
        return ResponseEntity.ok(products.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList()));
    }

    @Transactional
    @GetMapping("/{productId}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long productId) {
        Product product = productRepository.findByIdWithImages(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        return ResponseEntity.ok(convertToDTO(product));
    }

    @PutMapping("/update/{productId}")
    public ResponseEntity<ProductDTO> updateProduct(
            @PathVariable Long productId,
            @ModelAttribute ProductRequest request,
            Authentication authentication) throws IOException {
        Product existingProduct = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        Perfumer perfumer = getAuthenticatedPerfumer(authentication);
        if (!existingProduct.getPerfumer().getId().equals(perfumer.getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        copyRequestToProduct(request, existingProduct);
        Product updatedProduct = productServiceImpl.updateProduct(existingProduct, request.getImages());
        return ResponseEntity.ok(convertToDTO(updatedProduct));
    }

    @DeleteMapping("/delete/{productId}")
    public ResponseEntity<?> deleteProduct(
            @PathVariable Long productId,
            Authentication authentication) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        Perfumer perfumer = getAuthenticatedPerfumer(authentication);
        if (!product.getPerfumer().getId().equals(perfumer.getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        productServiceImpl.deleteProduct(productId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/marketplace")
    public ResponseEntity<List<ProductDTO>> getMarketplaceProducts(
            @RequestParam(required = false) String fragranceType,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) String searchQuery,
            @RequestParam(required = false) String ingredient,
            @RequestParam(required = false) Double minSustainabilityScore) {
        List<Product> products = productServiceImpl.getFilteredProducts(
                fragranceType, minPrice, maxPrice, searchQuery, ingredient, minSustainabilityScore);
        return ResponseEntity.ok(products.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList()));
    }

    private void copyRequestToProduct(ProductRequest request, Product product) {
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setFragranceType(request.getFragranceType());
        product.setPrice(request.getPrice());
        product.setStock(request.getStock());
        product.setKeyIngredients(request.getKeyIngredients());
        product.setSustainabilityScore(request.getSustainabilityScore());
    }

    private ProductDTO convertToDTO(Product product) {
        ProductDTO dto = new ProductDTO();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setFragranceType(product.getFragranceType());
        dto.setPrice(product.getPrice());
        dto.setStock(product.getStock());
        dto.setKeyIngredients(product.getKeyIngredients());
        dto.setSustainabilityScore(product.getSustainabilityScore());
        dto.setImageData(product.getImages().stream()
                .map(image -> "data:" + image.getImageType() + ";base64," +
                        Base64.getEncoder().encodeToString(image.getImageData()))
                .collect(Collectors.toList()));
        return dto;
    }

    private Perfumer getAuthenticatedPerfumer(Authentication authentication) {
        return perfumerRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("Perfumer not found"));
    }
}