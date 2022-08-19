package com.example.kotlinauthrest.controller

import com.example.kotlinauthrest.dto.User
import com.example.kotlinauthrest.service.UserService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/users")
class UserController(val service: UserService) {

    @GetMapping
    fun index(): List<User> = service.findUsers()

    @PostMapping("/add")
    fun add(@RequestBody user: User) {
        service.addUser(user)
    }

}