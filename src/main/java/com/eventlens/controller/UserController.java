package com.eventlens.controller;

import com.eventlens.dto.RegisterRequest;
import com.eventlens.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.eventlens.dto.LoginRequest;
import java.util.List;
import com.eventlens.entity.User;
import com.eventlens.entity.Review;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:63342")
public class UserController {

    @Autowired
    private UserService userService;

    //REGISTER API
    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {
        return userService.register(request);
    }

    //Login API
    @PostMapping("/login")
    public User login(@RequestBody LoginRequest request) {
        return userService.login(request);
    }

    // GET USER BY ID
    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    // GET ALL USERS
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // UPDATE USER
    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        return userService.updateUser(id, updatedUser);
    }

    // DELETE USER
    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return "User deleted successfully";
    }

    @GetMapping("/providers")
    public List<User> getProviders() {
        return userService.getProviders();
    }

    @GetMapping("/count/customers")
    public long getCustomerCount() {
        return userService.getCustomerCount();
    }

    @GetMapping("/count/providers")
    public long getProviderCount() {
        return userService.getProviderCount();
    }

    @GetMapping("/search")
    public List<User> searchCustomers(@RequestParam String keyword) {
        return userService.searchCustomers(keyword);
    }




}