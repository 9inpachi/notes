from app.repository.mongo import MongoRepository
from app.repository import Repository
from .schema import KatsuSchema


class Service(object):
    def __init__(self, user_id, repo_client=Repository(adapter=MongoRepository())):
        self.user_id = user_id
        self.repo_client = repo_client

        if not user_id:
            raise Exception("user_id not specified")

    def find_katsus(self):
        katsus = self.repo_client.find({"user_id": self.user_id})

        return [self.dump(katsu) for katsu in katsus]

    def find_one_katsu(self, repo_id):
        katsu = self.repo_client.find_one({"user_id": self.user_id, "repo_id": repo_id})

        return self.dump(katsu)

    def create_katsu_for(self, githubRepo):
        katsu = self.prepare_katsu(githubRepo)
        self.repo_client.create(katsu)

        return self.dump(githubRepo.data)

    def update_katsu_with(self, repo_id, githubRepo):
        katsu = self.prepare_katsu(githubRepo)
        records_affected = self.repo_client.update(
            {"user_id": self.user_id, "repo_id": repo_id}, katsu
        )

        return records_affected > 0

    def delete_katsu_for(self, repo_id):
        records_affected = self.repo_client.delete(
            {"user_id": self.user_id, "repo_id": repo_id}
        )

        return records_affected > 0

    def dump(self, data):
        return KatsuSchema().dump(data)

    def prepare_katsu(self, githubRepo):
        data = githubRepo.data
        data["user_id"] = self.user_id

        return data
