package org.example.back.service;

import jakarta.persistence.EntityNotFoundException;
import org.example.back.config.jwt.JwtProvider;
import org.example.back.entity.Role;
import org.example.back.entity.User;
import org.example.back.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository repository;

    @Lazy
    @Autowired
    private PasswordEncoder encoder;

    @Lazy
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtProvider provider;

    public boolean checkUserNameExists(String email) {
        return repository.findByEmail(email).isPresent();
    }

    public boolean createUser(User user) {
        user.setPassword(encoder.encode(user.getPassword()));
        repository.save(user);
        return true;
    }

    public List<User> findUsersByRole(Role role) {
        return repository.searchUsersByRole(role);
    }


    public boolean verifyUser(String email, String password) {
        return repository.findByEmail(email).map(user -> encoder.matches(password, user.getPassword()))
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    public String generateToken(String email, String password) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return provider.generateToken(authentication);
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return repository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("User not found with mail " + username));
    }

    public List<User> getAllUsers() {
        return repository.findAll();
    }

    public User getUserById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User with id " + id + " not found"));
    }

    public User updateUser(Long id, User userUpdateDetails) {
        User user = getUserById(id);
        user.setRole(userUpdateDetails.getRole());
        user.setJobTitle(userUpdateDetails.getJobTitle());
        user.setFirstname(userUpdateDetails.getFirstname());
        user.setLastname(userUpdateDetails.getLastname());
        user.setEmail(userUpdateDetails.getEmail());
        user.setPassword(userUpdateDetails.getPassword());
        if (createUser(user)) {
            return getUserById(id);
        }
        return null;
    }

    public boolean deleteUser(Long id) {
        User user = getUserById(id);
        if (user != null) {
            repository.delete(user);
            return true;
        }
        return false;
    }

    public Optional<User> getUserByEmail(String email) {
        return repository.findByEmail(email);
    }
}