package vNote;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import vNote.model.Postit;
import vNote.model.User;
import vNote.repositories.UserRepository;

import javax.validation.Valid;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RestController
@CrossOrigin(origins = "*")
public class UserController {


    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public String register(@RequestBody @Valid User user, BindingResult bindingResult) {
            if(bindingResult.hasErrors()){
                return "validation error";
            }else if(userRepository.findByEmail(user.getEmail()).isPresent()){
                return "email already exists";
            }else {
                try {
                    user.setPassword(passwordEncoder.encode(user.getPassword()));
                    userRepository.save(user);
                    return "success";
                } catch (Exception e) {
                    return e.toString();
                }
            }
    }

    @GetMapping("/login")
        public User login(@RequestBody User user) {
        Optional<User> optionalUser = userRepository.findByEmail(user.getEmail());
        if(optionalUser.isPresent()){
             User userObj = optionalUser.get();
             if(passwordEncoder.matches(user.getPassword(), userObj.getPassword())){
                 return userObj;
             }
        }
        return null;
    }

    @GetMapping("/findAllUser")
    public List<User> findAllUser(){
        return userRepository.findAll();
    }
}
