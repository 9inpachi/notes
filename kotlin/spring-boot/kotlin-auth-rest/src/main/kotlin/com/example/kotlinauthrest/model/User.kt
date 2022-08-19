package com.example.kotlinauthrest.model

import org.springframework.data.annotation.Id
import org.springframework.data.relational.core.mapping.Table

@Table("users")
data class User(@Id val id: String?, val username: String, val password: String)
