from marshmallow import Schema, fields

class GitHubRepoSchema(Schema):
  id = fields.Int(required = True)
  repo_name = fields.Str()
  full_name = fields.Str()
  language = fields.Str()
  description = fields.Str()
  repo_url = fields.URL()

class KatsuSchema(GitHubRepoSchema):
  user_id = fields.Email(required = True)
