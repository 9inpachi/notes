import os
from pymongo import MongoClient


class MongoRepository(object):
    def __init__(self):
        mongo_url = os.environ.get("MONGO_URL")
        self.db = MongoClient(mongo_url).python_katsus
        self.collection = self.db.katsus

    def find(self, selector):
        return self.collection.find(selector)

    def find_one(self, selector):
        return self.collection.find_one(selector)

    def create(self, katsu):
        return self.collection.insert_one(katsu)

    def update(self, selector, katsu):
        return self.collection.replace_one(selector, katsu).modified_count

    def delete(self, selector):
        return self.collection.delete_one(selector).deleted_count
