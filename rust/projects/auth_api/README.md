# auth_api

A simple implementation of JWT token based auth.

## Run

```sh
cargo build
cargo run
```

## Endpoints

### GET `/health`

Check if the service is up and running.

**Sample Response**

```text
"Healthy"
```

### POST `/api/v1/user/create`

Create a new user.

**Sample Request**

```json
{
  "username": "string",
  "password": "string",
  "full_name": "string",
}
```

**Sample Response**

Status Code 201

```json
{
  "username": "test",
  "status": "success"
}
```

Status Code 409

```json
{
  "error": "Username already exists"
}
```

### GET `/api/v1/user/{username}`

Get a user by username.

**Sample Response**

Status Code 200

```json
{
  "username": "test",
  "full_name": "Test User"
}
```

Status Code 400

```json
{
  "error": "Invalid username"
}
```

Status Code 404

```json
{
  "error": "User with username test not found"
}
```

### GET `/api/v1/user/profile`

Get the profile of the logged-in user. Requires an access token.

**Sample Request**

```text
Authorization: Bearer <access_token>
```

**Sample Response**

Status Code 200

```json
{
  "username": "test",
  "full_name": "Test User"
}
```

Status Code 401

```json
{
  "error": "Invalid access token"
}
```

### POST `/api/v1/auth/login`

Log in and get an access token (valid for 1 hour) and a refresh token (valid for 7 days).

**Sample Request**

```json
{
  "username": "string",
  "password": "string"
}
```

**Sample Response**

Status Code 200

```json
{
  "access_token": "string",
  "refresh_token": "string"
}
```

Status Code 401

```json
{
  "error": "Invalid username or password"
}
```

### POST `/api/v1/auth/refresh`

Get a new pair of tokens using a refresh token.

**Sample Request**

```text
Authorization: Bearer <refresh_token>
```

**Sample Response**

Status Code 200

```json
{
  "access_token": "string",
  "refresh_token": "string"
}
```

Status Code 401

```json
{
  "error": "Invalid refresh token"
}
```

### GET `/api/v1/auth/me`

Get the username in the access token. Requires an access token.

**Sample Request**

```text
Authorization: Bearer <access_token>
```

**Sample Response**

Status Code 200

```json
{
  "username": "test"
}
```

Status Code 401

```json
{
  "error": "Invalid access token"
}
```
