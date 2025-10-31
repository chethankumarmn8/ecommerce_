// ProductServiceImpl.java
package com.auth.service;

import com.auth.model.Product;
import com.auth.model.ProductImage;
import com.auth.repository.ProductImageRepository;
import com.auth.repository.ProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class ProductServiceImpl {

    private final ProductRepository productRepository;
    private final ProductImageRepository productImageRepository;

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository,
                              ProductImageRepository productImageRepository) {
        this.productRepository = productRepository;
        this.productImageRepository = productImageRepository;
    }

    @Transactional
    public Product addProduct(Product product, List<MultipartFile> images) throws IOException {
        Product savedProduct = productRepository.save(product);
        if (images != null && !images.isEmpty()) {
            List<ProductImage> productImages = saveProductImages(savedProduct, images);
            savedProduct.setImages(productImages);
        }
        return savedProduct;
    }

    @Transactional
    public Product updateProduct(Product product, List<MultipartFile> newImages) throws IOException {
        Product managedProduct = productRepository.findByIdWithImages(product.getId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (newImages != null && !newImages.isEmpty()) {
            managedProduct.getImages().clear();
            List<ProductImage> productImages = saveProductImages(managedProduct, newImages);
            managedProduct.getImages().addAll(productImages);
        }

        managedProduct.setName(product.getName());
        managedProduct.setDescription(product.getDescription());
        managedProduct.setPrice(product.getPrice());
        managedProduct.setFragranceType(product.getFragranceType());
        managedProduct.setStock(product.getStock());
        managedProduct.setSustainabilityScore(product.getSustainabilityScore());
        managedProduct.setKeyIngredients(product.getKeyIngredients());

        return productRepository.save(managedProduct);
    }

    public void deleteProduct(Long productId) {
        productRepository.deleteById(productId);
    }

    public List<Product> getFilteredProducts(
            String fragranceType, Double minPrice, Double maxPrice,
            String searchQuery, String ingredient, Double minSustainabilityScore) {
        Specification<Product> spec = Specification.where(null);

        if (fragranceType != null && !fragranceType.isEmpty()) {
            spec = spec.and((root, query, cb) -> cb.equal(root.get("fragranceType"), fragranceType));
        }

        if (minPrice != null && maxPrice != null) {
            spec = spec.and((root, query, cb) -> cb.between(root.get("price"), minPrice, maxPrice));
        }

        if (searchQuery != null && !searchQuery.isEmpty()) {
            String searchTerm = "%" + searchQuery.toLowerCase() + "%";
            spec = spec.and((root, query, cb) -> cb.or(
                    cb.like(cb.lower(root.get("name")), searchTerm),
                    cb.like(cb.lower(root.get("description")), searchTerm),
                    cb.like(cb.lower(root.get("perfumer").get("name")), searchTerm)
            ));
        }

        if (ingredient != null && !ingredient.isEmpty()) {
            spec = spec.and((root, query, cb) ->
                    cb.like(cb.lower(root.get("keyIngredients")), "%" + ingredient.toLowerCase() + "%"));
        }

        if (minSustainabilityScore != null) {
            spec = spec.and((root, query, cb) ->
                    cb.greaterThanOrEqualTo(root.get("sustainabilityScore"), minSustainabilityScore));
        }

        return productRepository.findAll(spec);
    }

    private List<ProductImage> saveProductImages(Product product, List<MultipartFile> images) throws IOException {
        List<ProductImage> productImages = new ArrayList<>();
        for (MultipartFile image : images) {
            ProductImage productImage = new ProductImage();
            productImage.setImageData(image.getBytes());
            productImage.setImageType(image.getContentType());
            productImage.setProduct(product);
            productImages.add(productImage);
        }
        return productImageRepository.saveAll(productImages);
    }
}