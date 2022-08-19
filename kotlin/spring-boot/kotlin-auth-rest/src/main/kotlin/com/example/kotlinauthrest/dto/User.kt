package com.example.kotlinauthrest.dto

import org.springframework.data.relational.core.mapping.Table

@Table("users")
data class User(val username: String, val password: String)
