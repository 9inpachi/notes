from marshmallow import Schema, fields

"""
The database has a unique compound index based on `user_id` and `repo_id`.
`db.katsus.createIndex({ "user_id": 1, "repo_id": 1 }, { unique: true });`
"""

class GitHubRepoSchema(Schema):
    repo_id = fields.Int(required=True)
    repo_name = fields.Str()
    full_name = fields.Str()
    language = fields.Str()
    description = fields.Str()
    repo_url = fields.URL()


class KatsuSchema(GitHubRepoSchema):
    user_id = fields.Email(required=True)
