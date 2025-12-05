package com.travel.Travel.controller;

import com.travel.Travel.dto.ChangePasswordRequest;
import com.travel.Travel.entity.Tourist;
import com.travel.Travel.entity.User;
import com.travel.Travel.repository.TouristRepository;
import com.travel.Travel.repository.UserRepository;
import com.travel.Travel.util.JwtUtil;
import lombok.Data;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final TouristRepository touristRepo;

    public AuthController(UserRepository userRepo, PasswordEncoder passwordEncoder, JwtUtil jwtUtil, TouristRepository touristRepo) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.touristRepo = touristRepo;
    }

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest req) {
        if (userRepo.findByEmail(req.getEmail()) != null) {
            return "Email already exists!";
        }

        User user = new User();
        user.setName(req.getName());
        user.setEmail(req.getEmail());
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        user.setRole("ROLE_USER");

        User savedUser = userRepo.save(user);

        if (savedUser.getRole().equals("ROLE_USER")) {
            Tourist t = new Tourist();
            t.setName(savedUser.getName());
            t.setEmail(savedUser.getEmail());
            // Default preferences
            t.setPreferredPriceMin(0.0);
            t.setPreferredPriceMax(4999.0);

            touristRepo.save(t);
        }
        return "Registered successfully!";
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest req) {
        User user = userRepo.findByEmail(req.getEmail());
        if (user == null) throw new RuntimeException("User not found");

        if (!passwordEncoder.matches(req.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole(), user.getId());
        return new LoginResponse(token, user.getRole(),user.getId());
    }

    // Change password
    @PutMapping("/change-password")
    public String changePassword(@PathVariable Long id, @RequestBody ChangePasswordRequest req) {
        User user = userRepo.findById(id).orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(req.getOldPassword(), user.getPassword())) {
            return "Old password is incorrect";
        }

        user.setPassword(passwordEncoder.encode(req.getNewPassword()));
        userRepo.save(user);
        return "Password changed successfully";
    }
}

@Data
class RegisterRequest {
    private String name;
    private String email;
    private String password;
}

@Data
class LoginRequest {
    private String email;
    private String password;
}

@Data
class LoginResponse {
    private String token;
    private String role;
    private Long id;

    LoginResponse(String token, String role, Long id) {
        this.token = token;
        this.role = role;
        this.id = id;
    }
}
