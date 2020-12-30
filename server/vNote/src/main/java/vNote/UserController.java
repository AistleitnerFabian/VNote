package vNote;

import com.sun.el.parser.Token;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.TestingAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import vNote.model.User;
import vNote.repositories.UserRepository;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.util.*;

import static org.springframework.security.web.context.HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class UserController {


    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("register")
    public Object register(@RequestBody @Valid User user, BindingResult bindingResult) {
            if(bindingResult.hasErrors()){
                //validation error
                return null;
            }else if(userRepository.findByEmail(user.getEmail()).isPresent()){
                //email already exists
                return null;
            }else {
                try {
                    user.setPassword(passwordEncoder.encode(user.getPassword()));
                    userRepository.save(user);
                    return user;
                } catch (Exception e) {
                    return e.toString();
                }
            }
    }

    @PostMapping("login")
    public User login(@RequestBody User user, HttpServletRequest req) {
        Optional<User> optionalUser = userRepository.findByEmail(user.getEmail());
        if(optionalUser.isPresent()){
             User userObj = optionalUser.get();
             if(passwordEncoder.matches(user.getPassword(), userObj.getPassword())){
                 SecurityContext securityContext = SecurityContextHolder.getContext();
                 Authentication authentication = authenticationManager.authenticate(
                         new UsernamePasswordAuthenticationToken(userObj.getEmail(), userObj.getPassword())
                 );
                 securityContext.setAuthentication(authentication);
                 HttpSession session = req.getSession(true);
                 session.setAttribute(SPRING_SECURITY_CONTEXT_KEY, securityContext);
                 return userObj;
             }
        }
        return null;
    }

    @GetMapping("isAuthenticated")
    public boolean isAuthenticated() {
        return true;
    }

    @GetMapping("findAllUser")
    public List<User> findAllUser(){
        return userRepository.findAll();
    }

}
