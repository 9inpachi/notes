# Katsu

A Flask REST API based on <https://developer.okta.com/blog/2018/12/20/crud-app-with-python-flask-react>.

It allows favoriting/unfavoriting GitHub repositories (called katsu here). The favorited repositories are stored in MongoDB for each user.

**Technologies:** React, MongoDB, Python, Flask

## Setup

It uses `pipenv` for dependency management. Read [Package Management](../../package-management.md) to see how to run a `pipenv` project.

## Endpoints

### POST `/auth`

Get a JWT access token for authorized requests. It only requires a `user_id`.

Sample request:

```json
{
  "user_id": "test_id"
}
```

The returned token can then be used to make requests by setting it in the request header:

```json
{
  "authorization": "Bearer access-token"
}
```

### GET `/katsus`

Get all katsus of the currently authorized user. No data required in the request.

### POST `/katsu/create`

Create a new katsu.

Sample request:

```json
{
  "repo_id": 123,
  "repo_name": "test_name",
  "full_name": "Test Full Name",
  "language": "Test Language",
  "description": "Test Description",
  "repo_url": "repo_url"
}
```

### GET `/katsu/<int:repo_id>`

Show a katsu. No data required in the request.

### PUT `/katsu/<int:repo_id>`

Update a katsu. `repo_id` is taken from the endpoint.

Sample request:

```json
{
  "repo_name": "notes",
  "full_name": "Fawad Ali",
  "language": "en",
  "description": "Some repo",
  "repo_url": "https://github.com/9inpachi/notes"
}
```

### DELETE `/katsu/<int:repo_id>`

Delete a katsu. No data required in the request.
