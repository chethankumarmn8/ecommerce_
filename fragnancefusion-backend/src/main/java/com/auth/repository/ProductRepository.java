package com.auth.repository;

import com.auth.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends
        JpaRepository<Product, Long>,
        JpaSpecificationExecutor<Product> {

    // Get perfumer's products with images
    @Query("SELECT DISTINCT p FROM Product p LEFT JOIN FETCH p.images WHERE p.perfumer.id = :perfumerId")
    List<Product> findByPerfumerId(@Param("perfumerId") Long perfumerId);

    // Count products by perfumer
    long countByPerfumerId(Long perfumerId);

    // Get latest products by perfumer
    @Query("SELECT p FROM Product p WHERE p.perfumer.id = :perfumerId ORDER BY p.createdAt DESC")
    List<Product> findLatestByPerfumer(@Param("perfumerId") Long perfumerId);

    // Get product with images by ID
    @Query("SELECT p FROM Product p LEFT JOIN FETCH p.images WHERE p.id = :id")
    Optional<Product> findByIdWithImages(@Param("id") Long id);

    // Fragrance-specific search methods
    @Query("SELECT p FROM Product p WHERE " +
            "LOWER(p.fragranceType) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(p.keyIngredients) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Product> searchByFragranceComponents(@Param("query") String query);
}