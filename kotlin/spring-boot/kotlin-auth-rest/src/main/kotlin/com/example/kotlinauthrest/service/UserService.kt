package com.example.kotlinauthrest.service

import com.example.kotlinauthrest.dto.User
import com.example.kotlinauthrest.repository.UserRepository
import org.springframework.stereotype.Service

@Service
class UserService(val repository: UserRepository) {

    fun findUsers(): List<User> = repository.findUsers()

    fun addUser(user: User) {
        repository.save(user)
    }

}