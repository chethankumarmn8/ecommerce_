// PerfumerRegisterRequest.java
package com.auth.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PerfumerRegisterRequest {
    private String name;
    private String email;
    private String password;
    private String fragranceType;
    private Integer experience;
    private String mobile;
    private String location;
    private String keyIngredients;
}
