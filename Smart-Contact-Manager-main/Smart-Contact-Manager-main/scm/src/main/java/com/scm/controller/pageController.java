package com.scm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;

import com.scm.entities.Query;
import com.scm.entities.User;
import com.scm.forms.QueryForm;
import com.scm.forms.UserForm;
import com.scm.helpers.Message;
import com.scm.helpers.MessageType;
import com.scm.services.QueryService;
import com.scm.services.UserService;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class pageController {

    @Autowired
    private UserService userService;

    @Autowired
    private QueryService queryService;

    @GetMapping("/")
    public String index() {
        return "redirect:/home";
    }

    @RequestMapping("/home")
    public String home() {
        return "home";
    }

    @RequestMapping("/base")
    public String base() {
        return "base";
    }

    @GetMapping("/signup")
    public String signup(Model model) {
        UserForm userForm = new UserForm();
        // userForm.setName("abababab");
        model.addAttribute("userForm", userForm);
        return "signup";
    }

    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @PostMapping("/do-register")
    public String processingRegister(@Valid @ModelAttribute UserForm userForm, BindingResult rBindingResult,
            HttpSession session) {
        // fetching form data

        // Validate form data
        if (rBindingResult.hasErrors()) {
            return "signup";
        }
        try {
            User user = new User();
            user.setName(userForm.getName());
            user.setEmail(userForm.getEmail());
            user.setPassword(userForm.getPassword());
            user.setAbout(userForm.getAbout());
            user.setPhoneNumber(userForm.getPhoneNumber());
            // user.setEnabled(false);
            user.setProfilePic(
                    "https://www.bing.com/images/search?q=profile%20image%20icon&FORM=IQFRBA&id=94002B2B27577511EBF1D290A93BF5F409734B2A");

            User savedUser = userService.saveUser(user);
            System.out.println(savedUser);

            Message message = Message.builder().content("Registration Successful").type(MessageType.green).build();
            session.setAttribute("message", message);

        } catch (Exception e) {
            // TODO: handle exception
            Message message = Message.builder().content("User already exists try with new Email")
                    .type(MessageType.red).build();
            session.setAttribute("message", message);

        }
        return "redirect:/signup";
    }

    @GetMapping("/home")
    public String showContactForm(Model model) {
        model.addAttribute("queryForm", new QueryForm());
        return "home";
    }

    @PostMapping("/query")
    public String ProcessingQuery(@ModelAttribute QueryForm queryForm, HttpSession session) {

        Query query = new Query();
        query.setName(queryForm.getName());
        query.setEmail(queryForm.getEmail());
        query.setAbout(queryForm.getAbout());
        queryService.saveQuery(query);

        Message message = Message.builder().content("Message Sent Successfully").type(MessageType.green).build();
        session.setAttribute("message", message);
        return "redirect:/home#contact";
    }
}
