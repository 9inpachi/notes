package com.example.kotlinauthrest.repository

import com.example.kotlinauthrest.model.User
import org.springframework.data.jdbc.repository.query.Query
import org.springframework.data.repository.CrudRepository


interface UserRepository : CrudRepository<User, String> {

    @Query("SELECT * FROM users")
    fun findUsers(): List<User>

}
