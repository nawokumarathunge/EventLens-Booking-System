package com.eventlens.service;

import com.eventlens.dto.RegisterRequest;
import com.eventlens.entity.User;
import com.eventlens.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.eventlens.dto.LoginRequest;
import java.util.List;


@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // REGISTER METHOD
    public String register(RegisterRequest request) {

        // check email exists
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return "Email already exists!";
        }

        // create user
        User user = new User(
                request.getName(),
                request.getEmail(),
                request.getPassword(),
                request.getRole()
        );

        userRepository.save(user);

        return "User registered successfully!";
    }
    // LOGIN METHOD
    public User login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return user;
    }

    // GET USER BY ID
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // GET ALL USERS
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // UPDATE USER
    public User updateUser(Long id, User updatedUser) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setName(updatedUser.getName());
        user.setEmail(updatedUser.getEmail());

        return userRepository.save(user);
    }

    // DELETE USER
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}