package com.example.kotlinauthrest.controllers

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class AuthController {
    @GetMapping(path = ["/"])
    fun index(): Boolean = true
}
