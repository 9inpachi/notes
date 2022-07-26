package com.example.testspringapp;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class TestContentController {
    @GetMapping("/greeting")
    public void greeting(@RequestParam(name="name", required = false) String name, Model model) {
        model.addAttribute("name", name);
    }

    @GetMapping("/hello")
    public void hello(Model model) { }

    @PostMapping("/hello-post")
    public void hello(@RequestParam(name="name", required = false) String name, Model model) {
        model.addAttribute("name", name);
    }
}
